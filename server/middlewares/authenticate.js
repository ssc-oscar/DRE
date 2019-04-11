const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const User = require('../models/User');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  let token;

  if (authHeader) {
    token = authHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate' })
      }
      else {
        User.find({_id: decoded.id})
        .exec()
        .then((data) => {
          if (!data.length) {
            res.status(404).json({ error: 'No such user' });
          }
          else {
            req.currentUser = data[0]._id;
            next();
          }
        })
      }
    })
  }
  else {
    res.status(403).json({
      error: 'No token provided'
    })
  }
}