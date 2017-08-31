const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

const config = {
    devtool: 'inline-source-map',
    target: 'web',
    module: {
        noParse: [
            /node_modules\/sinon\//,
            /node_modules\/emotion\//,
            /node_modules\/react-emotion\//
        ],
        rules: [{
            test: /\.js$/,
            include: [
                path.resolve(__dirname, 'src'),
                path.resolve(__dirname, 'example')
            ],
            enforce: 'pre',
            use: [{
                loader: 'babel-loader',
                options: {
                    "presets": [
						["env", {
							"targets": {
								"node": "current"
							}
						}],
						"react"
					],
                    "plugins": [
                        "transform-runtime"
                    ]
                }
            }, {
                loader: 'eslint-loader',
                options: {
                    failOnError: false,
                    failOnWarning: false
                }
            }]
        }, {
            test: /\.js$/,
            include: [
                /example\//
            ],
            loader: 'istanbul-instrumenter-loader',
            options: {
                esModules: true
            },
            enforce: 'post'
        }]
    },
    resolve: {
        modules: [
            'src',
            'example',
            'node_modules'
        ],
        extensions: ['.js'],
        alias: {
            'sinon': 'sinon/pkg/sinon',
            'emotion': path.resolve(__dirname, 'src/index'),
            'react-emotion': path.resolve(__dirname, 'src/index')
        }
    },
    externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/addons': true,
        'react/lib/ReactContext': true
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        {
            apply: function(compiler) {
                compiler.plugin('done', (stats) => {
                    if (stats.compilation.errors.length > 0) {
                        throw new Error(stats.compilation.errors.map((err) => `\n${err.message}` || `\n${err}`));
                    }
                });
            }
        }
    ]
};

const webpackMiddleware = {
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: {
        // Config for minimal console.log mess.
        // No asset Information
        assets: false,
        // No chunk information, this is very verbose
        chunks: false,
        // Nor built module information
        chunkModules: false,
        // Use colors
        colors: true,
        // Display the entry points with the corresponding bundles
        entrypoints: false,
        // No need for compilation hash
        hash: false,
        // No need for module information, as of webpack 3
        modules: false,
        // No timing information
        timings: false,
        // Show which exports of a module are used
        usedExports: false,
        // No webpack version information
        version: false
    }
};

module.exports = {
    webpack: config,
    webpackMiddleware
};