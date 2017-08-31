const uuid = require('tiny-uuid4');
const generateStyleString = require('./generateStyleString');
const cache = require('./cache');

function css(styles, ...templateEntries) {
    const styleId = uuid();
    cache.set(styleId, generateStyleString(styles, ...templateEntries));

    return styleId;
}

module.exports = css;
