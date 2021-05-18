const config = require('../../../config/config');
const { exec } = require('child_process');
const { query, validationResult } = require('express-validator');
const { isHash } = require('validator');

function formatOutput(stdout, type, format) {
    if(type === 'commit') {
        let data = stdout.split(/;|\r|\n/);
        data.pop();
        let output = { 
            "Commit": data[0],
            "Tree": data[1],
            "Parent": data[2],
            "Author": data[3],
            "Author Time": data[5]
        };

        if(format === 'pretty') return JSON.stringify(output, null, 1).replace(/"|{|}|,|/g, "");
        else if(format === 'json') return output;
    }
    else if(type === 'tree') {}
    else if(type === 'blob') {}
}

module.exports = (app) => {
    const types = {
        commit: 'commit',
        tree: 'tree',
        blob: 'blob'
    }
    const cmd = config.showCnt;
    
    app.get('/webAPI/showCnt', [
        query('sha1').custom((value) => {
            value.split(';').forEach(sha1 => {
                if(!isHash(sha1, 'sha1')) {
                    throw new Error("Sha1 must be a valid sha1 string or semicolon seperated sha1 string");
                }
            });
            return true;
    }).escape(),
        query('type').isIn(types).escape(),
        query('format').optional().isString().escape(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        exec(config.remoteCmd + ' << EOF\n' + ` echo "${req.query.sha1}" | ${cmd} ${req.query.type}\n` + 'EOF',
            (err, stdout, stderr) => {
                if(req.query.format) data = formatOutput(stdout, req.query.type, req.query.format);
                else data = stdout;
                res.status(200).send(data);
            }
        );
    }
    );
}
