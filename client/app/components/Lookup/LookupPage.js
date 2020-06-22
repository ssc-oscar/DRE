import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import LookupSearch from './LookupSearch';

class LookupPage extends React.Component {
		render() {
					return (
									<div className="row justify-content-center">
										<LookupSearch/>
									</div>
								)
				}
}

LookupPage.propTypes = {
}

export default withRouter(LookupPage);
