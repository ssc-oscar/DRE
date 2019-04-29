import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button, Row } from 'reactstrap';

class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row className="justify-content-center">
        <Button onClick={() => this.context.router.history.push('/')}>Back to Home</Button>
      </Row>
    );
  }
}

NotFound.contextTypes = {
  router: PropTypes.object.isRequired
}

export default NotFound;