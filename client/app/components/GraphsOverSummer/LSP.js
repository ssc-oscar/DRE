import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import LSF from './LSF';
import { lookupSha } from '../../../actions/Search';

class LSP extends Component {
	render() {
		const { lookupSha } = this.props;
		return (
			<div className="row justify-content-center">
			  <LSF lookupSha={lookupSha}/>
			</div>
		)
	}
}

LSP.propTypes = {
	lookupSha: PropTypes.func.isRequired
}

export default connect(null, { lookupSha }) (LSP);
