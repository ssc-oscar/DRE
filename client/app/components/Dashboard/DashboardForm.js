import React from 'react';
import ReactDOM from 'react-dom';
import DashboardHeader from './DashboardHeader';
import ProjStatTable from '../common/ProjStatTable';
import FriendStatTable from '../common/FriendStatTable';
import LanguageChart from './LanguageChart';
import TorvaldsGraph from './TorvaldsGraph';
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";

class DashboardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.auth.user,
      profile: {},
      ready: false,
      showFriend: false,
      friend: {
        id: '',
        projects: []
      }
    }
    this.listAuthors = this.listAuthors.bind(this);
    this.toggleFriend = this.toggleFriend.bind(this);
    this.onClickFriend = this.onClickFriend.bind(this);
    this.setupTorvalds = this.setupTorvalds.bind(this);
  }

  componentDidMount() {
    // this.props.getProfile(this.state.user.id)
    this.props.getUser(this.state.user.id)
    .then(() => {
      this.props.getProfile(this.state.user.id)
      .then((rv) => {
        if (rv.data) {
          this.setState({
            user: this.props.auth.user,
            profile: rv.data,
            ready: true
          })
        }
        else {
          this.setState({
            user: this.props.auth.user,
            profile: {},
            ready: true
          })
        }
      });
    })
  }

  setupTorvalds(tridx) {

  }

  onClickFriend(friend) {
    this.toggleFriend();
    this.setState({ friend: friend }, () => {});
  }

  toggleFriend() {
    this.setState({ showFriend: !this.state.showFriend });
  }

  listAuthors() {
    let { omittedIds, selectedIds, suggestedIds } = this.state.user

    selectedIds = selectedIds.map(a => { a.active = true; return a; });
    omittedIds = omittedIds.map(a => { a.active = false; return a; });
    suggestedIds = suggestedIds.map(a => { a.active = false; return a; });

    this.props.history.push('/select', {
      authors: [...selectedIds, ...omittedIds, ...suggestedIds],
      warning: '',
      error: false });
  }
  

  render() {
    if (!this.state.ready) {
      return <div />
    }
    return (
      <>
      {isEmpty(this.state.profile) ?
        <Container className="mt-4" fluid>
          <Row>
            <Col className="mb-2">
              <h2 className="text-center">Please wait while we populate your dashboard...</h2>
            </Col>
          </Row>
          <div className="text-center">
            <Button onClick={this.listAuthors}>Back to Search</Button>
          </div>
        </Container>
      :
        <Container className="mt-4" fluid>
          <Modal centered={true} isOpen={this.state.showFriend} size="lg" fade={false} toggle={this.toggleFriend}>
            <ModalHeader className="pb-0 mb-0" toggle={this.toggleFriend}>
              {<p style={{'fontSize': '24px'}}>{this.state.friend.id}</p>}
            </ModalHeader>
            <ModalBody>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Project Name</th>
                  <th scope="col">Their Commits</th>
                  <th scope="col">Total Project Collaborators</th>
                </tr>
              </thead>
              <tbody>
                {this.state.friend.projects.sort((a,b) => b.nc - a.nc)
                .map((proj, index) => {
                  const { name, nAuth, nc } = proj
                  return (
                      <tr key={index}>
                        <th scope="row">{name}</th>
                        <td>{nc}</td>
                        <td>{nAuth}</td>
                      </tr>
                  )
                })}
              </tbody>
            </Table>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggleFriend}>Close</Button>
            </ModalFooter>
          </Modal>
          <DashboardHeader stats={this.state.profile.stats}/>
          <Row>
            <Col md="6">
              <ProjStatTable
              stats={this.state.profile.projects}
              headers={['Project Name', 'Your Commits', 'Total Commits']}
              title="Your Projects"/>
            </Col>
            <Col md="6">
              <LanguageChart stats={this.state.profile.files}/>
            </Col>
          </Row>
          <Row>
            <Col md="6" className="mt-4 mb-4">
              <FriendStatTable
              onClickFriend={this.onClickFriend}
              stats={this.state.profile.friends}
              headers={['Friend']}
              title="Your Collaborators"
              />
            </Col>
            {!isEmpty(this.state.profile.tridx) &&
            <Col md="6" className="mt-4 mb-4">
              <TorvaldsGraph stats={this.state.profile.tridx} />
            </Col>
            }
          </Row>
          <div className="text-center">
            <Button onClick={this.listAuthors}>Back to Search</Button>
          </div>
        </Container>
      }
      </>
    );
  }
}

const styles = {
  body: {
    height: '500px',
    width: '500px'
  }
}

DashboardForm.propTypes = {
  auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {})(withRouter(DashboardForm));