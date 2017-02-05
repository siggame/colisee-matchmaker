import * as knexModule from "knex";
const _ = require('lodash');

const knex = knexModule({
    client: 'pg',
    connection: {
        host : _.defaultTo(process.env.POSTGERS_HOST, "localhost"),
        port: _.defaultTo(process.env.POSTGERS_PORT, 5432),
        user : _.defaultTo(process.env.POSTGRES_USER, "postgres"),
        password : _.defaultTo(process.env.POSTGRES_PASSWORD, "postgres"),
        database : _.defaultTo(process.env.POSTGRES_DB, "postgres")
    }
});

export = knex;