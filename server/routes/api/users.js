const User = require('../../models/User');
const Author = require('../../models/Author');
const validateSignupInput = require('../../shared/validations/SignUp');
const validateAuthorInput = require('../../shared/validations/AuthorSearch');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const isEmpty = require('lodash/isEmpty');
const authenticate = require('../../middlewares/authenticate');
// const Validator = require('validator');
// const isEmpty = require('lodash/isEmpty');

module.exports = (app) => {
  app.post('/api/users/submit', authenticate, (req, res, next) => {
    const data = req.body;
    const userId = req.currentUser;
    console.log(data, userId);
    User.updateOne({_id: userId.id}, {
      selectedIds: data.selected,
      omittedIds: data.omitted,
      lastUpdated: Date.now()
    }, function(err, affected, resp) {
      // console.log(affected);
    })
    res.status(200).json(data);
  })

  app.post('/api/users/search', authenticate, (req, res, next) => {
    let { body } = req;
    let results = [];
    let final = [];
    let tmp = new Map();
    body.email = req.currentUser.email;
    const { emails, usernames, searchParams, queries } = validateAuthorInput(body);
    const userId = req.currentUser.id;

    User.updateOne({_id: userId}, {
      searchParams: searchParams
    }, function(err, affected, resp) {
      // console.log(affected);
    })

    Promise.all(queries).then((rv) => {
      let exceeded = false;
      for (let x of rv) {
        if (x.length < 99) {
          results = results.concat(x);
        }
        else {
          exceeded = true;
        }
      }

      for (const x of results) {
        if (!tmp.has(x._id.toString())) {
          tmp.set(x._id.toString(), true);
          final.push(x);
        }
      }
      res.status(200).json({exceeded: exceeded, final: final});
    });
  })

  app.post('/api/users/login', (req, res, next) => {
    const { body } = req;
    const { identifier, password } = body;

    User.findOne({email: identifier})
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          form: 'Wrong email or password.'
        })
      }
      if (user.validPassword(password)) {
        const token = jwt.sign({
          id: user._id,
          email: user.email,
          hasSearched: user.hasSearched
        }, config.jwtSecret);
        res.status(200).json({
          success: true,
          message: 'Signed In',
          token: token
        });
      }
      else {
        res.status(404).json({
          success: false,
          form: 'Wrong email or password.'
        })
      }
    })
    .catch((err) => next(err));
  })
  /*
   * Sign up
   */
  app.post('/api/users/signup', (req, res, next) => {
    const { errors, isValid } = validateSignupInput(req.body);
    if (!isValid) {
      errors.success = false;
      res.status(400).json(errors);
    }
    const { body } = req;
    const { password } = body;
    let { email } = body;
    email = email.toLowerCase();
    email = email.trim();
    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({email: email})
    .exec()
    .then((data) => {
      if (data.length) {
        res.status(400).json({
          success: false,
          email: 'Account already exists.'
        })
      }
      else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: 'Error: Server error'
            });
          }
          const token = jwt.sign({
            id: user._id,
            email: user.email,
            hasSearched: user.hasSearched
          }, config.jwtSecret);
          res.status(201).json({
            success: true,
            message: 'Signed up',
            token: token
          });
        });
      }
    })
    .catch((err) => next(err));
  });
};