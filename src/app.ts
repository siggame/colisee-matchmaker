import * as dotenv from "dotenv";
dotenv.config();

import { db } from "@siggame/colisee-lib";
import * as bodyParser from "body-parser";
import * as express from "express";
import { InternalServerError } from "http-errors";
import * as winston from "winston";

import { Matchmaker } from "./matchmaker";
import { PORT } from "./vars";

const app = express();
const mm = new Matchmaker();

winston.configure({
    transports: [
        new (winston.transports.Console)({
            timestamp: true,
        }),
    ],
});

app.get("/start", bodyParser.json(), (req, res) => {
    try {
        winston.info(req.body);
        mm.start();
        res.end();
    } catch (e) {
        winston.error(e);
        throw new InternalServerError(e);
    }
});

app.get("/stop", bodyParser.json(), (req, res) => {
    try {
        mm.stop();
        res.end();
    } catch (e) {
        winston.error(e);
        throw new InternalServerError(e);
    }
});

app.get("/queued", async (req, res) => {
    res.json(await db.connection("games").where({ status: "queued" }).then(db.rowsToGames));
});

app.listen(PORT, () => {
    mm.start();
    winston.info(`Listening on port ${PORT}...`);
});
