const express = require('express');
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const path = require('path');
const webpack = require('webpack');
const https = require('https');
const http = require('http');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../config/config');
const webpackConfig = require('../webpack.config');

const isDev = process.env.NODE_ENV === 'development';
const port = process.env.PORT || 3000;

// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.connect(isDev ? config.db_dev : config.db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
require('./routes')(app);

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(historyApiFallback({
    verbose: false
  }));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    //contentBase: path.resolve(__dirname, '../client/public'),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    res.end();
  });
}

if (port == 3000) {
  app.listen(port, '0.0.0.0', (err) => {
    if (err) {
      console.log(err);
    }
    console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port);
  });
}
else {
  https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/worldofcode.org/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/worldofcode.org/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/worldofcode.org/chain.pem')
  }, app).listen(8443, (err) => {
    if (err) {
      console.log(err);
    }
    console.info('>>> 🌎 Open https://0.0.0.0:%s/ in your browser.', port);
  })
  http.createServer(function (req, res) {
      res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
      res.end();
  }).listen(8080);
}

module.exports = app;
