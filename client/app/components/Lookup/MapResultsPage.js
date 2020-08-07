import LookupSearchForm from './LookupSearchForm';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MapResultsForm from './MapResultsForm';
import { Row, Col, Container, Card } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { lookupSha } from '../../../actions/Search';

class MapResultsPage extends Component {
	render() {
		const { lookupSha } = this.props;

		return (
			<Row className="justify-content-center">
			  <Col xs="10">
			    <MapResultsForm
			      lookupSha={lookupSha}
			     />
			  </Col>
			</Row>
		)

	}
}

MapResultsPage.propTypes = {
	    lookupSha: PropTypes.func.isRequired
}

export default connect(null, { lookupSha }) (MapResultsPage);
