#!/usr/bin/env node

const chalk = require('chalk');
const rimraf = require('rimraf');
const exec = require('child-process-promise').exec;
const FAILURE_STRATEGIES = require('../helpers/constants').FAILURE_STRATEGIES;
const catchLogger = require('../helpers/catch-logger');

function main() {
    return new Promise((resolve) => {
        console.log('');
        console.log(chalk.blue('Running production build'));

        console.log(chalk.yellow('Cleaning dist'));
        rimraf('dist', () => resolve());
    }).then(() => {
        const buildCmd = './node_modules/.bin/babel src --out-dir dist --colors';
        console.log(chalk.yellow(buildCmd));

        return exec(buildCmd, {
            stdio: 'inherit',
            env: Object.assign({}, process.env, {
                NODE_ENV: 'production'
            })
        });
    }).then((result) => {
        console.log(result.stdout);
        console.log('');
        console.log(chalk.green('Done'));
    }).catch(catchLogger('Build failed!', !module.parent ? FAILURE_STRATEGIES.BAIL : FAILURE_STRATEGIES.FAIL));
}

// Run script if running in CLI
if (!module.parent) main();

module.exports = main;
