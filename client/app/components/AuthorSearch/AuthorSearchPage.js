import React, { Component } from 'react';
import AuthorSearchForm from './AuthorSearchForm';
import { getAuthors } from '../../../actions/signUpActions'
import { connect } from 'react-redux';
import { addFlashMessage } from '../../../actions/flashMessages';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';


class AuthorSearchPage extends Component {
  render() {
    const { getAuthors, addFlashMessage } = this.props
    return (
      <Row className="justify-content-center">
        <Col xs="6">
          <AuthorSearchForm
            getAuthors={getAuthors}
            addFlashMessage={addFlashMessage} />
        </Col>
      </Row>
    );
  }
}

AuthorSearchPage.propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
  getAuthors: PropTypes.func.isRequired
}

export default connect(null, { addFlashMessage, getAuthors }) (AuthorSearchPage);