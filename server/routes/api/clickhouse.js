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

    let limit = ' LIMIT ';
    limit += `${req.query.limit}`;
    
    const tb = 'commits_all'
    const query = `SELECT ${select} FROM ${tb}${where}${limit};`;
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
    query('count').optional().isBoolean(),
    query('limit').optional().isInt({min:0}),
    query('language').optional().isString(),
    query('author').optional().isString(),
    query('deps').optional().isString(),
    query('project').optional().isString()
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
      if(typeof req.query.end == 'undefined') req.query.end = req.query.start;

      where += `time>=${req.query.start} AND time<=${req.query.end}`;
      valid_params += 2;
      
      if(typeof req.query.language != 'undefined'){ //adding language filtering
        where += ` AND language=${req.query.language}`;
        valid_params++;
      }

      if(typeof req.query.author != 'undefined'){
        where += ` AND author=${req.query.author}`;
        valid_params++;
      }
        
      if(typeof req.query.deps != 'undefined'){
        where += ` AND deps=${req.query.deps}`;
        valid_params++;
      }

      if(typeof req.query.project != 'undefined'){
        where += ` AND project=${req.query.project}`;
        valid_params++;
      }

    } else {
      where = '';
    }
    if(valid_params <= 0){
      return res.status(400).send('Invalid query');
    }
    let limit = ' LIMIT ';
    limit += `${req.query.limit}`;
    
    const tb = 'b2cPtaPkgR_all'
    const query = `SELECT ${select} FROM ${tb}${where}${limit};`;
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
