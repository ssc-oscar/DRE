import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import FastGraphForm from './FastGraphForm';

class FastGraphPage extends Component {
    render() {
        return (
            <div className="row justify-content-center">
              <FastGraphForm/>
            </div>
        )
    }
}

export default FastGraphPage;
