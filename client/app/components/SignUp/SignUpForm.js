import React from 'react';
import PropTypes from 'prop-types';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.userSignUpRequest(this.state);
  }
  render() {
    return (
        <form onSubmit={this.onSubmit}>
          <h1>Create your Developer Profile below!</h1>
          <div className="form-group">
            <label className="control-label">Username</label>
            <input
              value={this.state.username}
              onChange={this.onChange}
              type="text"
              name="username"
              className="form-control"
            />
            <label className="control-label">Email</label>
            <input
              value={this.state.email}
              onChange={this.onChange}
              type="email"
              name="email"
              className="form-control"
            />
            <label className="control-label">Password</label>
            <input
              value={this.state.password}
              onChange={this.onChange}
              type="password"
              name="password"
              className="form-control"
            />
            <label className="control-label">Confirm Password</label>
            <input
              value={this.state.confirmPassword}
              onChange={this.onChange}
              type="password"
              name="confirmPassword"
              className="form-control"
            />                                    
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-large">
              Sign Up
            </button>
          </div>
        </form>
    );
  }
}

SignUpForm.propTypes = {
  userSignUpRequest: PropTypes.func.isRequired
}

export default SignUpForm;