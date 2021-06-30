const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
    filename: '[name].[fullhash].js',
    chunkFilename: '[name].[fullhash].js',
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
      'app': 'client/app'
    }
  },

  module: {
    rules: [
      // JS files
      {
        //test: /\.jsx?$/,
        test: /\.m?js/,
        resolve: {
            fullySpecified: false
        },
          
        exclude: /node_modules/,
        include: [
            helpers.root('client')
        ],

        loader: 'babel-loader'
      },

      // SCSS files
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader',
        ]
      },

      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        use: [{
          loader: 'url-loader?limit=100000'
        }]
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

    new CopyWebpackPlugin({
      patterns: [
        { from: helpers.root('client/public') }
      ]
    })

  ].concat(devMode ? [] : [new MiniCssExtractPlugin({ filename: 'css/[name].[fullhash].css' })]),
};
