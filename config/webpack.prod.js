const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',

  output: {
    filename: 'js/[name].[fullhash].js',
    chunkFilename: '[id].[fullhash].chunk.js'
  },

  optimization: {
    minimize: true
  }
});
