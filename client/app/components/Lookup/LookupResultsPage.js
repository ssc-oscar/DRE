import LookupSearchForm from './LookupSearchForm';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import LookupResultsForm from './LookupResultsForm';
import { Row, Col, Container, Card } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { lookupSha } from '../../../actions/Search';
import FastGraph from '../FastGraph/FastGraph.js';

class LookupResultsPage extends Component {
	
	render() {
		const { lookupSha } = this.props;

		return (
			<div className="row justify-content-center">
			  <LookupResultsForm lookupSha={lookupSha}/>
				<FastGraph				 lookupSha={lookupSha}/>
			</div>
		)

	}
}

LookupResultsPage.propTypes = {
	lookupSha: PropTypes.func.isRequired
}

export default connect(null, { lookupSha }) (LookupResultsPage);
