import * as _ from "lodash";

import * as vars from "./vars";
import * as db from "./db";

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

    randomTeams(num: number): Promise<number[]> {
        return new Promise<number[]>((resolve, reject) => {
            db.query('team').orderByRaw(db.query.raw('RANDOM()')).limit(num)
                .then(rows=>rows.map(row=>row.id))
                .then(resolve)
                .catch(reject);
        });
    }

    scheduledNum(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            db.query('game').where('status', 'scheduled').count('* AS cnt')
                .then(rows=>rows[0])
                .then(row=>parseInt(row.cnt))
                .then(resolve)
                .catch(reject);
        });
    }
    
    poll(): Promise<void> {
        return this.scheduledNum()
            .then(()=>this.randomTeams(2))
            .then(teams=>{
                if(teams.length < 2) throw new Error(`Expected 2 teams; got ${teams.length}`);
                return teams;
            })
            .then(teams=>db.createGame(teams))
            .then(_.noop)
    }
}


