import { expect } from "chai";

import { db } from "@siggame/colisee-lib";
import { app } from "../../src/app";

export default () => {

    describe("App", function () {
        it("should not be null", (done) => {
            expect(app).to.not.be.null;
            done();
        });
    });

};
