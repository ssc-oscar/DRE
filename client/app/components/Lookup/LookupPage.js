import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import LookupSearch from './LookupSearch';
import { lookupSha } from '../../../actions/Search';

class LookupPage extends React.Component {
	render() {
		const { lookupSha } = this.props;
		return (
			<div className="row justify-content-center">
			  <LookupSearch lookupSha={lookupSha}/>
			</div>
		)
	}
}

LookupPage.propTypes = {
	lookupSha: PropTypes.func.isRequired
}

export default connect(null, { lookupSha }) (LookupPage);
