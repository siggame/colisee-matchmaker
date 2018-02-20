import { defaultTo, toNumber } from "lodash";

// Application
export const PORT: number = defaultTo<number>(toNumber(process.env.PORT), 8080);
export const REPLICATIONS: number = defaultTo<number>(toNumber(process.env.REPLICATIONS), 4);
export const SCHED_INTERVAL: number = defaultTo<number>(toNumber(process.env.SCHED_INTERVAL), 1000);
export const SCHED_MAX: number = defaultTo<number>(toNumber(process.env.SCHED_MAX), 30);
