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
    
    else if (data.password.length < 4) {
      errors.password = 'Password must be at least 4 characters.'
    }
  
    if (Validator.isEmpty(data.confirmPassword)) {
      errors.confirmPassword = 'This field is required.'
    }

    else if (data.confirmPassword.length < 4) {
      errors.confirmPassword = 'Password must be at least 4 characters.'
    }
  
    if (!Validator.equals(data.password, data.confirmPassword)) {
      errors.confirmPassword = 'Passwords must match!'
    }

    // if (Validator.isEmpty(data.fname) &&
    //     Validator.isEmpty(data.lname) &&
    //     data.additionalEmails.length == 0 &&
    //     data.usernames.length == 0) {
    //   errors.fname =
    //   errors.lname =
    //   errors.additionalEmails =
    //   errors.usernames = 'At least one of these fields is required.'
    // }
    return {
      errors,
      isValid: isEmpty(errors)
    }
    // else {
    //   let final = [];
    //   for (let email of data.additionalEmails) {
    //     if (Validator.isEmail(email.text)) {
    //       final.push(email.text);
    //     }
    //   }
    //   for (let username of data.usernames) {
    //     if (!Validator.isEmpty(username.text)) {
    //       final.push(username.text);
    //     }
    //   }
    //   if (!Validator.isEmpty(data.email) && Validator.isEmail(data.email)) {
    //     final.push(data.email);
    //   }
    //   if (!Validator.isEmpty(data.fname)) {
    //     final.push(data.fname);
    //   }
    //   if (!Validator.isEmpty(data.lname)) {
    //     final.push(data.lname);
    //   }

    //   // remove duplicates
    //   final = [...new Set(final)];

    //   return {
    //     final,
    //     isValid: isEmpty(final)
    //   }
    // }
  }