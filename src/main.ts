import { App } from "./app";

let app = new App();

app.start();

process.on('SIGINT', function(){
    app.stop();
});