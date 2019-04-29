import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import validateInput from '../../../../server/shared/validations/AuthorSearch';
import TextFieldGroup from '../common/TextFieldGroup';
import MultiValueGroup from '../common/MultiValueGroup';
import AuthorCard from '../common/AuthorCard';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Row,
  Col
} from "reactstrap";

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
      let warning;
      if (res.data.length > 75) {
        warning = 'Your search criteria returned a large number of matches. To try and reduce the result set, go back and refine your search criteria.'
      }
      else if (res.data.length == 0) {
        warning = 'Your search returned no results. Please go back and try again.'
      }
      else {
        warning = ''
      }
      this.context.router.history.push('/select', { authors: res.data, warning: warning });
    },
    (err) => { console.log(err) }
    );
  }

  render() {
    const { errors, additionalEmails, usernames } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <Card className="bg-secondary shadow border-0">
          {/* <CardHeader className="bg-transparent">
            <div className="text-center mt-2">
              <h1>Additional search parameters</h1>
            </div>
          </CardHeader> */}
          <CardBody className="px-lg-5 py-lg-5">
            <Label>First Name</Label>
            <TextFieldGroup
              error={errors.fname}
              label=""
              focus={true}
              onChange={this.onChange}
              value={this.state.fname}
              field="fname"
            />
            <Label>Last Name</Label>
            <TextFieldGroup
              error={errors.lname}
              label=""
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
              placeholder="Use a comma or the return key after each entry"
            />
            <MultiValueGroup
              error={errors.usernames}
              label="Usernames"
              tags={usernames}
              handleDelete={this.handleUsernameDelete}
              handleAddition={this.handleUsernameAddition}
              placeholder="Use a comma or the return key after each entry"
            />
            <FormGroup>
              <Button color="primary" disabled={this.state.isLoading}>
                Search
                {this.state.isLoading && <i className="ml-2 fa fa-spinner fa-spin"></i>}
              </Button>
            </FormGroup>
          </CardBody>
        </Card>
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