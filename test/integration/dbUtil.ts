import * as db from "../../src/dbUtil";
import * as chai from "chai";

describe('Database Utility', function(){

    it('should be able to create a user', function(){
        return db.createUser(1)
            .then(user=>{
                chai.expect(user).to.exist;
                chai.expect(user).has('id');
            });
    })

    it('should be able to create a user', function(){
        return db.createUser(1)
            .then(user=>{
                chai.expect(user).to.exist;
                chai.expect(user).has('id');
            });
    })

});