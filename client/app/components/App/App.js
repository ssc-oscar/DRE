import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import {withRouter} from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FlashMessagesList from '../flash/FlashMessagesList';
import Headers from '../common/Headers.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: this.props.children
    }
  }
  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  render() {
    return (
      <>
        <div className="main-content">
          <Header />
          <div className="header bg-gradient-success py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-5">
                <Row className="justify-content-center">
                  <Col lg="8" md="9">
                    <h1 className="text-white">{Headers[this.props.location.pathname].title}</h1>
                    <p className="text-secondary">
                      {Headers[this.props.location.pathname].blurb}
                    </p>
                  </Col>
                </Row>
              </div>
            </Container>
            {this.props.location.pathname != '/dash' &&
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
            }
            </div>
            <Container className="mt--8 pb-5">
              {this.state.children}
            </Container>
        </div>
        <Footer />
      </>
    )
  }
}

export default withRouter(App);
