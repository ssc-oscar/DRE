const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  FileInfo: {
    type: Object,
    default: ''
  },
  numStars: {
    type: Number,
    default: ''
  },
  numAuthors: {
    type: Number,
    default: 0,
    min: 0
  },
  projectID: {
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
  LatestCommitDate: {
    type: Number,
    default: -1
  },
}, { collection: 'proj_metadata.R' });

module.exports = mongoose.model('ProjMetadata', ProjectSchema);
