#!/usr/bin/env node

const chalk = require('chalk');
const execSync = require('child_process').execSync;
const rimraf = require('rimraf');

function main() {
    return new Promise((resolve) => {
        console.log('');
        console.log(chalk.blue('Running umd build'));

        console.log(chalk.yellow('Cleaning dist'));
        rimraf('dist', () => resolve());
    }).then(() => {
        const buildCmd = './node_modules/.bin/webpack --config webpack.config.js --watch';
        console.log(chalk.yellow(buildCmd));

        execSync(buildCmd, {
            stdio: 'inherit',
            env: Object.assign({}, process.env, {
                NODE_ENV: 'production',
                NODE_PATH: './src'
            })
        });
    });
}

// Run script if running in CLI
if (!module.parent) main();

module.exports = main;
