const chai = require('chai');

chai.config.truncateThreshold = 0;
chai.config.includeStack = true;
chai.use(require('chai-enzyme')());
chai.use(require('chai-string'));
require('babel-polyfill');

var contextualTestRequire = require.context('./example', true, /\.test\.js$/);
contextualTestRequire.keys().forEach(contextualTestRequire);

var contextualSrcRequire = require.context('./example', true, /component\.js$/);
contextualSrcRequire.keys().forEach(contextualSrcRequire);
