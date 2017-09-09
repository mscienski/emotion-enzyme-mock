const React = require('react');
const htmlTagNames = require('html-tag-names');
const svgTagNames = require('svg-tag-names');
const uuid = require('tiny-uuid4');
const generateStyleString = require('./generateStyleString');
const cache = require('./cache');
const _get = require('lodash/get');

function styledParser(tag, styles, ...templateEntries) {
    const styleId = uuid();
    cache.set(styleId, generateStyleString(styles, ...templateEntries));

    if (typeof tag === 'string') {
        return (props) => {
            let finalClasses = styleId;
            if (_get(props, 'className')) {
                finalClasses = `${finalClasses} ${props.className}`; // eslint-disable-line react/prop-types
            }
            return React.createElement(tag, { className: finalClasses });
        };
    } else if (typeof tag === 'function') {
        const name = tag.displayName || tag.name || 'Component';
        return (props) => {
            let finalClasses = styleId;
            if (_get(props, 'className')) {
                finalClasses = `${finalClasses} ${props.className}`; // eslint-disable-line react/prop-types
            }
            return React.createElement(name, { className: finalClasses });
        };
    }

    throw new Error('Invalid element type: expected string or class/function');
}

const styledByTags = {};

htmlTagNames.forEach((htmlTagName) => {
    styledByTags[htmlTagName] = (styles, ...templateEntries) => styledParser(htmlTagName, styles, ...templateEntries);
});

svgTagNames.forEach((svgTagName) => {
    styledByTags[svgTagName] = (styles, ...templateEntries) => styledParser(svgTagName, styles, ...templateEntries);
});

function Styled() {
    const styleThis = (itemToStyle) => {
        if (typeof itemToStyle === 'string') {
            return (...args) => styledByTags[itemToStyle](...args);
        } else if (typeof itemToStyle === 'function') {
            return (...args) => {
                return styledParser(itemToStyle, ...args);
            };
        }

        throw new Error('Invalid element type: expected string or class/function');
    };

    Object.keys(styledByTags).forEach((key) => { styleThis[key] = styledByTags[key]; });

    return styleThis;
}

module.exports = new Styled();
