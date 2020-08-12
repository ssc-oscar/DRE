// Copy this file as config.js in the same folder, with the proper database connection URI.

module.exports = {
  db: 'mongodb://da1:27017/WoC',
  db_dev: 'mongodb://da1:27017/WoC',
  jwtSecret: 'supersecrettestkeyforsomethingsecret',
  clickhouse: 'http://da1.eecs.utk.edu',
  //showCnt: ((process.env.DRE_LOOKUP_PATH + '/showCnt') || '$HOME/lookup/showCnt'),
  //getValues: ((process.env.DRE_LOOKUP_PATH + '/getValues') ||'$HOME/lookup/getValues'),
  showCnt: '/da3_data/lookup/showCnt',
  getValues: '/da3_data/lookup/getValues',
  //remoteCmd: (process.env.DRE_REMOTE_CMD || 'ssh -T da4')
};
