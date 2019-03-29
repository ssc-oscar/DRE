const User = require('../../models/User');
const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required.'
  }

  else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid.'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required.'
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'This field is required.'
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match!'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = (app) => {
  /*
   * Sign up
   */
  app.post('/api/account/signup', (req, res, next) => {
    const { errors, isValid } = validateInput(req.body);
    if (!isValid) {
      errors.success = false;
      return res.send(errors);
    }
    const { body } = req;
    const { password } = body;
    let { email } = body;

    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }
    email = email.toLowerCase();
    email = email.trim();
    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exist.'
        });
      }
      // Save the new user
      const newUser = new User();
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Signed up'
        });
      });
    });
  }); // end of sign up endpoint
};