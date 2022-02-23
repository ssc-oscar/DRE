import PropTypes from 'prop-types';
import React, { Component } from 'react';
import LookupResultsForm from './LookupResultsForm';
import { connect } from 'react-redux';
import { lookupSha } from '../../../actions/Search';

class LookupResultsPage extends Component {
	
    render() {
        const { lookupSha } = this.props;
        return (
            <div className="row justify-content-center">
              <LookupResultsForm lookupSha={lookupSha}/>
            </div>
        )
    }
}

LookupResultsPage.propTypes = {
	lookupSha: PropTypes.func.isRequired
}

export default connect(null, { lookupSha }) (LookupResultsPage);
