const React = require('react');
const htmlTagNames = require('html-tag-names');
const svgTagNames = require('svg-tag-names');
const uuid = require('tiny-uuid4');
const generateStyleString = require('./generateStyleString');
const cache = require('./cache');

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

Object.keys(styled).forEach((key) => { module.exports[key] = styled[key]; });

module.exports.styled = styled;
