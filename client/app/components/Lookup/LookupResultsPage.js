import LookupSearch from './LookupSearch';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BuildResultTable from './BuildResultTable';
import { Row, Col, Container, Card } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class LookupResultsPage extends Component {
	
	render() {
		const { sha, type, data } = this.props.location.state;

		return (
			<Row className="justify-content-center">
			  <Col xs="8">
			    <BuildResultTable
			      data={data}
			      type={type}
			    />
			  </Col>
			</Row>
		)

	}
}

LookupResultsPage.propTypes = {
}

export default connect(null, {}) (LookupResultsPage);
