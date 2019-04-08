import React, { Component } from 'react';
import AuthorResultsForm from './AuthorResultsForm';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../../actions/flashMessages';
import PropTypes from 'prop-types';


class AuthorResultsPage extends Component {
  render() {
    const { addFlashMessage } = this.props;
    const authors = this.props.location.state.authors;
    return (
      <div className="row justify-content-center">
        <AuthorResultsForm
          addFlashMessage={addFlashMessage}
          authors={authors}/>
      </div>
    );
  }
}

AuthorResultsPage.propTypes = {
  addFlashMessage: PropTypes.func.isRequired
}

export default connect(null, { addFlashMessage }) (AuthorResultsPage);