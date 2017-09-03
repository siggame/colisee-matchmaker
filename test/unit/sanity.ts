import { expect } from 'chai';

import { App } from '../../src/app';

describe('Sanity', function(){
    it('shall be sane', () => {
        expect(true).to.be.true;
        expect(false).to.be.false;
    });
    it('shall be sane', () => {
        expect(true).to.not.be.false;
        expect(false).to.be.false;
    });
});