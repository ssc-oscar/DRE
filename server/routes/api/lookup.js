const execLookup = require('../../shared/lookup/lookup');
const lookupValidateMiddleware = require('../../middlewares/lookupValidate');
const { validationResult } = require('express-validator');

module.exports = (app) => {
    app.get('/api/lookup', lookupValidateMiddleware, lookup);
}

module.exports = (app) => {
    app.get('/api/lookup', lookupValidateMiddleware, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        console.log (";"+req.query.sha1+";")
        execLookup(req.query.sha1, req.query.command, req.query.type).then( ret => res.status(200).send(ret) );
    });
}
