const config = require('../../../config/config');
const { exec } = require("child_process");
const { query, validationResult } = require('express-validator');
const { isHash } = require('validator');


function assertString(input) {
  var isString = typeof input === 'string' || input instanceof String;

  if (!isString) {
    var invalidType;

    if (input === null) {
      invalidType = 'null';
    } else {
      invalidType = _typeof(input);

      if (invalidType === 'object' && input.constructor && input.constructor.hasOwnProperty('name')) {
        invalidType = input.constructor.name;
      } else {
        invalidType = "a ".concat(invalidType);
      }
    }

    throw new TypeError("Expected string but received ".concat(invalidType, "."));
  }
}

var auth = /^[a-zA-Z0-9\-\.\@\<\>]*$/;
function isAuth (str) {
  assertString(str);
  return auth.test(str);
}
var prj = /^[a-zA-Z0-9\-\.]+_[a-zA-Z0-9\-_\/\.]+$/;
function isPrj(str) {
  assertString(str);
  return prj.test(str);
}

function validSha1(sha1, req1){
  var cache = [];
  //vv = JSON.stringify(req1.req.query, function(key, value) {if (typeof value === 'object' && value !== null) {if (cache.indexOf(value) !== -1) { try { return JSON.parse(JSON.stringify(value))}catch (error) {return;}} cache.push(value);} return value;});
  //console .log(sha1 + ';' + vv);
  if (/^[aA]/ .test(req1.req.query.type)){
    return isAuth (sha1);
  }else{
    if (/^[pPf]/ .test(req1.req.query.type)){
      return isPrj (sha1);
    }else{
       if (/^[bc]/ .test(req1.req.query.type)){
       return isHash(sha1, 'sha1');
      }
    }
  }
  return false;
}

module.exports = (app) => {
  const cmds = {
    showCnt: config.showCnt,
    getValues: config.getValues
  }
  
  app.get('/api/lookup', [
      query ('sha1') .custom( (val, req) => {
        val.split(';') .forEach(sha1 => {
          if (!validSha1(sha1, req)){
            throw new Error("Sha1 must be a valid sha1 string or semicolon separated sha1 string:" + sha1);
          }
        });
        return true;
      }).escape(),
      query ('type') .isAlphanumeric().escape(),
      query('command') .isIn(cmds) .escape()
    ],
    (req, res, next) => {
      const errors = validationResult (req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      exec(config.remoteCmd + ' << EOF\n' +
        `  echo "${req.query.sha1}" | ${cmds[req.query.command]} ${req.query.type}\n` +
        'EOF',
        (err, stdout, stderr) => {
          res.status(200).send({stdout: stdout, stderr: stderr});
        }
      );
    }
  );
}
