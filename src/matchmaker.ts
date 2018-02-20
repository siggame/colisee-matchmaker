import { db } from "@siggame/colisee-lib";
import { QueryBuilder } from "knex";
import { isNil } from "lodash";
import * as winston from "winston";

import { createPairs, permute } from "./helpers";
import { REPLICATIONS, SCHED_INTERVAL, SCHED_MAX } from "./vars";

interface IRecentSub {
    id: number;
    teamId: number;
}

interface IMatchmakerOptions {
    interval: number;
    matchReplications: number;
    maxMatches: number;
}
/**
 * Matchmaker creates random matchups and replicates them.
 * 
 * @export
 */
export class Matchmaker implements IMatchmakerOptions {

    private intervalId?: NodeJS.Timer;

    /**
     * Creates an instance of Matchmaker.
     * @param {number} [interval=SCHED_INTERVAL] 
     * @param {number} [matchReplications=REPLICATIONS] 
     * @param {number} [maxMatches=SCHED_MAX] 
     * @memberof Matchmaker
     */
    constructor(
        public interval: number = SCHED_INTERVAL,
        public matchReplications: number = REPLICATIONS,
        public maxMatches: number = SCHED_MAX,
    ) {
        this.intervalId = undefined;
    }

    /**
     * Starts creating matchups. Matchups are created
     * using `interval` as the interval.
     * 
     * @memberof Matchmaker
     */
    start() {
        if (isNil(this.intervalId)) {
            this.intervalId = setInterval(() => {
                this.createMatchups().catch((e) => { winston.error(e); });
            }, this.interval);
        }
    }

    /**
     * Stops creating matchups.
     * 
     * @memberof Matchmaker
     */
    stop() {
        if (!isNil(this.intervalId)) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }

    /**
     * Randomly creates pairs of teams for a matchup and
     * selects the most recent submission for each.
     * 
     * @private
     * @memberof Matchmaker
     */
    private async getPairedTeams(): Promise<[IRecentSub, IRecentSub][]> {
        const recentSubmissions = await db.connection.from((query: QueryBuilder) => {
            return query.from("submissions")
                .select("team_id as teamId", db.connection.raw("max(version) as recent_version"))
                .where({ status: "finished" })
                .groupBy("teamId")
                .as("recent_subs");
        }).join("submissions as subs", function () {
            this.on({ "subs.team_id": "recent_subs.teamId" }).andOn({ "subs.version": "recent_subs.recent_version" });
        }).select("subs.id as id", "teamId")
            .catch((e: Error) => { throw e; });
        const randomMatchups = createPairs<IRecentSub>(permute(recentSubmissions));
        return randomMatchups;
    }

    /**
     * Gets the number of currently queued games.
     * 
     * @private
     * @memberof Matchmaker
     */
    private async scheduledNum(): Promise<number> {
        const [{ count }] = await db.connection("games")
            .where({ status: "queued" })
            .count("*")
            .catch((e: Error) => { throw e; });
        return count;
    }

    /**
     * Creates games based on the matchups if the number of
     * scheduled games is below `maxMatches`.
     * 
     * @private
     * @memberof Matchmaker
     */
    private async createMatchups(): Promise<void> {
        if (await this.scheduledNum() < this.maxMatches) {
            let pairs: Array<[IRecentSub, IRecentSub]> = [];
            try {
                pairs = await this.getPairedTeams();
            } catch (e) {
                winston.error(e);
            }

            pairs.forEach(([first, second]) => winston.info(`Matchup: (${first.teamId}, ${second.teamId})`));

            for (const [{ id: firstId }, { id: secondId }] of pairs) {
                for (let i = 0; i < this.matchReplications; i++) {
                    const [{ id }] = await db.connection("games")
                        .insert({ status: "queued" }, "*")
                        .then(db.rowsToGames);
                    await db.connection("games_submissions")
                        .insert([{ game_id: id, submission_id: firstId }, { game_id: id, submission_id: secondId }]);
                }
            }
        }
    }
}
