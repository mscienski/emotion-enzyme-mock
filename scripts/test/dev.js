#!/usr/bin/env node

const chalk = require('chalk');
const exec = require('child-process-promise').exec;
const FAILURE_STRATEGIES = require('../helpers/constants').FAILURE_STRATEGIES;
const catchLogger = require('../helpers/catch-logger');

function main() {
    console.log('');
    console.log(chalk.blue('Running unit tests'));

    const karmaCmd = './node_modules/.bin/karma start --colors';
    console.log(chalk.yellow(karmaCmd));

    return exec(karmaCmd, {
        stdio: 'inherit',
        env: Object.assign({
            NODE_ENV: 'test'
        }, process.env)
    }).then((result) => {
        // result.stderr will exist but only because of webpack loader-options-plugin, ignore for now
        console.log(result.stdout);
        console.log('');
        console.log(chalk.green('Done'));
    }).catch(catchLogger('Tests failed!', !module.parent ? FAILURE_STRATEGIES.BAIL : FAILURE_STRATEGIES.FAIL));
}

// Run script if running in CLI
if (!module.parent) main();

module.exports = main;
