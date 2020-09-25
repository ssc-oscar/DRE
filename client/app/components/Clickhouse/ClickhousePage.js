import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import ClickhouseForm from './ClickhouseForm';
import { clickhouseQuery } from '../../../actions/Search';

class ClickhousePage extends React.Component {
	render() {
		const { clickhouseQuery } = this.props;
		return (
			<div className="row justify-content-center">
			  <ClickhouseForm clickhouseQuery={clickhouseQuery}/>
			</div>
		)
	}
}

ClickhousePage.propTypes = {
	clickhouseQuery: PropTypes.func.isRequired
}

export default connect(null, { clickhouseQuery }) (ClickhouseForm);
