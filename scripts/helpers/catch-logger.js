const chalk = require('chalk');
const _get = require('lodash/get');
const FAILURE_STRATEGIES = require('./constants').FAILURE_STRATEGIES;

module.exports = function catchLogger(humanMessage, failureStrategy = FAILURE_STRATEGIES.FAIL) {
    return function(err) { // eslint-disable-line
        const errorMessage = !(_get(err, 'stderr') || _get(err, 'stdout')) ? err : '';
        console.error(chalk.red(humanMessage));
        _get(err, 'stdout') && console.error(chalk.red(err.stdout));
        _get(err, 'stderr') && console.error(chalk.red(err.stderr));
        errorMessage && console.error(chalk.red(errorMessage));
        if (failureStrategy === FAILURE_STRATEGIES.CONTINUE) {
            return Promise.resolve();
        } else if (process && failureStrategy === FAILURE_STRATEGIES.BAIL) {
            process.exit(1);
        } else {
            return Promise.reject();
        }
    };
};
