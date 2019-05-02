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

  data.fname = data.fname.toLowerCase().trim();
  data.lname = data.lname.toLowerCase().trim();
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
    searchParams.fullNames.push(`${data.fname} ${data.lname}`);
    searchParams.fullNames.push(`${data.fname}${data.lname}`);
    searchParams.fullNames.push(`${data.lname}${data.fname}`);
    searchParams.fullNames.push(`${data.lname} ${data.fname}`);
    for (let n of searchParams.fullNames) {
      queries.push(Author.find({$text: { $search: `\"${n}\"`}}).limit(100))
    }
  }
  if (!Validator.isEmpty(data.fname)) {
    searchParams.fname = data.fname;
    queries.push(Author.find({ $text: { $search: `\"${data.fname}\"` }}).limit(100));
  }
  if (!Validator.isEmpty(data.lname)) {
    searchParams.lname = data.lname;
    queries.push(Author.find({ $text: { $search: `\"${data.lname}\"` }}).limit(100));
  }

  // remove duplicates
  emails = [...new Set(emails)];
  usernames = [...new Set(usernames)];

  if (!isEmpty(emails)) {
    queries.push(Author.find({ email: { $in: emails } }).limit(100))
  }

  if (!isEmpty(usernames)) {
    queries.push(Author.find({username: { $in: usernames }}).limit(100))
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