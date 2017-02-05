import * as chai from 'chai';
import * as db from "../src/db";

describe('Database Connection', function(){

    it('should connect to the database', function(done){
        // keep retrying b/c db needs time to come up
        this.retries(5);
        
        db.raw('SELECT 1+1 AS answer')
            .then(function(res) {
                chai.expect(res).to.exist;
                chai.expect(res.rows).to.exist;
                chai.expect(res.rows[0]).to.exist;
                chai.expect(res.rows[0].answer).to.exist;
                chai.expect(res.rows[0].answer).to.equal(2);
                done();
            });

    });

});