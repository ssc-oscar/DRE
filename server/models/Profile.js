const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  friends: {
    type: [Object],
    default: []
  },
  files: {
    type: Object,
    default: {}
  },
  stats: {
    type: Object,
    default: {}
  },
  user: {
    type: String,
    default: ""
  },
  projects: {
    type: [Object],
    default: []
  },
  blobs: {
    type: [Object],
    default: []
  }
}, { collection: 'profile' });

module.exports = mongoose.model('Profile', ProfileSchema);