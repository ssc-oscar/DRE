const ProjMetadata = require('../../models/ProjMetadata');
const AuthMetadata = require('../../models/AuthMetadata');
const APIMetadata = require('../../models/APIMetadata');
const User = require('../../models/User');
const config = require('../../../config/config');
const authenticate = require('../../middlewares/authenticate');
// const Validator = require('validator');
// const isEmpty = require('lodash/isEmpty');

module.exports = (app) => {

	// Get user information
  app.post('/api/sampling', authenticate, (req, res, next) => {
    var queryParam = {};
    let state  = req.body;

    if( state.activityRange == true ) {
	    queryParam["EarliestCommitDate"] = { $gte: state.unixStart };
	    queryParam["LatestCommitDate"] = { $lt: state.unixEnd };
    }
    if( state.languages == true && state.selected[0].Id != "tmp" ) {
	    let str = "FileInfo.";
	    str = str.concat(state.selected[0].Id);
	    queryParam[str] =  {$exists: true};
    }
    
	  
    if( state.sampleType == "Projects" ) {
    	ProjMetadata.find(queryParam).limit(1000)
    	.exec()
    	.then((sampling) => {
      		res.status(200).json({ sampling });
    	})
    	.catch((err) => console.log(err));
    } else {
      if( state.sampleType == "Authors" ) {
    	  AuthMetadata.find(queryParam).limit(1000)
    	  .exec()
    	  .then((sampling) => {
      	  	res.status(200).json({ sampling });
    	  })
    	  .catch((err) => console.log(err));
      }else{
        if( state.sampleType == "APIs" ) {
          console.log(queryParam)
          APIMetadata.find(queryParam).limit(1000)
          .exec()
          .then((sampling) => {
            res.status(200).json({ sampling });
          })
        }
      }
    }

  })

};
