import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import AuthorCard from '../common/AuthorCard';
import { ListGroup, FormGroup, Alert, Button, Col, Row } from 'reactstrap';

class AuthorResultsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authors: this.props.authors,
      warning: this.props.warning,
      isError: this.props.error
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onSelectButton = this.onSelectButton.bind(this);
    this.onClickAuthor = this.onClickAuthor.bind(this);
    this.onClick = this.onClick.bind(this);
    console.log(this.state);
  }

  onClickAuthor(remove, id) {
    let authors = this.state.authors;
    const i = authors.findIndex((a => a._id == id));
    authors[i].active = !authors[i].active;

    this.setState({
      authors: authors
    })
  }

  onSelectButton(type) {
    let authors = this.state.authors;

    if (type == 'select') {
      authors = authors.map(a => { a.active = true; return a; });
      this.setState({
        authors: authors
      })
    }
    else {
      authors = authors.map(a => { a.active = false; return a; });
      this.setState({
        authors: authors
      })
    }
  }

  onClick(e) {
    if (this.state.isError) {
      this.props.history.push('/search');
    }
    else {
      this.onSubmit(e);
    }
  }

  onSubmit(e) {
    e.preventDefault();
    let omitted_objs = []
    let selected_objs = []
    const all = this.state.authors

    for (let i = 0; i < all.length; i++) {
      if (!all[i].active) omitted_objs.push(all[i]);
      else selected_objs.push(all[i]);
    }

    this.props.submitAuthors({
      selected: selected_objs,
      omitted: omitted_objs
    })
    .then(d => {
      this.props.history.push('/dash');
    },
    (err) => { console.log(err) }
    );
  }

  render() {
    const { authors, omitted_ids, selected_ids } = this.state;
    
    const cards = authors.map(a => <AuthorCard key={a.id} author={a} onClickAuthor={this.onClickAuthor}/>);
    return (
      <form onSubmit={this.onSubmit}>
        {this.state.warning && <Alert color="danger">{this.state.warning}</Alert>}
        <Row className="justify-content-center my-4">
          <Col xs="6" className="text-center">
            <Button onClick={() => this.onSelectButton('select')} color="primary">Select All</Button>
          </Col>
          <Col xs="6" className="text-center">
            <Button onClick={() => this.onSelectButton('deselect')} color="primary">Deselect All</Button>
          </Col>
        </Row>
        <ListGroup>
          {cards}
        </ListGroup>
        <FormGroup className="text-center mt-3">
          <Button color="primary" onClick={this.onClick}>
            {this.state.isError ? "Back" : "Submit"}
          </Button>
        </FormGroup>
      </form>
    );
  }
}

AuthorResultsForm.propTypes = {
  addFlashMessage: PropTypes.func.isRequired
}

export default withRouter(AuthorResultsForm);
