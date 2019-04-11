import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
// import validateInput from '../../../server/shared/validations/login';
import { connect } from 'react-redux';
import { login } from '../../../actions/signUpActions';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    return true;
    // const { errors, isValid } = validateInput(this.state);

    // if (!isValid) {
    //   this.setState({ errors });
    // }

    // return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state)
      .then( () => {
        // this.context.router.history.push('/');
        location.reload();
      },
      (err) => {
        console.log(err);
        this.setState({ errors: err.response.data, isLoading: false })
      })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, identifier, password, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Sign In Below</h1>

        { errors.form && <div className="alert alert-danger">{errors.form}</div> }

        <TextFieldGroup
          field="identifier"
          label="Username / Email"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />

        <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
      </form>
    );
  }
}

SignInForm.propTypes = {
  login: PropTypes.func.isRequired
}

SignInForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, { login })(SignInForm);