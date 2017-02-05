import * as db from "./db";
const _ = require('lodash');

export function createGame(teams: number[]): Promise<any> {
    return new Promise((resolve, reject)=>{
        
        db('game').insert({}, '*')
            .then(result=>result.rows[0])
            .then((game)=>{
                // Promises to insert team_game
                const ps = teams.map(team=>db('team_game').insert({team_id: team, game_id: game.id}, '*'));
                return Promise.all(ps)
                    .then(()=>{return game});
            })
            .then(resolve)
            .catch(reject);
    });
}