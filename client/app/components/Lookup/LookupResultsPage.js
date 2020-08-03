import LookupSearchForm from './LookupSearchForm';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import LookupResultsForm from './LookupResultsForm';
import { Row, Col, Container, Card } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { lookupSha } from '../../../actions/Search';

class LookupResultsPage extends Component {
	
	render() {
		const { lookupSha } = this.props;

		return (
			<Row className="justify-content-center">
			  <Col xs="10">
			    <LookupResultsForm
			      lookupSha={lookupSha}
			    />
			  </Col>
			</Row>
		)

	}
}

LookupResultsPage.propTypes = {
	lookupSha: PropTypes.func.isRequired
}

export default connect(null, { lookupSha }) (LookupResultsPage);
