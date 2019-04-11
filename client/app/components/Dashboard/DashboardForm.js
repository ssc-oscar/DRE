import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import AuthorCard from '../common/AuthorCard';

class DashboardForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form>
        <h1>Please wait while we populate your dashboard!</h1>
      </form>
    );
  }
}

DashboardForm.propTypes = {
}

DashboardForm.contextTypes = {
}

export default DashboardForm;