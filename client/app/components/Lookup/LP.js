import LookupSearchForm from './LookupSearchForm';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import LR from './LR';
import { Row, Col, Container, Card } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { lookupSha } from '../../../actions/Search';

class LP extends Component {
	
    render() {
        const { lookupSha } = this.props;
        return (
            <div className="row justify-content-center">
              <LR lookupSha={lookupSha}/>
            </div>
        )
    }
}

LP.propTypes = {
	lookupSha: PropTypes.func.isRequired
}

export default connect(null, { lookupSha }) (LP);
