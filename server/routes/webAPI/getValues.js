const config = require('../../../config/config');
const { exec } = require('child_process');
const { query, validationResult } = require('express-validator');
const { isHash } = require('validator');

function formatOutput(stdout, mapping, format) {

    let to;
    if(mapping.length == 3) to = mapping.slice(-1);
    else to = mapping.slice(-2);

    if(to === 'c') {
        let output = {}
        let data = stdout.split(/;|\r|\n/);
        data.pop();
        data.map((entry, index) => {
            output[index] = entry;
        });

        if(format === 'pretty') {
            let entries = data.length;
            let header = "There are " + entries + " commits in this mapping:\n";
            let prettyOutput = JSON.stringify(output, null, 1).replace(/"|{|}|,|/g, "");
            return prettyOutput.replace(/^/, header);
        }
        else if(format === 'json') return output;
    }
}

module.exports = (app) => {
    const mappings = {
        a2b: 'a2b', a2p: 'a2p', b2a: 'b2a',
        b2tk: 'b2tk', c2b: 'c2b', c2p: 'c2p',
        f2a: 'f2a', p2a: 'p2a', td2c: 'td2c',
        a2c: 'a2c', a2trp0: 'a2trp0', b2c: 'b2c',
        c2cc: 'c2cc', c2P: 'c2P', f2b: 'f2b',
        p2c: 'p2c', td2f: 'td2f', a2f: 'a2f',
        b2f: 'b2f', c2f: 'c2f', c2ta: 'c2ta',
        f2c: 'f2c', P2c: 'P2c', a2ft: 'a2ft',
        b2ob: 'b2ob', c2h: 'c2h', c2td: 'c2td',
        ob2b: 'ob2b', c2pc: 'c2pc'
    }
    const cmd = config.getValues;
    
    app.get('/webAPI/getValues', [
        query('sha1').custom((value) => {
            value.split(';').forEach(sha1 => {
                if(!isHash(sha1, 'sha1')) {
                    throw new Error("Sha1 must be a valid sha1 string or semicolon seperated sha1 string");
                }
            });
            return true;
    }).escape(),
        query('mapping').isIn(mappings).escape(),
        query('format').optional().isString().escape(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        exec(config.remoteCmd + ' << EOF\n' + ` echo "${req.query.sha1}" | ${cmd} ${req.query.mapping}\n` + 'EOF',
            (err, stdout, stderr) => {
                if(req.query.format) data = formatOutput(stdout, req.query.mapping, req.query.format);
                else data = stdout;
                res.status(200).send(data);
            }
        );
    }
    );
}
