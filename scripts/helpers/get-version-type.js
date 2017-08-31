const _intersection = require('lodash/intersection');
const VERSION_TYPES = require('./constants').VERSION_TYPES;

function main() {
    // hopefully this will capture the version type correctly
    // OMG what is original?
    // npm outputs its arguments to process.env
    // E.g.
    // $ > npm version minor
    // process.env.npm_config_argv.original === ["version", "minor"]
    // TODO figure out a better way to find out what version is being applied to
    const npmArgs = JSON.parse(process.env.npm_config_argv).original;
    const matchedVersions = _intersection(VERSION_TYPES, npmArgs);

    if (matchedVersions.length > 1 || VERSION_TYPES.indexOf(matchedVersions[0]) === -1) {
        throw new Error('No valid version passed to `npm version` command. Please specify major|minor|patch');
    }

    return matchedVersions[0];
}

module.exports = main;
