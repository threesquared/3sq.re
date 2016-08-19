var webpack = require('webpack');
var path = require('path');

var commonConfig = {
    resolve: {
        extensions: ['', '.ts', '.js', '.json']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loaders: ['ts-loader', 'angular2-template-loader'] },
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.css$/, loader: 'raw-loader' },
            { test: /\.json$/, loader: 'raw-loader' }
        ],
        preLoaders: [
            { test: /\.js$/, loader: 'source-map-loader' }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            }
        })
    ],
    devtool: 'source-map'
};

var clientConfig = {
    target: 'web',
    entry: './src/client',
    output: {
        path: root('dist/client')
    },
    node: {
        global: true,
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false
    }
};

var serverConfig = {
    target: 'node',
    entry: './src/server',
    output: {
        path: root('dist/server'),
        libraryTarget: 'commonjs2'
    },
    externals: checkNodeImport,
    node: {
        global: true,
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: true
    }
};

var defaultConfig = {
    context: __dirname,
    resolve: {
        root: root('/src')
    },
    output: {
        publicPath: path.resolve(__dirname),
        filename: 'index.js'
    }
};

var webpackMerge = require('webpack-merge');
module.exports = [
    webpackMerge({}, defaultConfig, commonConfig, clientConfig),
    webpackMerge({}, defaultConfig, commonConfig, serverConfig)
];

function checkNodeImport(context, request, cb) {
    if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
        cb(null, 'commonjs ' + request); return;
    }

    cb();
}

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}
