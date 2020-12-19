const util = require('util');
const config = require('../../../config/config');
const { exec } = require("child_process");
const execProm = util.promisify(exec);

const cmds = {
	showCnt: config.showCnt,
	getValues: config.getValues,
	getNeighbors: config.getNeighbors,
}

//perl getNeighbors.perl commit 2 01a8e7bd6086686d3210ea96a3ae86e4d94db6f8

module.exports = async function(sha1, command, type){
  cToRun = '';
  console .log (config.remoteCmd + ' << EOF\n' + ` ${cmds[command]} ${type} 2 "${sha1}"\n` + 'EOF');
	if(['getNeighbors'].includes(command))
		cToRun = config.remoteCmd + ' << EOF\n' + ` ${cmds[command]} ${type} 2 "${sha1}"\n` + 'EOF';
	else	
		cToRun = config.remoteCmd + ' << EOF\n' + `  echo "${sha1}" | ${cmds[command]} ${type}\n` + 'EOF';
  console .log (cToRun);
  return execProm (cToRun, {maxBuffer: 1024 * 500});
}
