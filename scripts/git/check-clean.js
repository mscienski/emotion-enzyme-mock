#!/usr/bin/env node

const chalk = require('chalk');
const exec = require('child-process-promise').exec;
const FAILURE_STRATEGIES = require('../helpers/constants').FAILURE_STRATEGIES;
const catchLogger = require('../helpers/catch-logger');

function main() {
    console.log('');
    console.log(chalk.blue('Checking git working directory status'));
    const gitCmd = 'git status -s';
    console.log(chalk.yellow(gitCmd));

    return exec(gitCmd).then((result) => {
        if (result.stderr) {
            return Promise.reject(result.stderr);
        } else if (result.stdout) {
            return Promise.reject(`Working directory not clean!\n${result.stdout}`);
        }

        return Promise.resolve();
    }).then(() => {
        console.log('');
        console.log(chalk.green('Done'));
    }).catch(catchLogger('Git clean workspace check failed!', !module.parent ? FAILURE_STRATEGIES.BAIL : FAILURE_STRATEGIES.FAIL));
}

// Run script if running in CLI
if (!module.parent) main();

module.exports = main;
