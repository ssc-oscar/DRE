import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.context.router.history.push('/error');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.history.push('/');
      }
    }

    /*
    checkIfAuthenticated = () => {
      if(!this.props.isAuthenticated) {
        this.context.router.history.push('/error');
      }
    }
    */

    render() {
      //this.checkIfAuthenticated();
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  /* Causes routing errors now
  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  }
  */

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return connect(mapStateToProps, null)(Authenticate);
}
