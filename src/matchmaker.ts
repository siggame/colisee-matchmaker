import { db } from "@siggame/colisee-lib";
import * as knex from "knex";
import * as _ from "lodash";
import * as winston from "winston";

import { generateDerangedPairs, permute } from "./helpers";
import * as vars from "./vars";

interface IRecentSub {
    id: number;
    teamId: number;
}
export class Matchmaker {

    private intervalId?: NodeJS.Timer;

    constructor() {
        this.intervalId = undefined;
    }

    start() {
        if (_.isNil(this.intervalId)) {
            this.intervalId = setInterval(() => {
                this.poll().catch((e) => { winston.error(e); });
            }, vars.SCHED_INTERVAL);
        }
    }

    stop() {
        if (!_.isNil(this.intervalId)) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }

    async getPairedTeams() {
        return db.connection.from(function (this: knex.QueryBuilder) {
            this.from("submissions as subs")
                .select("subs.id as subId", "subs.team_id as teamId", db.connection.raw("max(subs.version) as recent_version"))
                .where({ status: "finished" })
                .groupBy("subId")
                .as("recent_subs");
        }).join("submissions", function () {
            this.on("recent_subs.teamId", "submissions.team_id").andOn("recent_subs.recent_version", "submissions.version");
        })
            .select("submissions.id as id", "recent_subs.teamId")
            .then(permute)
            .then(generateDerangedPairs)
            .then((pairs): [IRecentSub, IRecentSub][] => pairs)
            .catch((e: Error) => { throw e; });
    }

    async scheduledNum(): Promise<number> {
        return db.connection("games").where({ status: "queued" }).count("*")
            .then(([{ count }]): number => count)
            .catch((e: Error) => { throw e; });
    }

    async poll(): Promise<void> {
        if (await this.scheduledNum() < vars.SCHED_MAX) {
            let pairs: Array<[IRecentSub, IRecentSub]> = [];
            try {
                pairs = await this.getPairedTeams();
            } catch (e) {
                winston.error(e);
            }

            pairs.forEach(([first, second]) => winston.info(`Matchup: (${first.teamId}, ${second.teamId})`));

            for (const [{ id: firstId }, { id: secondId }] of pairs) {
                const [{ id }] = await db.connection("games")
                    .insert({ status: "queued" }, "*")
                    .then(db.rowsToGames);
                await db.connection("games_submissions")
                    .insert([{ game_id: id, submission_id: firstId }, { game_id: id, submission_id: secondId }])
                    .then();
            }
        }
    }
}
