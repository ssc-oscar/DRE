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
        key={this.state.key}
        active={this.state.active}
        onClick={this.onClick}>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{ this.state.id }</h5>
            <small>User: { this.state.user }</small>
          </div>
          <p className="mb-1">First Name: { this.state.first }</p>
          <p className="mb-1">Last Name: { this.state.last }</p>
          <p className="mb-1">Email: { this.state.email }</p>
      </ListGroup.Item>
      // <div ref={this.element}>
      //   <div
      //     className="list-group-item list-group-item-action justify-content-center flex-column align-items-start">
      //     <div className="d-flex w-100 justify-content-between">
      //       <h5 className="mb-1">{ this.state.id }</h5>
      //       <small>User: { this.state.user }</small>
      //     </div>
      //     <p className="mb-1">First Name: { this.state.first }</p>
      //     <p className="mb-1">Last Name: { this.state.last }</p>
      //     <p className="mb-1">Email: { this.state.email }</p>
      //   </div>
      // </div>
    );
  }
}

AuthorCard.propTypes = {
  author: PropTypes.object.isRequired
}

export default AuthorCard;