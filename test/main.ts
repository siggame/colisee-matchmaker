import * as db from "../src/db";
import * as chai from "chai";

import integrationTests from "./integration";
import unitTests from "./unit";

describe('Main', function(){

    unitTests();    

    describe('Db Connection', function(){
        it('should connect to the database', function(done){
            // keep retrying b/c db needs time to come up
            this.retries(5);
            db.query.raw('SELECT 1+1')
                .then(()=>done())
                .catch(err=>chai.expect(err).to.not.exist)
        });
    });

    integrationTests();

});