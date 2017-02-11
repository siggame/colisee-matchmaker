import * as _ from "lodash";

export const POSTGRES_HOST: string = _.defaultTo(process.env.POSTGRES_HOST, "localhost");
export const POSTGRES_PORT: number = _.defaultTo(process.env.POSTGRES_PORT, 5432);
export const POSTGRES_USER: string = _.defaultTo(process.env.POSTGRES_USER, "postgres");
export const POSTGRES_PASSWORD: string = _.defaultTo(process.env.POSTGRES_PASSWORD, "postgres");
export const POSTGRES_DB: string =  _.defaultTo(process.env.POSTGRES_DB, "postgres");

export const SCHED_INTERVAL: number = _.defaultTo(process.env.INTERVAL, 1000);
export const SCHED_MAX: number = _.defaultTo(process.env.MAX, 5);