var path = require('path');

const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = function(options) {
  return {

    devtool: 'inline-source-map',

    resolve: {
      extensions: ['', '.ts', '.js'],
      root: root('src'),
    },

    module: {

      preLoaders: [
        {
          test: /\.ts$/,
          loader: 'tslint-loader',
          exclude: [root('node_modules')]
        },
        {
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            // these packages have problems with their sourcemaps
            root('node_modules/rxjs'),
            root('node_modules/@angular')
          ]
        }
      ],

      loaders: [
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader',
          query: {
            sourceMap: false,
            inlineSourceMap: true,
            compilerOptions: {
              removeComments: true
            }
          }
        },
        { test: /\.json$/, loader: 'json-loader', exclude: [root('src/index.html')] },
        { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'], exclude: [root('src/index.html')] },
        { test: /\.html$/, loader: 'raw-loader', exclude: [root('src/index.html')] }
      ],

      postLoaders: [
        {
          test: /\.(js|ts)$/, loader: 'istanbul-instrumenter-loader',
          include: root('src'),
          exclude: [
            /node_modules/
          ]
        }
      ]

    },

    tslint: {
      emitErrors: false,
      failOnHint: false,
      resourcePath: 'src'
    },

    node: {
      global: 'window',
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
