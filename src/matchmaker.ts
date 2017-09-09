import * as _ from "lodash";

import { db } from "@siggame/colisee-lib";
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
        return db.connection("teams").select("*").then(db.rowsToTeams).catch((e) => { throw e; });
    }

    async scheduledNum(): Promise<number> {
        return 4;
    }

    async poll(): Promise<void> {
        let teams: db.Team[] = [];
        try {
            teams = await this.randomTeams(0);
        } catch (e) {
            console.log(e);
        }
        console.log(teams);
    }
}
