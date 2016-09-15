var path = require('path');

module.exports = {
    entry: './src/gc.js',
    output: {
        path: './dest',
        filename: 'gc.js',
        chunkFilename: 'gc.js'
    },
    module: {
        loaders: [{
            test: /\.(es6|js|jsx)$/,
            exculde: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-0'],
                plugins: ['add-module-exports']
            }
        }]
    }
}
