const _ = require('lodash');
import * as logger from "./logger";
import * as db from "./dbUtil";

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
            db.query('team').orderByRaw(db.query.raw('RANDOM()')).limit(num)
                .then(rows=>rows.map(row=>row.id))
                .then(ids=>resolve(ids))
                .catch(reject);
        });
    }

    scheduledNum(): Promise<number> {
        return new Promise((resolve, reject) => {
            db.query('game').where('status', 'scheduled').count('* AS cnt')
                .then((rows): number => {
                    console.log(JSON.stringify(rows));
                    return parseInt(rows[0].cnt)
                })
                .then(resolve)
                .catch(reject);
        });
    }

    poll(): Promise<void> {
        return this.scheduledNum()
            .then(()=>this.randomTeams(2))
            .then(teams=>db.createGame(teams))
            .then(()=>_.noop)
    }
}


