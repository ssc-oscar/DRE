const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

module.exports = function (data) {
  let final = [];
  console.log(data);
  for (let email of data.additionalEmails) {
    if (Validator.isEmail(email.text)) {
      final.push(email.text);
    }
  }
  for (let username of data.usernames) {
    if (!Validator.isEmpty(username.text)) {
      final.push(username.text);
    }
  }
  if (!Validator.isEmpty(data.email) && Validator.isEmail(data.email)) {
    final.push(data.email);
  }
  if (!Validator.isEmpty(data.fname)) {
    final.push(data.fname);
  }
  if (!Validator.isEmpty(data.lname)) {
    final.push(data.lname);
  }

  // remove duplicates
  final = [...new Set(final)];

  return {
    final,
    isValid: !isEmpty(final)
  }
}