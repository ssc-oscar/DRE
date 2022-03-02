const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  FileInfo: {
    type: Object,
    default: ''
  },
  NumStars: {
    type: Number,
    default: ''
  },
  NumAuthors: {
    type: Number,
    default: 0,
    min: 0
  },
  ProjectID: {
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
}, { collection: 'P_metadata.U' });

module.exports = mongoose.model('ProjMetadata', ProjectSchema);
