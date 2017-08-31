const cache = require('./cache');

function getStyleByClassName(id) {
    return cache.get(id);
}

function getStyle(item) {
    if (typeof item === 'string') {
        return getStyleByClassName(item);
    }

    return getStyleByClassName(item.props.className);
}

module.exports = {
    getStyle,
    getStyleByClassName
};
