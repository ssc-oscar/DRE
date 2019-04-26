const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');
const Author = require('../../models/Author');

module.exports = function (data) {
  let emails = usernames = [];
  let queries = [];
  let searchParams = {
    fname: '',
    lname: '',
    fullNames: [],
    additionalEmails: [],
    usernames: []
  }

  for (let e of data.additionalEmails) {
    if (Validator.isEmail(e.text)) {
      emails.push(e.text);
      searchParams.additionalEmails.push(e.text);
    }
  }
  for (let u of data.usernames) {
    if (!Validator.isEmpty(u.text)) {
      usernames.push(u.text);
      searchParams.usernames.push(u.text);
    }
  }
  if (!Validator.isEmpty(data.email) && Validator.isEmail(data.email)) {
    emails.push(data.email);
  }
  if (!Validator.isEmpty(data.fname) && !Validator.isEmpty(data.lname)) {
    searchParams.fullNames.push(`${data.fname.toLowerCase()} ${data.lname.toLowerCase()}`);
    searchParams.fullNames.push(`${data.fname.toLowerCase()}${data.lname.toLowerCase()}`);
    searchParams.fullNames.push(`${data.lname.toLowerCase()}${data.fname.toLowerCase()}`);
    searchParams.fullNames.push(`${data.lname.toLowerCase()} ${data.fname.toLowerCase()}`);
    for (let n of searchParams.fullNames) {
      queries.push(Author.find({$text: { $search: `\"${n}\"`}}))
    }
  }
  else if (!Validator.isEmpty(data.fname)) {
    searchParams.fname = data.fname;
    queries.push(Author.find({ $text: { $search: `\"${data.fname}\"` }}));
  }
  else if (!Validator.isEmpty(data.lname)) {
    searchParams.lname = data.lname;
    queries.push(Author.find({ $text: { $search: `\"${data.lname}\"` }}));
  }

  // remove duplicates
  emails = [...new Set(emails)];
  usernames = [...new Set(usernames)];

  if (!isEmpty(emails)) {
    queries.push(Author.find({ email: { $in: emails } }))
  }

  if (!isEmpty(usernames)) {
    queries.push(Author.find({username: { $in: usernames }}))
  }

  return {
    emails,
    usernames,
    searchParams,
    queries
  }
}
  // }
  // return {
  //   final,
  //   searchParams,
  //   isValid: !isEmpty(final)
  // }