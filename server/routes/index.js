const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  // API routes
  fs.readdirSync(__dirname + '/api/').forEach((file) => {
    require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
  });
  fs.readdirSync(__dirname + '/webAPI/').forEach((file) => {
    require(`./webAPI/${file.substr(0, file.indexOf('.'))}`)(app);
  });
};
