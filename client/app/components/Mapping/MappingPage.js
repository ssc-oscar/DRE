import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MappingForm from './MappingForm';
import { lookupSha } from '../../../actions/Search';

class MappingPage extends Component {
	render() {
		const { lookupSha } = this.props;
		return (
			<div className="row justify-content-center">
			  <MappingForm lookupSha={lookupSha}/>
			</div>
		)
	}
}

MappingPage.propTypes = {
	lookupSha: PropTypes.func.isRequired
}

export default connect(null, { lookupSha }) (MappingPage);
