#!/usr/bin/env node

const chalk = require('chalk');
const glob = require('glob-fs')();
const Mocha = require('mocha');
const FAILURE_STRATEGIES = require('../helpers/constants').FAILURE_STRATEGIES;
const catchLogger = require('../helpers/catch-logger');

function main() {
    console.log('');
    console.log(chalk.blue('Running unit tests'));

    const mocha = new Mocha();

    return glob.readdirPromise('test/**/*.test.js').then((files) => {
        files.forEach((file) => {
            mocha.addFile(file);
        });

        return new Promise((resolve, reject) => {
            mocha.run((failures) => {
                if (failures) {
                    reject(failures);
                }
            }).on('end', () => {
                resolve();
            });
        });
    }).then(() => {
        console.log('');
        console.log(chalk.green('Done'));
    }).catch(catchLogger('Build failed!', !module.parent ? FAILURE_STRATEGIES.BAIL : FAILURE_STRATEGIES.FAIL));
}

// Run script if running in CLI
if (!module.parent) main();

module.exports = main;
