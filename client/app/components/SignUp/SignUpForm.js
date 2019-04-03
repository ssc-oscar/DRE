import React from 'react';
import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import PropTypes from 'prop-types';
import validateInput from '../../../../server/shared/validations/SignUp';
import TextFieldGroup from '../common/TextFieldGroup';
import '../../styles/react-tags.css';
import classnames from 'classnames';
import MultiValueGroup from '../common/MultiValueGroup';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      fname: '',
      lname: '',
      additionalEmails: [],
      usernames: [],
      errors: {},
      isLoading: false,
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleEmailDelete = this.handleEmailDelete.bind(this);
    this.handleEmailAddition = this.handleEmailAddition.bind(this);
    this.handleUsernameDelete = this.handleUsernameDelete.bind(this);
    this.handleUsernameAddition = this.handleUsernameAddition.bind(this);
  }

  handleEmailDelete(i) {
    const { additionalEmails } = this.state;
    this.setState({
      additionalEmails: additionalEmails.filter((tag, index) => index !== i),
    });
  }

  handleEmailAddition(tag) {
      this.setState(state => ({
        additionalEmails: [...state.additionalEmails, tag]
      }));
  }

  handleUsernameDelete(i) {
    const { usernames } = this.state;
    this.setState({
      usernames: usernames.filter((tag, index) => index !== i),
    });
  }

  handleUsernameAddition(tag) {
      this.setState(state => ({
        usernames: [...state.usernames, tag]
      }));
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state, 'signup');

    if (!isValid) {
      console.log(errors)
      this.setState({ errors })
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.getAuthors(this.state)
      .then( res => {
        if (!res.ok) { throw response }
        return res.json()  //we only get here if there is no error
      })
      .then( data => {
        console.log(data);
      })
      // this.props.userSignUpRequest(this.state)
      // .then( res => {
      //   if (!res.ok) { throw response }
      //   return res.json()  //we only get here if there is no error
      // })
      // .then( data => {
      //   if (data.success) {
      //     this.props.addFlashMessage({
      //       type: 'success',
      //       text: 'Successful sign up! Welcome.'
      //     })
      //     this.context.router.history.push('/');
      //   }
      //   else {
      //     console.log(data);
      //     this.setState({ errors: data, isLoading: false });
      //   } 
      // })
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
    const { errors, additionalEmails, usernames } = this.state;
    return (
        <form onSubmit={this.onSubmit}>
          <h1>Create your Developer Profile below!</h1>
          {/* <TextFieldGroup
            error={errors.username}
            label="Username"
            onChange={this.onChange}
            value={this.state.username}
            field="username"
          /> */}
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
          <hr></hr>
          <TextFieldGroup
            error={errors.fname}
            label="First Name"
            onChange={this.onChange}
            value={this.state.fname}
            field="fname"
          />
          <TextFieldGroup
            error={errors.lname}
            label="Last Name"
            onChange={this.onChange}
            value={this.state.lname}
            field="lname"
          />
          <MultiValueGroup
            error={errors.additionalEmails}
            label="Additional Emails"
            tags={additionalEmails}
            handleDelete={this.handleEmailDelete}
            handleAddition={this.handleEmailAddition}
            placeholder="Add email"
          />
          <MultiValueGroup
            error={errors.usernames}
            label="Usernames"
            tags={usernames}
            handleDelete={this.handleUsernameDelete}
            handleAddition={this.handleUsernameAddition}
            placeholder="Add username"
          />          
          {/* <div className="form-group">
            <label className="control-label">Additional Emails</label>
            <ReactTags
              inputFieldPosition="top"
              tags={additionalEmails}
              allowDragDrop={false}
              handleDelete={this.handleEmailDelete}
              handleAddition={this.handleEmailAddition}
              delimiters={delimiters}
              placeholder="Add email"
            />
          </div> */}
          {/* <div className="form-group">
            <label className="control-label">Usernames</label>
            <ReactTags
              inputFieldPosition="top"
              tags={usernames}
              allowDragDrop={false}
              handleDelete={this.handleUsernameDelete}
              handleAddition={this.handleUsernameAddition}
              delimiters={delimiters}
              placeholder="Add username"
            />
            {errors.usernames && <div className="invalid-feedback d-block">{errors.usernames}</div>}
          </div>                                    */}

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