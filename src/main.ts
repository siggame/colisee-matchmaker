import * as dotenv from "dotenv";
dotenv.config();

import { App } from "./app";

let app = new App();

app.start();