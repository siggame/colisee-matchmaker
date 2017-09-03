import * as winston from "winston";

exports = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: "app.log" })
    ]
});