const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require('copy-webpack-plugin');

const helpers = require('./helpers');
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';
const analyze = process.env.MODE ? true : false;


module.exports = {

  entry: {
    'app': [
      helpers.root('client/app/index.js')
    ]
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
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
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      },

      // SCSS files
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 
          'css-loader',
        ],
      },

      // Image files
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },

      // Font files
      { 
        test: /\.(woff|woff2|eot|ttf|otf)$/i, 
        type: 'asset/resource',
      }
    ]
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
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

    new CopyPlugin({
      patterns: [
        {
          from: helpers.root('client/public'),
          to: '[path][name][ext]',
          globOptions: {
            ignore: [
              '**/*index.html',
            ],
          },
        }
      ],
    }),

  ].concat(
    devMode ? [] : [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[id].chunk.css',
      })
    ],
    !analyze ? [] : [
      new BundleAnalyzerPlugin({
        analyzerPort: 3000,
      })
    ]
  ),
};
