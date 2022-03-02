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
  EarliestCommitDate: {
    type: Number,
    default: -1
  },
  NumCommits: {
    type: Number,
    default: -1,
  },
  NumProjects: {
    type: Number,
    default: 0,
    min: 0
  },
  LatestCommitDate: {
    type: Number,
    default: -1
  },
}, { collection: 'A_metadata.U' });

module.exports = mongoose.model('AuthMetadata', ProjectSchema);
