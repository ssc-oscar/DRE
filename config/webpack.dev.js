const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {

  mode: 'development',

  devtool: 'eval-source-map',

  output: {
    filename: 'js/[name].js',
    chunkFilename: '[id].chunk.js'
  },

  devServer: {
    contentBase: './client/public',
    historyApiFallback: true,
    stats: 'minimal', // none (or false), errors-only, minimal, normal (or true) and verbose
    hot: true
  },
});
