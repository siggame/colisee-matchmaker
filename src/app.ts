const _ = require('lodash');
import * as logger from "./logger";
import * as db from "./db";
import * as utils from "./utils";

export class App {
    pollInterval: number;
    scheduleMax: number;

    private intervalId: any;

    constructor() {
        this.pollInterval = _.defaultTo(process.env.POLL_INTERVAL, 1);
        this.scheduleMax = _.defaultTo(process.env.SCHEDULE_MAX, 10);
        this.intervalId = undefined;
    }

    start() {
        this.intervalId = setInterval(this.poll, this.pollInterval);
    }

    stop() {
        clearInterval(this.intervalId);
    }

    randomTeams(num: number): Promise<number[]> {
        return new Promise((resolve, reject) => {
            db('team').orderByRaw(db.raw('RANDOM()')).limit(num)
                .then((rows): number[] => {
                    return rows.map(row => row.id)
                })
                .then(resolve)
                .catch(reject);
        });
    }

    scheduledNum(): Promise<number> {
        return new Promise((resolve, reject) => {
            db('game').where('status', 'scheduled').count('* AS cnt')
                .then((rows): number => {
                    return parseInt(rows[0].cnt)
                })
                .then(resolve)
                .catch(reject);
        });
    }

    poll(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.scheduledNum()
                .then((num): any => {
                    if(num > this.scheduleMax)
                        return resolve();
                    
                    return this.randomTeams(2);
                })
                .then(teams=>utils.createGame(teams))
                .then(_.noop)
                .then(resolve)
                .catch(reject);
        });
    }
}


