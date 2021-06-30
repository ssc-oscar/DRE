var path = require('path');
const env = process.env.NODE_ENV

if(env === 'development' || env === 'production') {
  let reduced = env === 'development' ? 'dev' : 'prod';
  console.log(env);
  console.log(reduced);
  module.exports = require(`./config/webpack.${reduced}`);
} else throw 'No enviroment variable given. Need either dev or prod.';
