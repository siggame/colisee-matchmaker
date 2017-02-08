import appTests from "./app";
import dbTests from "./db";

export default function(){
    dbTests();
    appTests();
};