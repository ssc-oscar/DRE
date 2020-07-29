import LookupSearch from './LookupSearch';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BuildResultTable from './BuildResultTable';
import { Row, Col, Container, Card } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { lookupSha } from '../../../actions/Search';

class LookupResultsPage extends Component {
	
	render() {
		const { type, data } = this.props.location.state;
		const { lookupSha } = this.props;

		return (
			<Row className="justify-content-center">
			  <Col xs="10">
			    <BuildResultTable
			      lookupSha={lookupSha}
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

export default connect(null, { lookupSha }) (LookupResultsPage);
