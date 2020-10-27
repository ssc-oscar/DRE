const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  FileInfo: {
    type: Object,
    default: ''
  },
  AuthorID: {
    type: String,
    default: ''
  },
  EarlistCommitDate: {
    type: Number,
    default: -1
  },
  NumCommits: {
    type: Number,
    default: -1,
  },
  numProjects: {
    type: Number,
    default: 0,
    min: 0
  },
  LatestCommitDate: {
    type: Number,
    default: -1
  },
}, { collection: 'auth_metadata.R' });

module.exports = mongoose.model('AuthMetadata', ProjectSchema);
