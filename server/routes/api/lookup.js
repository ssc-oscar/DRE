const config = require('../../../config/config');
const { exec } = require("child_process");
const { query, validationResult } = require('express-validator');

module.exports = (app) => {
  const cmds = {
		showCnt: config.showCnt,
		getValues: config.getValues
	}
	
  app.get('/api/lookup', [
			query('sha1').isHash('sha1').escape(),
			query('type').isAlphanumeric().escape(),
			query('command').isIn(cmds).escape()
		],
   	(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}
			exec('ssh -T da4 << EOF\n' +
				`  echo "${req.query.sha1}" | ${cmds[req.query.command]} ${req.query.type}\n` +
				'EOF',
				(err, stdout, stderr) => {
					res.status(200).send({stdout: stdout, stderr: stderr});
				}
			);
		}
	);
}