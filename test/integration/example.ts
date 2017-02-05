import * as chai from 'chai';
import * as db from "../../src/db";
import { App } from "../../src/app";

describe('Example Unit Tests', function(){

    const app = new App();

    const initialTeams = [
        {name: "team1", gitlab_id: 1},
        {name: "team2", gitlab_id: 2},
        {name: "team3", gitlab_id: 3},
    ]

    before('Populate the database with users', function(done){
        const inserts = initialTeams.map((team) => {
            return db('team').insert(team);
        });

        Promise.all(inserts)
            .then(()=>done());
    });

    it('should be able to return a promise of N random teams', function(done){
        app.randomTeams(2)
            .then((teamIds)=>{
                chai.expect(teamIds).is.an('array');
                chai.expect(teamIds).is.length(2);
                teamIds.forEach((teamId) => {
                    chai.expect(teamId).is.gte(0);
                })
                done();
            });
    });

    it('should be able return a promise of number of currently scheduled games', function(done){
        app.scheduledNum()
            .then((cnt)=>{
                chai.expect(cnt).to.be.a('number');
                chai.expect(cnt).to.equal(0);
                done();
            });
    });

    it('should be able to be polled once', function(done){
        app.poll()
            .then(()=>app.scheduledNum())
            .then((cnt)=>{
                chai.expect(cnt).equals(1);
            })
            .then(()=>done());
    })
});