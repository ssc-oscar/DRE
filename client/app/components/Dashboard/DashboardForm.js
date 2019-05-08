import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

class DashboardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.auth.user
    }
    this.listAuthors = this.listAuthors.bind(this);
  }

  listAuthors() {
    let { omittedIds, selectedIds, suggestedIds } = this.state.user

    selectedIds = selectedIds.map(a => { a.active = true; return a; });
    omittedIds = omittedIds.map(a => { a.active = false; return a; });
    suggestedIds = suggestedIds.map(a => { a.active = false; return a; });

    this.props.history.push('/select', {
      authors: [...selectedIds, ...omittedIds, ...suggestedIds],
      warning: '',
      error: false });
  }
  

  render() {
    return (
      <Button onClick={this.listAuthors}>Back to Search</Button>
    );
  }
}

DashboardForm.propTypes = {
  auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {})(withRouter(DashboardForm));