import React, { Component } from 'react';
import SignInForm from '../SignIn/SignInForm';
// import {
//   Container,
//   Row,
//   Col,
//   Jumbotron,
//   Button,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Card,
//   CardHeader,
//   CardBody,
//   FormFeedback,
//   FormText
// } from 'reactstrap';

class Home extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className="row justify-content-center">
        <SignInForm />
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundImage: `url('/assets/img/jumbo.jpg')`,
    padding: '10%'
  },
  form: {
    margin: '5% 25% 5% 25%'
  },
  cardHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '24px'
  }
};
export default Home;