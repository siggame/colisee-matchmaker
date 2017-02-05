import * as knexModule from "knex";
const _ = require('lodash');

export const query = knexModule({
    client: 'pg',
    connection: {
        host : _.defaultTo(process.env.POSTGRES_HOST, "localhost"),
        port: _.defaultTo(process.env.POSTGRES_PORT, 5432),
        user : _.defaultTo(process.env.POSTGRES_USER, "postgres"),
        password : _.defaultTo(process.env.POSTGRES_PASSWORD, "postgres"),
        database : _.defaultTo(process.env.POSTGRES_DB, "postgres")
    },
    debug: _.defaultTo(process.env.POSTGRES_DEBUG, false)
});

export function createGame(teams: number[]): Promise<any> {
    return new Promise((resolve, reject)=>{
        query('game').insert({}, '*')
            .then(rows=>rows[0])
            .then((game)=>{
                // Promises to insert team_game
                const ps = teams.map((team)=>{
                    return query('team_game').insert({team_id: team, game_id: game.id}, '*')
                });
                return Promise.all(ps)
                    .then(()=>{return game});
            })
            .then(resolve)
            .catch(reject);
    });
}

export function createUser(gitlab_id: number): Promise<any> {
    return new Promise((resolve, reject)=>{
        
        const data = {
            gitlab_id: gitlab_id,
        };

        query('user').insert(data, '*')
            .then(rows=>rows[0])
            .then(resolve)
            .catch(reject);
    });
}

export function createTeam(gitlab_id: number, members: number[]): Promise<any> {
    return new Promise((resolve, reject)=>{

        query('team').insert({gitlab_id: gitlab_id}, '*')
            .then(result=>result.rows[0])
            .then((team)=>{
                const ps = members.map((member)=>{
                    return query('user_team').insert({user_id: member, team_id: team.id});
                });

                return Promise.all(ps)
            })
            .then(_.noop)
            .then(resolve)
            .catch(reject);
    });
}