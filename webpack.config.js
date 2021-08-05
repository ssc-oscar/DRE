var path = require('path');
const env = process.env.NODE_ENV

if(env === 'development' || env === 'production') {
  let reduced = env === 'development' ? 'dev' : 'prod';
  module.exports = require(`./config/webpack.${reduced}`);
} else throw 'No enviroment variable given. Need either dev or prod.';
