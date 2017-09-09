import * as _ from "lodash";

// Application
export const SCHED_INTERVAL: number = _.defaultTo<number>(_.toNumber(process.env.INTERVAL), 1000);
export const SCHED_MAX: number = _.defaultTo<number>(_.toNumber(process.env.MAX), 5);
export const PORT: number = _.defaultTo<number>(_.toNumber(process.env.PORT), 8080);
