#!/usr/bin/env node

const chalk = require('chalk');
const exec = require('child-process-promise').exec;
const catchLogger = require('../helpers/catch-logger');
const FAILURE_STRATEGIES = require('../helpers/constants').FAILURE_STRATEGIES;
const getVersionType = require('../helpers/get-version-type');
const _get = require('lodash/get');

function main() {
    // OMG what is original?
    // npm outputs its arguments to process.env
    // E.g.
    // $ > npm version minor
    // process.env.npm_config_argv.original === ["version", "minor"]
    // TODO figure out a better way to find out what version is being applied to
    const npmArgs = JSON.parse(process.env.npm_config_argv).original;
    const isVersioning = npmArgs.indexOf('version') !== -1;

    console.log('');
    console.log(chalk.blue('Adding files to commit for versioning'));
    const gitCmd = 'git push --no-verify && git push --tags --no-verify';
    console.log(chalk.yellow(gitCmd));

    return exec(gitCmd).then((result) => {
        console.log(_get(result, 'stdout'));
        console.log('');
        console.log(chalk.green('Done'));
    }).catch(catchLogger('Git push files and tags failed!', !module.parent ? FAILURE_STRATEGIES.BAIL : FAILURE_STRATEGIES.FAIL));
}

// Run script if running in CLI
if (!module.parent) main();

module.exports = main;
