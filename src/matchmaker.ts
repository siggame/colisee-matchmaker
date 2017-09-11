import { db } from "@siggame/colisee-lib";
import * as _ from "lodash";
import * as winston from "winston";

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
            .then(db.rowsToTeams)
            .then((teams) => teams) // add permutation
            .catch((e: Error) => { throw e; });
    }

    async scheduledNum(): Promise<number> {
        return 4;
    }

    async poll(): Promise<void> {
        let teams: db.Team[] = [];
        try {
            teams = await this.getTeamsRandomOrder();
        } catch (e) {
            winston.error(e);
        }

        teams.forEach(({ id, name }) => winston.info(`Team: ${id}, ${name}`));
    }
}
