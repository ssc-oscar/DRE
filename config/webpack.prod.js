const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',

  output: {
    filename: 'js/[name].js',
    chunkFilename: '[id].chunk.js'
  },

  optimization: {
    minimize: true
  }
});
