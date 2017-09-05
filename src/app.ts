import * as dotenv from "dotenv";
dotenv.config();

import { Matchmaker } from "./matchmaker";

const mm = new Matchmaker();

mm.start();
