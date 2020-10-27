const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  id: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  first: {
    type: String,
    default: ''
  },
  last: {
    type: String,
    default: ''
  },
  user: {
    type: String,
    default: ''
  },
  domain: {
    type: String,
    default: ''
  },
}, { collection: 'authors' });

// AuthorSchema.index({'$**': 'text'});

module.exports = mongoose.model('Author', AuthorSchema);
