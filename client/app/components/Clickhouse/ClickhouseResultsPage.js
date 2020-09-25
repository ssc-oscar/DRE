import ClickhouseForm from './ClickhouseForm';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ClickhouseResultsForm from './ClickhouseResultsForm';
import { Row, Col, Container, Card } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clickhouseQuery } from '../../../actions/Search';

class ClickhouseResultsPage extends Component {
	
	render() {
		const { clickhouseQuery } = this.props;

		return (
			<div className="row justify-content-center">
			  <ClickhouseResultsForm clickhouseQuery={clickhouseQuery}/>
			</div>
		)

	}
}

ClickhouseResultsPage.propTypes = {
	clickhouseQuery: PropTypes.func.isRequired
}

export default connect(null, { clickhouseQuery }) (ClickhouseResultsPage);
