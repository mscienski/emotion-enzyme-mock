#!/usr/bin/env node

const chalk = require('chalk');
const changelog = require('generate-changelog');
const prependFile = require('prepend-file');
const FAILURE_STRATEGIES = require('../helpers/constants').FAILURE_STRATEGIES;
const catchLogger = require('../helpers/catch-logger');

function main(versionType) {
    return new Promise((resolve) => {
        console.log('');
        console.log(chalk.blue('Generating Changelog'));
        try {
            const changelogOptions = {};
            changelogOptions[versionType] = true;

            resolve(changelog.generate(changelogOptions));
        } catch (e) {
            resolve();
        }
    }).then((log) => {
        if (log) {
            return new Promise((resolve, reject) => {
                prependFile('CHANGELOG.md', log, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(chalk.green('Changelog saved to CHANGELOG.md'));
                        console.log('');
                        console.log(chalk.green('Done'));
                        resolve();
                    }
                });
            });
        }

        console.log(chalk.grey('Couldn\'t parse the version for which to generate changelog, skipped generating changelog'));
        return Promise.resolve();
    })
    .catch(catchLogger('Generating changelog failed!', !module.parent ? FAILURE_STRATEGIES.BAIL : FAILURE_STRATEGIES.FAIL));
}

// Run script if running in CLI
if (!module.parent) main();

module.exports = main;
