const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: 'node',
    context: path.resolve(__dirname, './lib'),
    entry: [
        './index.js'
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: `index.js`,
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }]
        }]
    },
    resolve: {
        modules: [
            'lib',
            'node_modules'
        ],
        extensions: ['.js']
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: false,
            minimize: true
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        })
    ]
};
