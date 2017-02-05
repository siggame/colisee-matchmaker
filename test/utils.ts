import * as db from "../src/db";
const _ = require('lodash');

export function createUser(gitlab_id: number): Promise<any> {
    return new Promise((resolve, reject)=>{
        
        const data = {
            gitlab_id: gitlab_id,
        };

        db('user').insert(data, '*')
            .then(result=>result.rows[0])
            .then(resolve)
            .catch(reject);
    });
}

export function createTeam(gitlab_id: number, members: number[]): Promise<any> {
    return new Promise((resolve, reject)=>{

        db('team').insert({gitlab_id: gitlab_id}, '*')
            .then(result=>result.rows[0])
            .then((team)=>{

                const ps = members.map((member)=>{
                    return db('user_team').insert({user_id: member, team_id: team.id});
                });

                return Promise.all(ps)
            })
            .then(_.noop)
            .then(resolve)
            .catch(reject);
    });
}