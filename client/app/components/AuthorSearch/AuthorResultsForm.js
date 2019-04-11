import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import AuthorCard from '../common/AuthorCard';

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
      selected_authors: [],
      omitted_authors: [],
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
    }, () => { console.log("updated", this.state.selected_authors) })
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.submitAuthors({
      selected: this.state.selected_authors,
      omitted: this.state.omitted_authors
    })
    .then(d => {
      this.context.router.history.push('/dashboard');
    },
    (err) => { console.log(err) }
    );
    // this.setState({ errors: {}, isLoading: true });
    // this.props.getAuthors(this.state)
    // .then( d => {
    //   console.log("about to di")
    //   console.log(d);
    // },
    // (err) => { console.log(err) }
    // );
  }
  
  render() {
    const { authors } = this.state;
    const cards = authors.map(a =>
    <AuthorCard key={a.id} author={a} onClickAuthor={this.onClickAuthor}/>)
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Select your author identities below!</h1>
        <div className="list-group">
          {cards}
        </div>
        <div className="form-group">
          <button disabled={this.state.isLoading} className="btn btn-primary btn-large">
            Submit
          </button>
        </div>
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