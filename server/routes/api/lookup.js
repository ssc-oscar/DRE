const config = require('../../../config/config');
const { exec } = require("child_process");

module.exports = (app) => {
  app.get('/api/lookup', (req, res, next) => {
    if(Object.keys(req.query).length === 0){
      return res.status(400).json('Query not specified');
    }

    if(typeof req.query.sha1 != 'undefined' &&
       typeof req.query.type != 'undefined'){
      exec('ssh da4 << EOF\n' +
           `  echo ${req.query.sha1} | ${config.showCnt} ${req.query.type}\n` +
           'EOF', (err, stdout, stderr) => {
        if(stdout){
          res.status(200).send(stdout.replace(/(?:\r\n|\r|\n)/g, '<br>'));
        }
      });
    }
  });
}