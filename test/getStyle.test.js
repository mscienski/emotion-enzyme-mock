const { expect } = require('chai');
const { describe, it } = require('mocha');
const { getStyle, getStyleByClassName } = require('../lib/getStyle');
const cache = require('../lib/cache');

describe('getStyleByClassName', () => {
    it('gets a style string from the cache by a className', () => {
        const styleString = 'display: "none"';
        cache.set('foo', styleString);

        expect(getStyleByClassName('foo'))
            .to.equal(styleString);
    });
});

describe('getStyle', () => {
    it('gets a style string from the cache by a classname when the argument is a string', () => {
        const styleString = 'display: "none"';
        cache.set('foo', styleString);

        expect(getStyle('foo'))
            .to.equal(styleString);
    });

    it('gets a style string from the cache by a className prop from a react component/object', () => {
        const styleString = 'display: "none"';
        cache.set('foo', styleString);

        const component = {
            props: {
                className: 'foo'
            }
        };

        expect(getStyle(component))
            .to.equal(styleString);
    });
});
