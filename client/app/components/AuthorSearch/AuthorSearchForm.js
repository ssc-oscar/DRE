import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import validateInput from '../../../../server/shared/validations/AuthorSearch';
import TextFieldGroup from '../common/TextFieldGroup';
import MultiValueGroup from '../common/MultiValueGroup';
import AuthorCard from '../common/AuthorCard';

class AuthorSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      fname: '',
      lname: '',
      additionalEmails: [],
      usernames: [],
      errors: {},
      isLoading: false
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

  // isValid() {
  //   const { errors, isValid } = validateInput(this.state);

  //   if (!isValid) {
  //     console.log(errors)
  //     this.setState({ errors })
  //   }

  //   return isValid;
  // }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ errors: {}, isLoading: true });
    this.props.getAuthors(this.state)
    .then( (res) => {
      console.log(res.data);
      this.context.router.history.push('/select', { authors: res.data });
    },
    (err) => { console.log(err) }
    );
  }

  render() {
    const { errors, additionalEmails, usernames } = this.state;
    return (
        <form onSubmit={this.onSubmit}>
          <h1>Search for your Developer Profile below!</h1>
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
          <div className="form-group">
            <button disabled={this.state.isLoading} className="btn btn-primary btn-large">
              Search
            </button>
          </div>
        </form>
    );
  }
}

AuthorSearchForm.propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
  getAuthors: PropTypes.func.isRequired
}

AuthorSearchForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default AuthorSearchForm;