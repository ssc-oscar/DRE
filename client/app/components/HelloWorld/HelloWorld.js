import React, { Component } from 'react';
import SignUpForm from '../SignUp/SignUpForm';
import { userSignUpRequest } from '../../../actions/signUpActions';
import { getAuthors } from '../../../actions/signUpActions'
import { connect } from 'react-redux';
import { addFlashMessage } from '../../../actions/flashMessages';
import PropTypes from 'prop-types';


class HelloWorld extends Component {
  render() {
    const { userSignUpRequest, getAuthors, addFlashMessage } = this.props
    return (
      <div className="row justify-content-center">
        <SignUpForm
          getAuthors={getAuthors}
          userSignUpRequest={userSignUpRequest}
          addFlashMessage={addFlashMessage}/>
      </div>
    );
  }
}

HelloWorld.propTypes = {
  userSignUpRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  getAuthors: PropTypes.func.isRequired
}

export default connect(null, { userSignUpRequest, addFlashMessage, getAuthors }) (HelloWorld);