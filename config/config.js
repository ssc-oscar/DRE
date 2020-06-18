// Copy this file as config.js in the same folder, with the proper database connection URI.

module.exports = {
  db: 'mongodb://da1:27017/WoC',
  db_dev: 'mongodb://da1:27017/WoC',
  jwtSecret: 'supersecrettestkeyforsomethingsecret',
  clickhouse: 'http://da1.eecs.utk.edu',
  showCnt: '/da3_data/lookup/showCnt'
};
