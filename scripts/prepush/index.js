#!/usr/bin/env node

const chalk = require('chalk');
const lint = require('../lint');
const test = require('../test/dev');
const build = require('../build');
const FAILURE_STRATEGIES = require('../helpers/constants').FAILURE_STRATEGIES;
const catchLogger = require('../helpers/catch-logger');

function main() {
    console.log('');

    // Running on ci, skip pre-push because we already did tests in other scripts
    if (process.env.PWD.indexOf('workspace/npm_repo') !== -1 || process.env.JENKINS) {
        console.log(chalk.grey('Running on CI, skipping pre-push verification'));

        return Promise.resolve();
    }

    console.log(chalk.blue('Performing pre-push checks'));

    return lint()
    .then(test)
    .then(build)
    .catch(catchLogger('Pre-push checks failed!', !module.parent ? FAILURE_STRATEGIES.BAIL : FAILURE_STRATEGIES.FAIL));
}

// Run script if running in CLI
if (!module.parent) main();

module.exports = main;
