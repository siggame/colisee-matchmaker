import * as dotenv from "dotenv";
dotenv.config();

import { db } from "@siggame/colisee-lib";
import * as bodyParser from "body-parser";
import * as express from "express";
import { HttpError, InternalServerError } from "http-errors";
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

const errorLogger: express.ErrorRequestHandler = (error: HttpError, req, res, next) => {
    winston.error(error.message);
    res.status(error.statusCode).end(error.name);
};

app.use(errorLogger);

app.get("/start", bodyParser.json(), (req, res) => {
    try {
        winston.info(req.body);
        mm.start();
        res.end();
    } catch (e) {
        winston.error(e);
        throw new InternalServerError("Failed to start the matchmaker.");
    }
});

app.get("/stop", bodyParser.json(), (req, res) => {
    try {
        mm.stop();
        res.end();
    } catch (e) {
        winston.error(e);
        throw new InternalServerError("Failed to stop the matchmaker.");
    }
});

app.get("/queued", async (req, res) => {
    res.json(await db.connection("games").where({ status: "queued" }).then(db.rowsToGames));
});

function listener() {
    mm.start();
    winston.info(`Listening on port ${PORT}...`);
}

export { app, listener };
