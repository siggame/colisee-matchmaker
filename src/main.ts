import * as dotenv from "dotenv";
dotenv.config();

import { App } from "./app";

const app = new App();

app.start();
