#!/usr/bin/env node

const chalk = require('chalk');
const childProcess = require('child_process');

function main() {
    console.log('');
    console.log(chalk.blue('Running example tests'));

    const karmaCmd = './node_modules/.bin/karma start --watch --colors';
    console.log(chalk.yellow(karmaCmd));

    childProcess.execSync(karmaCmd, {
        stdio: 'inherit',
        env: Object.assign({
            NODE_ENV: 'test'
        }, process.env)
    });
}

// Run script if running in CLI
if (!module.parent) main();

module.exports = main;
