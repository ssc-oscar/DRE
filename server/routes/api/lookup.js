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

var auth = /^[\sa-zA-Z0-9\-\.@<>]*$/;
function isAuth (str) {
  assertString(str);
  return auth.test(str);
}
var prj = /^[a-zA-Z0-9\-\.]+_[a-zA-Z0-9\-_\/\.]+$/; 
function isPrj(str) {
  assertString(str);
  return prj.test(str);
}
var fname = /^[ a-zA-Z0-9\-\.\/_]+$/; // include filename related characters
function isFname(str) {
  assertString(str);
  return fname.test(str);
}

function validSha1(sha1, req1){
  var cache = [];
  //vv = JSON.stringify(req1.req.query, function(key, value) {if (typeof value === 'object' && value !== null) {if (cache.indexOf(value) !== -1) { try { return JSON.parse(JSON.stringify(value))}catch (error) {return;}} cache.push(value);} return value;});
  //console .log(sha1 + ';' + vv);
  if (/^[bct]/ .test(req1.req.query.type)){
    return isHash(sha1, 'sha1');
  } else {
    if (/^[aA]/ .test(req1.req.query.type)){
      // console .log (';'+req1.req.query.type+';'+sha1+';');
      return isAuth (sha1);
    }else{
      if (/^[pP]/ .test(req1.req.query.type)){
        return isPrj (sha1);
      }else{
        if (/^f/ .test(req1.req.query.type)){
          return isFname (sha1);
        }
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
            throw new Error("Sha1 or file/project/author name must be a valid sha1/name string or semicolon separated string:" + sha1);
          }
        });
        return true;
      }),
      query ('type') .isAlphanumeric(),
      query('command') .isIn(cmds)
    ],
    (req, res, next) => {
      const errors = validationResult (req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      console .log (";"+req.query.sha1+";")
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
