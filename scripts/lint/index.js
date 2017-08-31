#!/usr/bin/env node

const chalk = require('chalk');
const exec = require('child-process-promise').exec;
const FAILURE_STRATEGIES = require('../helpers/constants').FAILURE_STRATEGIES;
const catchLogger = require('../helpers/catch-logger');

function main() {
    console.log('');
    console.log(chalk.blue('Linting code'));

    const eslintCmd = './node_modules/.bin/eslint -c .eslintrc --color src scripts';
    console.log(chalk.yellow(eslintCmd));

    return exec(eslintCmd, {
        stdio: 'inherit'
    }).then((result) => {
        if (result.stderr) {
            return Promise.reject(result.stderr);
        }

        console.log(result.stdout);
        console.log('');
        console.log(chalk.green('Done'));

        return Promise.resolve();
    }).catch(catchLogger('Linting failed!', !module.parent ? FAILURE_STRATEGIES.BAIL : FAILURE_STRATEGIES.FAIL));
}

// Run script if running in CLI
if (!module.parent) main();

module.exports = main;
