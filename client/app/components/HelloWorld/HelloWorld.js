import React, { Component } from 'react';
import SignUpForm from '../SignUp/SignUpForm';
import { userSignUpRequest } from '../../../actions/signUpActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   Container,
//   Row,
//   Col,
//   Jumbotron,
//   Button
// } from 'reactstrap';

class HelloWorld extends Component {
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
    const { userSignUpRequest } = this.props
    return (
      <div className="row justify-content-center">
        <SignUpForm userSignUpRequest={userSignUpRequest}/>
      </div>
      // <div>
      //   <Jumbotron>
      //     <Container>
      //       <Row>
      //         <Col>
      //           <h1>Welcome to React</h1>
      //           <p>
      //             <Button
      //               tag="a"
      //               color="success"
      //               size="large"
      //               href="http://reactstrap.github.io"
      //               target="_blank"
      //             >
      //               View Reactstrap Docs
      //                               </Button>
      //           </p>
      //         </Col>
      //       </Row>
      //     </Container>
      //   </Jumbotron>
      // </div>
    );
  }
}

HelloWorld.propTypes = {
  userSignUpRequest: PropTypes.func.isRequired
}

export default connect(null, { userSignUpRequest }) (HelloWorld);