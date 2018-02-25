import * as dotenv from "dotenv";
dotenv.config();

import { db } from "@siggame/colisee-lib";
import * as express from "express";
import { ErrorRequestHandler, RequestHandler } from "express";
import { HttpError, InternalServerError } from "http-errors";
import * as winston from "winston";

import { Matchmaker } from "./matchmaker";
import { PORT } from "./vars";

winston.configure({
    transports: [
        new (winston.transports.Console)({
            timestamp: true,
        }),
    ],
});

// Logger Middleware
const logger: RequestHandler = (req, res, next) => {
    winston.info(`${req.method}\t${req.url}`);
    next();
};

const errorLogger: ErrorRequestHandler = (error: HttpError, req, res, next) => {
    winston.error(error.message);
    res.status(error.statusCode).end(error.name);
};

const app = express();
const mm = new Matchmaker();

app.use(logger);
app.use(errorLogger);

app.get("/start", (req, res, next) => {
    try {
        mm.start();
    } catch (e) {
        winston.error(e);
        next(new InternalServerError("Failed to start the matchmaker."));
        return;
    }
    res.end();
});

app.get("/stop", (req, res, next) => {
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
