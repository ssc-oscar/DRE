import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import AuthorCard from '../common/AuthorCard';
import { Button } from 'reactstrap';

class DashboardForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button onClick={() => this.context.router.history.push('/search')}>Back to Search</Button>
    );
  }
}

DashboardForm.propTypes = {
}

DashboardForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default DashboardForm;