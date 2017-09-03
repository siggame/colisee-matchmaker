import * as _ from "lodash";

import * as db from "./common/db";
import * as vars from "./vars";

export class App {

    private intervalId: any;

    constructor() {
        this.intervalId = undefined;
    }

    start() {
        this.intervalId = setInterval(this.poll, vars.SCHED_INTERVAL);
    }

    stop() {
        clearInterval(this.intervalId);
    }

    async randomTeams(num: number): Promise<any> {
    }

    async scheduledNum(): Promise<number> {
        return 4;
    }
    
    async poll(): Promise<void> {
    }
}


