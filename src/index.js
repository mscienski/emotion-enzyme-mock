const React = require('React');
const htmlTagNames = require('html-tag-names');
const svgTagNames = require('svg-tag-names');
const NodeCache = require('node-cache');
const uuid = require('tiny-uuid4');

const cache = new NodeCache();

function generateStyleString(styles, ...templateEntries) {
    function* generateTemplateEntries() {
        yield* templateEntries.map(e => e);
    }

    const entries = generateTemplateEntries();
    const thing = [styles[0], ...styles.slice(1).map((styleEntry) => {
        return `${entries.next().value}${styleEntry}`;
    })].join('');

    return thing;
}

function css(styles, ...templateEntries) {
    const styleId = uuid();
    cache.set(styleId, generateStyleString(styles, ...templateEntries));

    return styleId;
}

function styledParser(tagName, styles, ...templateEntries) {
    const styleId = uuid();
    cache.set(styleId, generateStyleString(styles, ...templateEntries));

    return () => React.createElement(tagName, { className: styleId });
}

const styled = {};

htmlTagNames.forEach((htmlTagName) => {
    styled[htmlTagName] = (styles, ...templateEntries) => styledParser(htmlTagName, styles, ...templateEntries);
});

svgTagNames.forEach((svgTagName) => {
    styled[svgTagName] = (styles, ...templateEntries) => styledParser(svgTagName, styles, ...templateEntries);
});

function getStyleByClassname(id) {
    return cache.get(id);
}

function getStyle(item) {
    if (typeof item === 'string') {
        return getStyleByClassname(item);
    }

    return getStyleByClassname(item.props.className);
}

function flush() {}
function fontFace() {}
function hydrate() {}
function idFor() {}
function injectGlobal() {}
function isLikeRule() {}
function keyFrames() {}
function objStyle() {}
function sheet() {}

module.exports = {
    css,
    flush,
    fontFace,
    getStyle,
    hydrate,
    idFor,
    injectGlobal,
    isLikeRule,
    keyFrames,
    objStyle,
    sheet
};
Object.keys(styled).forEach((key) => { module.exports[key] = styled[key]; });
module.exports.default = styled;
