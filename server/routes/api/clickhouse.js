const { ClickHouse } = require('clickhouse');
const config = require('../../../config/config');
const { query, validationResult } = require('express-validator');


module.exports = (app) => {
  app.get('/api/clickhouse/commits', [
    query('start').optional().isInt({min:0}),
    query('end').optional().isInt({min:0}),
    query('count').optional().isBoolean(),
    query('limit').optional().isInt({min:0})
  ],
  (req, res, next) => {
    if(Object.keys(req.query).length === 0){
      return res.status(400).send('Query not specified');
    }
    
    let valid_params = 0;
    let select = 'lower(hex(sha1)) AS sha1, time, lower(hex(tree)) AS tree, author, parent, comment, content';
    let where = ' WHERE ';
    if(typeof req.query.count != 'undefined' && req.query.count == 'true'){
      select = `count(*)`;
      valid_params++;
    }
    
    if(typeof req.query.start != 'undefined'){
      if(typeof req.query.end != 'undefined'){
        where += `time>=${req.query.start} AND time<=${req.query.end} LIMIT ${req.query.limit}`;
        valid_params += 2;
      } else {
        where += `time=${req.query.start} LIMIT ${req.query.limit}`;
        valid_params++;
      }
    } else {
      where = '';
    }
    
    if(valid_params <= 0){
      return res.status(400).send('Invalid query');
    }
    
    const tb = 'commits_all'
    const query = `SELECT ${select} FROM ${tb}${where};`;
    const clickhouse = new ClickHouse({
      url: config.clickhouse,
      format: 'json',
      config: {
        database : 'default',
      }
    });
    
    console.log(`Execute query: ${query}`);
    clickhouse.query(query).exec(function (err, rows){
      if(err){
        res.status(400).json(err);
      } else {
        res.status(200).json(rows);
      }
    });
  });
  
  app.get('/api/clickhouse/b2cPtaPkgR', [
    query('start').optional().isInt({min:0}),
    query('end').optional().isInt({min:0}),
    query('count').optional().isBoolean()
  ],
  (req, res, next) => {
    if(Object.keys(req.query).length === 0){
        return res.status(400).send('Query not specified');
    }
    
    let valid_params = 0;
    let select = 'lower(hex(blob)) AS blob, lower(hex(commit)) AS commit, project, time, author, language, deps';
    let where = ' WHERE ';
    if(typeof req.query.count != 'undefined' && req.query.count == 'true'){
      select = `count(*) AS count`;
      valid_params++;
    }
    
    if(typeof req.query.start != 'undefined'){
      if(typeof req.query.end != 'undefined'){
        where += `time>=${req.query.start} AND time<=${req.query.end}`;
        valid_params += 2;
      } else {
        where += `time=${req.query.start}`;
        valid_params++;
      }
    } else {
      where = '';
    }
    if(valid_params <= 0){
      return res.status(400).send('Invalid query');
    }
    
    const tb = 'b2cPtaPkgR_all'
    const query = `SELECT ${select} FROM ${tb}${where};`;
    const clickhouse = new ClickHouse({
      url: config.clickhouse,
      format: 'json',
      config: {
        database : 'default',
      }
    });
    
    console.log(`Execute query: ${query}`);
    clickhouse.query(query).exec(function (err, rows){
      if(err){
        res.status(400).json(err);
      } else {
        res.status(200).json(rows);
      }
    });
  });
};
