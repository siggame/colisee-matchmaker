import { db } from "@siggame/colisee-lib";
import * as _ from "lodash";
import * as winston from "winston";

import { generateDerangedPairs, permute } from "./helpers";
import * as vars from "./vars";

export class Matchmaker {

    private intervalId: any;

    constructor() {
        this.intervalId = undefined;
    }

    start() {
        this.intervalId = setInterval(() => { this.poll(); }, vars.SCHED_INTERVAL);
    }

    stop() {
        clearInterval(this.intervalId);
    }

    async getTeamsRandomOrder(): Promise<db.Team[]> {
        return db.connection("teams").select("*")
            .then(permute)
            .then(db.rowsToTeams)
            .catch((e: Error) => { throw e; });
    }

    async scheduledNum(): Promise<number> {
        return 4;
    }

    async poll(): Promise<void> {
        let pairs: Array<[db.Team, db.Team]> = [];
        try {
            const teams = await this.getTeamsRandomOrder();
            pairs = generateDerangedPairs(teams);
        } catch (e) {
            winston.error(e);
        }

        pairs.forEach((teams) => {
            winston.info("Team Matchup:");
            teams.forEach(({ id, name }) => winston.info(`Team: ${id} ${name}`));
        });
    }
}
