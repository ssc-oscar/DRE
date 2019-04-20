import React, { Component } from 'react';
import AuthorResultsForm from './AuthorResultsForm';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../../actions/flashMessages';
import { submitAuthors } from '../../../actions/signUpActions';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';


class AuthorResultsPage extends Component {
  render() {
    const { addFlashMessage, submitAuthors } = this.props;
    const { authors, warning } = this.props.location.state;
    return (
      <Row className="justify-content-center">
        <Col xs="8">
          <AuthorResultsForm
            addFlashMessage={addFlashMessage}
            authors={authors}
            warning={warning}
            submitAuthors={submitAuthors}/>
        </Col>
      </Row>
    );
  }
}

AuthorResultsPage.propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
  submitAuthors: PropTypes.func.isRequired
}

export default connect(null, { addFlashMessage, submitAuthors }) (AuthorResultsPage);