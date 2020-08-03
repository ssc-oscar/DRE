import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import LookupSearchForm from './LookupSearchForm';
import { lookupSha } from '../../../actions/Search';

class LookupSearchPage extends React.Component {
	render() {
		const { lookupSha } = this.props;
		return (
			<div className="row justify-content-center">
			  <LookupSearchForm lookupSha={lookupSha}/>
			</div>
		)
	}
}

LookupSearchPage.propTypes = {
	lookupSha: PropTypes.func.isRequired
}

export default connect(null, { lookupSha }) (LookupSearchPage);
