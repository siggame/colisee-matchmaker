import * as dotenv from "dotenv";
dotenv.config();

import * as winston from "winston";

winston.configure({
    transports: [
        new (winston.transports.Console)({
            timestamp: true,
        }),
    ],
});

import { Matchmaker } from "./matchmaker";

const mm = new Matchmaker();

mm.start();
