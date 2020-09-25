import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from "react-router-dom";
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
  Col,
  UncontrolledTooltip
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

  generateWarning(data) {
    let rv = data.final;
    let warning = '';
    let isError = false;
    const len = rv.length;
    const exceeded = data.exceeded;

    if (len > 100) {
      warning = `Your search criteria returned too many results! \
                Please go back and refine your search criteria.`
      isError = true;
      rv = [];
    }
    else if (len > 75) {
      warning = `Warning: Your search criteria returned a large number of matches.\ 
                To try and reduce the result set, go back and refine your search criteria.`
    }
    else if (len == 0) {
      isError = true;
      if (exceeded) {
        warning = 'Your search returned too many results! Please go back and refine your search criteria.'
      }
      else {
        warning = 'Your search returned no results. Please go back and refine your search criteria.'
      }
    }
    else {
      warning = ''
    }

    return { rv, warning, isError };
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ errors: {}, isLoading: true });
    this.props.getAuthors(this.state)
    .then( (res) => {
      const { rv, warning, isError } = this.generateWarning(res.data);
      this.props.history.push('/select', {
        authors: rv.map(a => { a.active = false; return a;}),
        warning: warning,
        error: isError });
    },
    (err) => { console.log('error', err.response) }
    );
  }

  render() {
    const { errors, additionalEmails, usernames } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <div className="text-center mt-2">
              <p>
              Please provide any additional information below to help us locate your authorship records. 
              These fields relate to any credentials you have used in any of your past
              <a href="https://git-scm.com/" target="_blank"> git</a> commits.
              </p>
            </div>
          </CardHeader>
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
            <Label className="control-label" id="addEmails">
              Additional Emails <i className="fa fa-info-circle"></i>
            </Label>
            <UncontrolledTooltip placement="top" target="addEmails">
              This section allows you to provide any other emails to search for.
              NOTE: The email you signed up with is included in the search already.
            </UncontrolledTooltip>
            <MultiValueGroup
              error={errors.additionalEmails}
              tags={additionalEmails}
              handleDelete={this.handleEmailDelete}
              handleAddition={this.handleEmailAddition}
              placeholder="Use a comma or the return key after each entry"
            />
            <Label className="control-label" id="addUsernames">
              Additional Email Handles <i className="fa fa-info-circle"></i>
            </Label>
            <UncontrolledTooltip placement="top" target="addUsernames">
              This section allows your to provide any other email handles (
              any usernames before the @ sign in your email address ) to search for.
            </UncontrolledTooltip>
            <MultiValueGroup
              error={errors.usernames}
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

export default withRouter(AuthorSearchForm);
