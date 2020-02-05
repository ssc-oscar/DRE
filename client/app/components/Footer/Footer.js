import React from "react";
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                  © 2020{" "}
                  <a
                    className="font-weight-bold ml-1"
                    href="/"
                    target="_blank"
                  >
                    World of Code
                  </a>
                </div>
              </Col>
              <Col xl="6">
                <Nav className="nav-footer justify-content-center justify-content-xl-end">
                  <NavItem>
                    <NavLink
                      href="https://github.com/ssc-oscar"
                      target="_blank"
                    >
                      <i className="fa fa-code-branch"></i>
                      <span className="font-weight-bold ml-1">Github</span>
                    </NavLink>
                  </NavItem>
	    {/*<NavItem>
                    <NavLink
                      href="https://logomakr.com/9enqqM"
                      target="_blank"
                    >
                      <span>Logo Credit</span>
                    </NavLink>
                  </NavItem>*/}
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Footer;
