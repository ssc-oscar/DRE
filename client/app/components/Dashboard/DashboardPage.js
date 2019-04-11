import React, { Component } from 'react';
import DashboardForm from './DashboardForm';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../../actions/flashMessages';
import PropTypes from 'prop-types';


class DashboardPage extends Component {
  render() {
    const { addFlashMessage } = this.props;
    return (
      <div className="row justify-content-center">
        <DashboardForm
          addFlashMessage={addFlashMessage}/>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  addFlashMessage: PropTypes.func.isRequired
}

export default connect(null, { addFlashMessage }) (DashboardPage);