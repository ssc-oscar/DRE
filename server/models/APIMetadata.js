const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  NumAuthors: {
    type: Number,
    default: 0,
    min: 0
  },
  NumProjects: {
    type: Number,
    default: 0,
    min: 0
  },
  API: {
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
  LatestCommitDate: {
    type: Number,
    default: -1
  },
}, { collection: 'API_metadata.U' });

module.exports = mongoose.model('APIMetadata', ProjectSchema);
