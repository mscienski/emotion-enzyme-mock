const { expect } = require('chai');
const { describe, it } = require('mocha');
const NodeCache = require('node-cache');
const cache = require('../lib/cache');

describe('cache', () => {
    it('is an instance of NodeCache', () => {
        expect(cache)
            .to.be.an.instanceOf(NodeCache);
    });
});
