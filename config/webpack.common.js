const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const helpers = require('./helpers');
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';


module.exports = {

  entry: {
    'app': [
      helpers.root('client/app/index.js')
    ]
  },

  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: helpers.root('dist'),
    publicPath: '/'
  },

  resolve: {
    modules: ['node_modules'],
    fallback: {
      "buffer": false,
      "crypto": false,
      "util": false,
      "stream": false,
    },
    extensions: ['.js', '.json', '.css', '.scss', '.html'],
    alias: {
      '@material-ui/styled-engine': '@material-ui/styled-engine-sc',
      'app': 'client/app',
      'material-ui': '@material-ui',
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
      'stream': require.resolve('stream-browserify')
    }
  },

  module: {
    rules: [
      // JS files
      {
        test: /\.jsx?$/,
        resolve: {
            fullySpecified: false
        },
        exclude: /node_modules/,
        use: 'babel-loader'
      },

      // SCSS files
      {
        test: /\.css$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader',
        ]
      },

      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/i, 
        type: 'asset/resource'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new NodePolyfillPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    new HtmlWebpackPlugin({
      template: helpers.root('client/public/index.html'),
      inject: 'body'
    }),

  ].concat(!devMode ? [] : [new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css' })]),
};
