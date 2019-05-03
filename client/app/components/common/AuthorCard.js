import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup'

class AuthorCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.author,
      active: false
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.setState({
      active: !this.state.active
    }, () => { this.props.onClickAuthor(!this.state.active, this.state.id) })
  }

  render() {
    return (
      <ListGroup.Item
        style={styles.card}
        key={this.state.key}
        active={this.state.active}
        onClick={this.onClick}>
          <div className="d-flex w-100 justify-content-between">
            <h3 className="mb-1">{ this.state.id }</h3>
            <small>Handle: { this.state.user }</small>
          </div>
          <p className="mb-1">First Name: { this.state.first }</p>
          <div className="d-flex w-100 justify-content-between">
            <p className="mb-1">Last Name: { this.state.last }</p>
            {this.state.active ? <i className="far fa-check-square fa-lg"></i> : <i className="far fa-square fa-lg"></i>}
          </div>
          <p className="mb-1">Email: { this.state.email }</p>
      </ListGroup.Item>
    );
  }
}

const styles = {
  card: {
    cursor: 'pointer'
  }
}
AuthorCard.propTypes = {
  author: PropTypes.object.isRequired
}

export default AuthorCard;