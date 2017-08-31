/* eslint-disable global-require */
module.exports = Object.assign(
    { css: require('./css') },
    { getStyle: require('./getStyle').getStyle },
    require('./noops'),
    require('./styled')
);
module.exports.default = require('./styled').styled;
