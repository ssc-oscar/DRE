import React, { Component } from 'react';
import SignInForm from '../SignIn/SignInForm';
import SignUpForm from '../SignUp/SignUpForm';
import { userSignUpRequest, getAuthors } from '../../../actions/signUpActions';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardHeader } from "reactstrap";
import { addFlashMessage } from '../../../actions/flashMessages';
import PropTypes from 'prop-types';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLogin: false,
      isLoading: true,
      isSignUp: true
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    this.setState({ isLoading: false });
  }

  componentWillReceiveProps(nextProps){
    this.toggle(nextProps.location.form);
  }

  toggle(type) {
    if (type == "signup") {
      this.setState({ isSignUp: true, isLogin: false});
    }
    else {
      this.setState({ isSignUp: false, isLogin: true});
    }
  }

  render() {
    const { userSignUpRequest, getAuthors, addFlashMessage } = this.props
    return (
      <>
      {!this.state.isLoading &&
        <Row className="justify-content-center">
          <Col xs="6">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent">
                <Row>
                  <Col xs="6" className="border-right">
                    <p id="signupButton"
                      onClick={() => this.toggle("signup")}
                      style={styles.cardHeader}
                      className={this.state.isSignUp ? "bg-transparent text-primary" : "bg-transparent text-light"}>
                      Sign Up
                    </p>
                  </Col>
                  <Col xs="6" className="border-left">
                    <p id="loginButton"
                      onClick={() => this.toggle("login")}
                      style={styles.cardHeader}
                      className={this.state.isLogin ? "bg-transparent text-primary" : "bg-transparent text-light"}>
                      Login
                    </p>
                  </Col>
                </Row>
                {/* <div className="text-center mt-2">
                  <h1>Sign up with credentials</h1>
                </div> */}
              </CardHeader>
              {this.state.isLogin ? <SignInForm /> : <SignUpForm getAuthors={getAuthors} userSignUpRequest={userSignUpRequest} addFlashMessage={addFlashMessage} />}
            </Card>
          </Col>
        </Row>
      }
      </>
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
    fontSize: '24px',
    cursor: 'pointer',
    padding: 0,
    margin: 0
  }
};

Home.propTypes = {
  userSignUpRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  getAuthors: PropTypes.func.isRequired
}

export default connect(null, { userSignUpRequest, addFlashMessage, getAuthors }) (Home);