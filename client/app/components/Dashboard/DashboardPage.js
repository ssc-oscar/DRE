import React, { Component } from 'react';
import DashboardForm from './DashboardForm';
import DashboardHeader from './DashboardHeader';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../../actions/flashMessages';
import { getProfile, getUser } from '../../../actions/userActions';
import { lookupSha } from '../../../actions/Search';
import PropTypes from 'prop-types';


class DashboardPage extends Component {
  render() {
    const { addFlashMessage, getProfile, getUser, lookupSha } = this.props;
    return (
      <div className="row justify-content-center">
        <DashboardForm
          addFlashMessage={addFlashMessage}
          getUser={getUser}
          getProfile={getProfile}
          lookupSha={lookupSha}
        />
      </div>
    );
  }
}

DashboardPage.propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  lookupSha: PropTypes.func.isRequired
}

export default connect(null, { addFlashMessage, getProfile, getUser, lookupSha }) (DashboardPage);
