// Copy this file as config.js in the same folder, with the proper database connection URI.

module.exports = {
  db: 'mongodb://dbWoC:27017/WoC',
  db_dev: 'mongodb://dbWoC:27017/WoC',
  jwtSecret: 'supersecrettestkeyforsomethingsecret',
  clickhouse: 'http://da1.eecs.utk.edu',
  showCnt: (process.env.DRE_LOOKUP_PATH ? (process.env.DRE_LOOKUP_PATH + "/showCnt") : '$HOME/lookup/showCnt'),
  getValues: (process.env.DRE_LOOKUP_PATH ? (process.env.DRE_LOOKUP_PATH + "/getValues") : '$HOME/lookup/getValues'),
  getNeighbors: (process.env.DRE_LOOKUP_PATH ? (process.env.DRE_LOOKUP_PATH + '/getNeighbors') : '$HOME/lookup/getNeighbors'),
  remoteCmd: (process.env.DRE_REMOTE_CMD || 'ssh -T da5'),
  ufhist: (process.env.DRE_LOOKUP_PATH ? (process.env.DRE_LOOKUP_PATH + '/ufhist') : '$HOME/woc-tools/ufhist')
};
