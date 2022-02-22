import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LocateProfilesForm from './LocateProfilesForm';
import { getAllUsers } from '../../../actions/userActions';

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