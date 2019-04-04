import React, { Component } from 'react';
import AuthorSearchForm from './AuthorSearchForm';
import { getAuthors } from '../../../actions/signUpActions'
import { connect } from 'react-redux';
import { addFlashMessage } from '../../../actions/flashMessages';
import PropTypes from 'prop-types';


class AuthorSearchPage extends Component {
  render() {
    const { getAuthors, addFlashMessage } = this.props
    return (
      <div className="row justify-content-center">
        <AuthorSearchForm
          getAuthors={getAuthors}
          addFlashMessage={addFlashMessage}/>
      </div>
    );
  }
}

AuthorSearchPage.propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
  getAuthors: PropTypes.func.isRequired
}

export default connect(null, { addFlashMessage, getAuthors }) (AuthorSearchPage);