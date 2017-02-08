import * as chai from 'chai';
import { App } from '../../src/app';

export default function() {

    describe('App', function(){

        it('should be constructable', function(){
            const app = new App();
        });
    });

}