import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../../actions/flashMessages';
import PropTypes from 'prop-types';
import LocateProfilesForm from './LocateProfilesForm';
import { getAllUsers } from '../../../actions/userActions';
import { withRouter } from "react-router-dom";

class LocateProfilesPage extends Component {
  render() {
    const { getAllUsers } = this.props;
    return (
      <div className="row justify-content-center">
        <LocateProfilesForm getAllUsers={getAllUsers}/>
      </div>
    );
  }
}

LocateProfilesPage.propTypes = {
  getAllUsers: PropTypes.func.isRequired
}

export default connect(null, { getAllUsers }) (LocateProfilesPage);