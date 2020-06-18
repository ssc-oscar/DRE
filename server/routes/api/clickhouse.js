const { ClickHouse } = require('clickhouse');
const config = require('../../../config/config');

module.exports = (app) => {
  app.get('/api/clickhouse/commits', (req, res, next) => {
    if(Object.keys(req.query).length === 0){
      return res.status(400).json('Query not specified');
    }

    let valid_params = 0;
    let select = 'lower(hex(sha1)) AS sha1, time, lower(hex(tree)) AS tree, author, parent, comment, content';
    let where = ' WHERE ';
    if(typeof req.query.count != 'undefined' && req.query.count == 'true'){
      select = `count(${select})`;
      valid_params++;
    }
    console.log(req.query.start);
    if(typeof req.query.start != 'undefined' && /\d+/.test(req.query.start)){
      console.log('test passed!');
      if(typeof req.query.end != 'undefined' && /\d+/.test(req.query.end)){
        where += `time>=${req.query.start} AND time<=${req.query.end}`;
        valid_params += 2;
      } else {
        console.log('no end');
        where += `time=${req.query.start}`;
        valid_params++;
      }
    }
    if(valid_params <= 0){
    return res.status(400).json('Invalid query');
    }

    const db = 'commits_all'
    const query = `SELECT ${select} FROM ${db}${where};`;
    const clickhouse = new ClickHouse({
      url: config.clickhouse,
      format: 'json',
      config: {
        database : db,
      }
    });

    console.log(`Execute query: ${query}`);
    clickhouse.query(query).exec(function (err, rows){
      res.status(200).json(rows);
    });
  });

  app.get('/api/clickhouse/c2bPtaPkgQ', (req, res, next) => {
    if(Object.keys(req.query).length === 0){
      return res.status(400).json('Query not specified');
    }

    let valid_params = 0;
    let select = 'lower(hex(sha1)) AS sha1, time, lower(hex(blob)) AS blob, language, repo, author, deps';
    let where = ' WHERE ';
    if(typeof req.query.count != 'undefined' && req.query.count == 'true'){
      select = `count(${select})`;
      valid_params++;
    }
    console.log(req.query.start);
    if(typeof req.query.start != 'undefined' && /\d+/.test(req.query.start)){
      console.log('test passed!');
      if(typeof req.query.end != 'undefined' && /\d+/.test(req.query.end)){
        where += `time>=${req.query.start} AND time<=${req.query.end}`;
        valid_params += 2;
      } else {
        console.log('no end');
        where += `time=${req.query.start}`;
        valid_params++;
      }
    }
    if(valid_params <= 0){
    return res.status(400).json('Invalid query');
    }

    const db = 'projects_all'
    const query = `SELECT ${select} FROM ${db}${where};`;
    const clickhouse = new ClickHouse({
      url: config.clickhouse,
      format: 'json',
      config: {
        database : db,
      }
    });

    console.log(`Execute query: ${query}`);
    clickhouse.query(query).exec(function (err, rows){
      res.status(200).json(rows);
    });
  });
};