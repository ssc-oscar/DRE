const util = require('util');
const config = require('../../../config/config');
const { exec } = require("child_process");
const execProm = util.promisify(exec);

const cmds = {
	showCnt: config.showCnt,
	getValues: config.getValues
}

module.exports = async function(sha1, command, type){
	return execProm(config.remoteCmd + ' << EOF\n' + `  echo "${sha1}" | ${cmds[command]} ${type}\n` + 'EOF');
}
