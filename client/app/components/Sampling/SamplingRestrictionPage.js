import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSampling } from '../../../actions/sampling';
import SamplingRestrictionForm from './SamplingRestrictionForm';

class SamplingRestrictionPage extends Component {
	render() {
    		const { getSampling } = this.props;
		return (
			<div className="row justify-content-center">
			  <SamplingRestrictionForm 
			   getSampling={getSampling}
			  />
			</div>
		);
	}
}

SamplingRestrictionPage.propTypes = {
  getSampling: PropTypes.func.isRequired
}

export default connect(null, {getSampling}) (SamplingRestrictionPage);
