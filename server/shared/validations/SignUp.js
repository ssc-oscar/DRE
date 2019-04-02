const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

module.exports = function(data) {
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