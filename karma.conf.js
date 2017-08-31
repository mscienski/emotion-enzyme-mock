const path = require('path');
const webpackConfig = require('./webpack.config.test');

const processArgs = process.argv.slice(2);
const isWatch = processArgs.indexOf('--watch') !== -1;

const karmaConfig = {
    browsers: ['HeadlessChrome'],
    customLaunchers: {
        HeadlessChrome: {
            base: 'Chrome',
            flags: [
                '--no-sandbox',
                // See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
                '--headless',
                '--disable-gpu',
                // Without a remote debugging port, Google Chrome exits immediately.
                '--remote-debugging-address=0.0.0.0',
                '--remote-debugging-port=9222'
            ]
        }
    },
    singleRun: !isWatch,
    autoWatch: isWatch,
    frameworks: ['mocha'],
    files: [
        'tests.webpack.js'
    ],
    preprocessors: {
        'tests.webpack.js': [
            'webpack',
            'sourcemap'
        ]
    },
    reporters: ['dots', 'coverage-istanbul'],
    plugins: [
        require('karma-webpack'),
        require('karma-mocha'),
        require('karma-sourcemap-loader'),
        require('karma-chrome-launcher'),
        require('karma-coverage-istanbul-reporter')
    ],
    betterMochaReporter: {
        showDiff: true
    },
    client: {
        captureConsole: true,
        mocha: {
            fullTrace: true
        }
    },
    coverageIstanbulReporter: {
        reports: ['text-summary'],
        fixWebpackSourcePaths: true
    },
    webpack: webpackConfig.webpack,
    webpackMiddleware: webpackConfig.webpackMiddleware
}

module.exports = function(config) {
    config.set(karmaConfig);
}
