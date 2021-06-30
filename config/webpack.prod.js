const { merge } = require('webpack-merge');

const helpers = require('./helpers');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',

  output: {
    filename: 'js/[name].[fullhash].js',
    chunkFilename: '[id].[fullhash].chunk.js'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      },
      output: {
        comments: false
      }
    })
  ]
});
