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

app.get("/start", bodyParser.json(), (req, res, next) => {
    try {
        mm.start();
    } catch (e) {
        winston.error(e);
        next(new InternalServerError("Failed to start the matchmaker."));
        return;
    }
    res.end();
});

app.get("/stop", bodyParser.json(), (req, res, next) => {
    try {
        mm.stop();
    } catch (e) {
        winston.error(e);
        next(new InternalServerError("Failed to stop the matchmaker."));
        return;
    }
    res.end();
});

app.get("/queued", async (req, res, next) => {
    const queuedGames = await db.connection("games")
        .where({ status: "queued" })
        .then(db.rowsToGames)
        .catch(next);

    res.json(queuedGames);
});

export default () => {
    app.listen(PORT, () => {
        mm.start();
        winston.info(`Listening on port ${PORT}...`);
    });
};

export { app };
