var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var express = require('express');

var orderByList = function(list) {
  return function(chunk1, chunk2) {
    const c1i = list.indexOf(chunk1.names[0]);
    const c2i = list.indexOf(chuink2.names[0]);
    if (c1i < c2i)
      return -1;
    else if (c1i === c2i)
      return chunk1.id < chunk2.id ? -1 : 1;
    else
      return 1;
  };
};

// disable common chunks plugin during testing to prevent problems
module.exports = function(env) {
  
  var isDevelopment = true;
  var API_URL, BASE_HREF;
  
  if (env && 'mode' in env) {
    switch(env.mode) {
      case 'local':
        BASE_HREF = 'something';
        API_URL = 'hi';
        break;
      case 'production':
        isDevelopment = false;
        API_URL = 'hello';
        break;
      default:
        break;
    }
  }
  return {
    devtool: 'inline-source-map',
    entry: {
      app: './app/app.bootstrap.ts',
      vendor: './app/vendor.ts',
      polyfills: './app/polyfills.ts'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: BASE_HREF,
      filename: '[name].bundle.[hash].js'
    },
    resolve: {
      modules: [
        path.resolve(__dirname, 'app'),
        path.resolve(__dirname, 'node_modules')
      ],
      extensions: ['.ts', '.js', '.html', '.css', '.json'],
      descriptionFiles: ['package.json']
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'html-loader',
          exclude: /node_modules/
        },
        {
          test: /\.ts$/,
          loader: ['awesome-typescript-loader', 'angular2-template-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.js$/,
          loader: 'script-loader',
          exclude: /node_modules/
        },
        {
          test: /\.sass$/,
          exclude: /node_modules/,
          // loaders: ['raw-loader', 'css?sourceMap', 'sass?sourceMap']
          loader: 'style-loader!css-loader!sass-loader'
        },
        {
          test: /\.css$/,
          loader: 'raw-loader',
          exclude: /node_modules/
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file?name=assets/[name].[hash].[ext]',
          exclude: /node_modules/
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'app/index.ejs',
        chunks: ['vendor', 'polyfills', 'app'],
        chunksSortMode: orderByList(['vendor', 'polyfills', 'app']),
        inject: 'body',
        baseHref: BASE_HREF
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'API_URL': JSON.stringify(API_URL)
        }
      }),
      !isDevelopment ? new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        },
        compress: {
          warnings: false
        },
        minimize: true
      }) : function() {}
    ],
    devServer: {
      historyApiFallback: {
        index: '/serve/path'
      },
      port: 8000,
      quiet: false,
      setup: function(app) {
        app.use('/serve/path/assets', express.static(path.join(__dirname, 'assets')));
      }
    }

}
