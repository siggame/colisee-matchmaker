import * as _ from "lodash";

// Application
export const SCHED_INTERVAL: number = _.defaultTo<number>(parseIntIfDefined(process.env.INTERVAL), 1000);
export const SCHED_MAX: number = _.defaultTo<number>(parseIntIfDefined(process.env.MAX), 5);

function parseIntIfDefined(value: string | null | undefined): number | null | undefined {
    if(value == null) return value; //Is null or undefined
    const intVal = parseInt(value, 10);
    if(Number.isNaN(intVal)) return undefined;
    return intVal;
}
