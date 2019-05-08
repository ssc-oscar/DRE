const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  searchParams: {
    type: Object,
    default: {
      fname: '',
      lname: '',
      additionalEmails: [],
      usernames: []
    }
  },
  hasSearched: {
    type: Boolean,
    default: false
  },
  selectedIds: {
    type: [Object],
    default: []
  },
  suggestedIds: {
    type: [Object],
    default: []
  },
  omittedIds: {
    type: [Object],
    default: []
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  },
  lastUpdated: {
    type: Date,
    default: Date.now()
  }
}, { collection: 'users' });

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', UserSchema);