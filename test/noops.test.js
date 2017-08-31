const { expect } = require('chai');
const { describe, it } = require('mocha');
const noops = require('../lib/noops');

describe('noops', () => {
    it('exports a series of noop functions for apis other than css and styled', () => {
        Object.keys(noops).forEach((key) => {
            expect(noops[key])
                .to.be.a('function');
        });
    });
});
