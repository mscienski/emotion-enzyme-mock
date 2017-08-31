#!/usr/bin/env node

const chalk = require('chalk');
const exec = require('child-process-promise').exec;
const FAILURE_STRATEGIES = require('../helpers/constants').FAILURE_STRATEGIES;
const catchLogger = require('../helpers/catch-logger');

function main() {
    console.log('');
    console.log(chalk.blue('Checking for security issues'));
    // Or require some packages and run them
    const bashCmd = './node_modules/.bin/nsp check';
    console.log(chalk.yellow(bashCmd));

    return exec(bashCmd)
    .then((result) => {
        // This Promise rejection may not always be appropriate, some tools _log info_ to stderr :face_with_rolling_eyes:
        if (result.stderr) {
            return Promise.reject(result.stderr);
        }
        console.log(result.stdout);

        return Promise.resolve();
    })
    .then(() => {
        console.log('');
        console.log(chalk.green('Done'));
    })
    .catch(catchLogger('Security issues found!', !module.parent ? FAILURE_STRATEGIES.BAIL : FAILURE_STRATEGIES.FAIL));
}

// Run script if running in CLI
if (!module.parent) main();

module.exports = main;
