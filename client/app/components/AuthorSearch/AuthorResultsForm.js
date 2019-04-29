import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import AuthorCard from '../common/AuthorCard';
import { ListGroup, FormGroup, Alert, Button, Col, Row } from 'reactstrap';

Array.prototype.diff = function (a) {
  return this.filter(function (i) {
      return a.indexOf(i) === -1;
  })
}

class AuthorResultsForm extends React.Component {
  constructor(props) {
    super(props);

    let all_ids = this.props.authors.map(a => a.id);
    this.state = {
      authors: this.props.authors,
      warning: this.props.warning,
      selected_authors: [],
      omitted_authors: [],
      isError: this.props.warning.includes('no results'),
      all_authors: all_ids
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onClickAuthor = this.onClickAuthor.bind(this);
  }

  onClickAuthor(remove, id) {
    let ids = this.state.selected_authors;
    let omitted = []

    if (remove) {
      ids.splice(ids.indexOf(id), 1);
    }
    else {
      ids.push(id);
    }

    omitted = this.state.all_authors.diff(ids);
    this.setState({
      selected_authors: ids,
      omitted_authors: omitted
    }, () => { })
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.submitAuthors({
      selected: this.state.selected_authors,
      omitted: this.state.omitted_authors
    })
    .then(d => {
      this.context.router.history.push('/dash');
    },
    (err) => { console.log(err) }
    );
  }

  render() {
    const { authors } = this.state;
    const cards = authors.map(a =>
    <AuthorCard key={a.id} author={a} onClickAuthor={this.onClickAuthor}/>)
    return (
      <form onSubmit={this.onSubmit}>
        {this.state.warning && <Alert color="danger">{this.state.warning}</Alert>}
        {/* <Row className="justify-content-center my-4">
          <Col xs="6" className="text-center">
            <Button color="primary">Select All</Button>
          </Col>
          <Col xs="6" className="text-center">
            <Button color="primary">Unselect All</Button>
          </Col>
        </Row> */}
        <ListGroup>
          {cards}
        </ListGroup>
        <FormGroup className="text-center mt-3">
          <Button color="primary" disabled={this.state.isError}>
            Submit
          </Button>
        </FormGroup>
      </form>
    );
  }
}

AuthorResultsForm.propTypes = {
  addFlashMessage: PropTypes.func.isRequired
}

AuthorResultsForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default AuthorResultsForm;
