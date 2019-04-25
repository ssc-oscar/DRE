const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

module.exports = function (data) {
  let final, emails, usernames = [];
  let searchParams = {
    fname: '',
    lname: '',
    additionalEmails: [],
    usernames: []
  }
  console.log(data);
  for (let email of data.additionalEmails) {
    if (Validator.isEmail(email.text)) {
      final.push(email.text);
      emails.push(email.text);
      searchParams.additionalEmails.push(email.text);
    }
  }
  for (let username of data.usernames) {
    if (!Validator.isEmpty(username.text)) {
      final.push(username.text);
      usernames.push(username.text);
      searchParams.usernames.push(username.text);
    }
  }
  if (!Validator.isEmpty(data.email) && Validator.isEmail(data.email)) {
    final.push(data.email);
  }
  if (!Validator.isEmpty(data.fname)) {
    final.push(data.fname);
    searchParams.fname = data.fname;
  }
  if (!Validator.isEmpty(data.lname)) {
    final.push(data.lname);
    searchParams.lname = data.lname;
  }

  // remove duplicates
  final = [...new Set(final)];
  emails = [...new Set(emails)];
  usernames = [...new Set(usernames)];

  return {
    final,
    emails,
    usernames,
    searchParams,
    'isValid': !isEmpty(final)
  }
}
  // }
  // return {
  //   final,
  //   searchParams,
  //   isValid: !isEmpty(final)
  // }