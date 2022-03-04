import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";
import { connect } from 'react-redux';
import { logout } from '../../../actions/signUpActions';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: this.props.auth.isAuthenticated
    }
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  static getDerivedStateFromProps(props, state) {
    return(
      state.isAuthenticated = props.auth.isAuthenticated
    )
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    const { isAuthenticated } = this.state;

    const userLinks = (
      <>
	    <NavItem>
          <NavLink
            className="nav-link-icon"
            to={"/sampling"}
            tag={Link}>
            <i className="fas fa-vial" />
            <span className="nav-link-inner--text">Sampling</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="nav-link-icon"
            to={"/clickhouse"}
            tag={Link}>
            <i className="fa fa-mouse-pointer" />
            <span className="nav-link-inner--text">Clickhouse</span>
          </NavLink>
        </NavItem>
	    <NavItem>
          <NavLink
            className="nav-link-icon"
            to={"/fastgraph"}
            tag={Link}>
            <i className="fas fa-project-diagram" />
            <span className="nav-link-inner--text">FastGraph</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="nav-link-icon"
            to={"/mapping"}
            tag={Link}>
            <i className="fas fa-map" />
            <span className="nav-link-inner--text">Mappings</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="nav-link-icon"
            to={"/lookup"}
            tag={Link}>
            <i className="fa fa-database" />
            <span className="nav-link-inner--text">Lookup Search</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="nav-link-icon"
            to={"/vulnerability"}
            tag={Link}>
            <i className="fa fa-database" />
            <span className="nav-link-inner--text">Vulnerability Search</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="nav-link-icon"
            to={"/locate"}
            tag={Link}>
            <i className="ni ni-planet" />
            <span className="nav-link-inner--text">Search Profiles</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" onClick={this.logout}>Logout</NavLink>
        </NavItem>
      </>
    )

    const guestLinks = (
      <>
	    <NavItem>
          <NavLink
            className="nav-link-icon"
            to={"/sampling"}
            tag={Link}>
            <i className="fas fa-vial" />
            <span className="nav-link-inner--text">Sampling</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="nav-link-icon"
            to={"/mapping"}
            tag={Link}>
            <i className="fas fa-map" />
            <span className="nav-link-inner--text">Mappings</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="nav-link-icon"
            to={"/lookup"}
            tag={Link}>
            <i className="fa fa-database" />
            <span className="nav-link-inner--text">Lookup Search</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="nav-link-icon"
            to={"/vulnerability"}
            tag={Link}>
            <i className="fa fa-database" />
            <span className="nav-link-inner--text">Vulnerability Search</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="nav-link-icon"
            to={"/locate"}
            tag={Link}>
            <i className="ni ni-planet" />
            <span className="nav-link-inner--text">Search Profiles</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="nav-link-icon"
            to={{pathname: "/DRE", form: "signup"}}
            tag={Link}>
            <i className="ni ni-circle-08" />
            <span className="nav-link-inner--text">Register</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="nav-link-icon"
            to={{pathname: "/DRE", form: "login"}}
            tag={Link}>
            <i className="ni ni-key-25" />
            <span className="nav-link-inner--text">Login</span>
          </NavLink>
        </NavItem>
      </>
    );

    return (
      <>
        <Navbar
          className="navbar-top navbar-horizontal navbar-dark"
          expand="md"
        >
          <Container className="px-4">
            <NavbarBrand
              to='/'
              tag={Link}>
              <img alt="..." src={require("../../../public/assets/img/woc.png")} />
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar-collapse-main">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <Nav className="ml-auto" navbar>
                { isAuthenticated ? userLinks : guestLinks }
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

/* This causes routing errors now. Not sure how to fix yet. Excluding doesn't break site
Header.contextTypes = {
  router: PropTypes.object.isRequired
}
*/

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(withRouter(Header));
