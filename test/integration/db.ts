import * as db from "../../src/db";
import * as chai from "chai";

export default function() {

    describe('Db', function(){

        it('should be able to create a user', function(){
            return db.createUser(1)
                .then(user=>{
                    chai.expect(user).to.exist;
                    chai.expect(user).has.property('id');
                })
        })

    });

}