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

    async randomTeams(num: number): Promise<db.Team[]> {
        return db.connection("teams").select("*")
            .then(db.rowsToTeams)
            .catch((e: Error) => { throw e; });
    }

    async scheduledNum(): Promise<number> {
        return 4;
    }

    async poll(): Promise<void> {
        let teams: db.Team[] = [];
        try {
            teams = await this.randomTeams(0);
        } catch (e) {
            winston.error(e);
        }

        teams.forEach(({ id, name }) => winston.info(`Team: ${id}, ${name}`));
    }
}
