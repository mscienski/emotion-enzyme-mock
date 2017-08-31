#!/usr/bin/env node

const chalk = require('chalk');
const gitVerifyRemote = require('../git/verify-remote');
const gitCheckClean = require('../git/check-clean');
const lint = require('../lint');
const test = require('../test/dev');
const build = require('../build');
const generateChangelog = require('../changelog');
const security = require('../security');
const FAILURE_STRATEGIES = require('../helpers/constants').FAILURE_STRATEGIES;
const catchLogger = require('../helpers/catch-logger');
const getVersionType = require('../helpers/get-version-type');

function main() {
    console.log('');
    console.log(chalk.blue('Performing pre-versioning sanity checks'));

    let versionType;
    try {
        versionType = getVersionType();
    } catch (e) {
        catchLogger(e)();
    }

    return gitVerifyRemote()
    .then(gitCheckClean)
    .then(security)
    .then(lint)
    .then(test)
    .then(build)
    .then(() => generateChangelog(versionType))
    .then(() => {
        console.log('');
        console.log(chalk.green('Done'));
    }).catch(catchLogger('Pre-version checks failed!', !module.parent ? FAILURE_STRATEGIES.BAIL : FAILURE_STRATEGIES.FAIL));
}

// Run script if running in CLI
if (!module.parent) main();

module.exports = main;
