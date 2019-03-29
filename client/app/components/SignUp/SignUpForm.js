import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      isLoading: false
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
    this.setState({ errors: {} });
    this.setState({ errors: {}, isLoading: true });
    this.props.userSignUpRequest(this.state)
    .then( res => {
      if (!res.ok) { throw response }
      return res.json()  //we only get here if there is no error
    })
    .then( data => {
      if (data.success) {
        console.log('success!')
      }
      else {
        console.log(data);
        this.setState({ errors: data, isLoading: false });
      } 
    })
    // .catch( err => {
    //   err.text().then( errorMessage => {
    //     this.props.dispatch(displayTheError(errorMessage))
    //   })
    // })
    // fetch('/api/account/signup', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     email: this.state.email,
    //     password: this.state.password,
    //   }),
    // }).then(res => res.json())
    //   .then(json => {
    //     console.log('json', json);
    //     if (json.success) {
    //       this.setState({
    //         signUpError: json.message,
    //         isLoading: false,
    //         signUpEmail: '',
    //         signUpPassword: '',
    //       });
    //     } else {
    //       this.setState({
    //         signUpError: json.message,
    //         isLoading: false,
    //       });
    //     }
    //   });
    // console.log(this.state);
    // this.props.userSignUpRequest(this.state);
  }
  render() {
    const { errors } = this.state;
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
              className={classnames("form-control", { 'is-invalid': errors.username})}
            />
            {errors.username && <span className="help-block">{errors.username}</span>}
          </div>
          <div className="form-group">
            <label className="control-label">Email</label>
            <input
              value={this.state.email}
              onChange={this.onChange}
              type="email"
              name="email"
              className={classnames("form-control", { 'is-invalid': errors.email})}
            />
            {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label className="control-label">Password</label>
            <input
              value={this.state.password}
              onChange={this.onChange}
              type="password"
              name="password"
              className={classnames("form-control", { 'is-invalid': errors.password})}
            />
            {errors.email && <div className="invalid-feedback d-block">{errors.password}</div>}
          </div>
          <div className="form-group">
            <label className="control-label">Confirm Password</label>
            <input
              value={this.state.confirmPassword}
              onChange={this.onChange}
              type="password"
              name="confirmPassword"
              className={classnames("form-control", { 'is-invalid': errors.confirmPassword})}
            />
            {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}                                 
          </div>

          <div className="form-group">
            <button disabled={this.state.isLoading} className="btn btn-primary btn-large">
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