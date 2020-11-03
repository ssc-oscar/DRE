const config = require('../../config/config');
const { query } = require('express-validator');
const { isHash } = require('validator');

const cmds = {
	showCnt: config.showCnt,
	getValues: config.getValues,
	getNeighbors: config.getNeighbors,
}

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
function isAuth(str) {
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

module.exports = [
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
];