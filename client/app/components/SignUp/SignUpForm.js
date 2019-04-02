import React from 'react';
import PropTypes from 'prop-types';
import validateInput from '../../../../server/shared/validations/SignUp';
import TextFieldGroup from '../common/TextFieldGroup';

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

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignUpRequest(this.state)
      .then( res => {
        if (!res.ok) { throw response }
        return res.json()  //we only get here if there is no error
      })
      .then( data => {
        if (data.success) {
          this.props.addFlashMessage({
            type: 'success',
            text: 'Successful sign up! Welcome.'
          })
          this.context.router.history.push('/');
        }
        else {
          console.log(data);
          this.setState({ errors: data, isLoading: false });
        } 
      })
    }
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
          <TextFieldGroup
            error={errors.username}
            label="Username"
            onChange={this.onChange}
            value={this.state.username}
            field="username"
          />
          <TextFieldGroup
            error={errors.email}
            label="Email"
            onChange={this.onChange}
            value={this.state.email}
            field="email"
            type="email"
          />          
          <TextFieldGroup
            error={errors.password}
            label="Password"
            onChange={this.onChange}
            value={this.state.password}
            field="password"
            type="password"
          />
          <TextFieldGroup
            error={errors.confirmPassword}
            label="Confirm Password"
            onChange={this.onChange}
            value={this.state.confirmPassword}
            field="confirmPassword"
            type="password"
          />                     

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
  userSignUpRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

SignUpForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default SignUpForm;