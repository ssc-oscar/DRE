import LookupSearchForm from './LookupSearchForm';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import LookupResultsForm from './LookupResultsForm';
import { Row, Col, Container, Card } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { lookupSha } from '../../../actions/Search';
import FastGraph from '../FastGraph/FastGraph.js';
import { type } from 'os';

class LookupResultsPage extends Component {

  constructor(props){
    
    const search = window.location.search;
		const params = new URLSearchParams(search);
		const sha = params.get('sha1');
		const type = params.get('type');
    
    super(props);
    
    this.state = {
			type: type,
			sha: sha,
    }
    
    this.handler = this.handler.bind(this);
  }
  
  handler(sha, type) {
    this.setState({
      type: type,
      sha: sha,
    });
  }
	
	render() {
    const { lookupSha } = this.props;
    

		return (
			<div className="row justify-content-center">
			  <LookupResultsForm lookupSha={lookupSha} sha={this.state.sha} type={this.state.type}/>
				<FastGraph				 lookupSha={lookupSha} sha={this.state.sha} type={this.state.type} handler={this.handler}/>
			</div>
		)

	}
}

LookupResultsPage.propTypes = {
	lookupSha: PropTypes.func.isRequired
}

export default connect(null, { lookupSha }) (LookupResultsPage);
