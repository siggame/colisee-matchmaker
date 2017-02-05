import * as chai from 'chai';
import * as db from "../../src/dbUtil";
import { App } from "../../src/app";
const _ = require('lodash');

describe('Example Unit Tests', function(){

    const app = new App();

    const initialTeams = [
        {gitlab_id: 1},
        {gitlab_id: 2},
        {gitlab_id: 3},
    ]

    before('Populate the database with users', function(){
        const ps = [];
        initialTeams.forEach((team) => {
            ps.push(db.createTeam(team.gitlab_id, []));
        });

        return Promise.all(ps)
    });


    it('should be able to return a promise of N random teams', function(){
        return app.randomTeams(2)
            .then((teamIds)=>{
                chai.expect(teamIds).is.an('array');
                chai.expect(teamIds).is.length(2);
                teamIds.forEach((teamId) => {
                    chai.expect(teamId).is.gte(0);
                })
            })
    });

    it('should be able return a promise of number of currently scheduled games', function(){
        return app.scheduledNum()
            .then((cnt)=>{
                chai.expect(cnt).to.be.a('number');
                chai.expect(cnt).to.equal(0);
            })
    });

    it('should be able to be polled once', function(){
        return app.poll()
            .then(()=>app.scheduledNum())
            .then((cnt)=>{
                chai.expect(cnt).equals(1);
            })
    })
});