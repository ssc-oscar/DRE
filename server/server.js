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
const compiler = webpack(webpackConfig);

const isDev = process.env.NODE_ENV === 'development';
const port = process.env.PORT || 8443;

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

  app.use(historyApiFallback({
    verbose: false
  }));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
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
} else {
  https.createServer({
    key: fs.readFileSync('/home/audris/swsc/DRE/worldofcode.org/WoCPrivate1.key'),
    cert: fs.readFileSync('/home/audris/swsc/DRE/worldofcode.org/worldofcode_org_cert.cer'),
    ca: fs.readFileSync('/home/audris/swsc/DRE/worldofcode.org/worldofcode_org_interm.cer')
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
