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
      complete: false,
      showFriend: false,
      showBlob: false,
      publicView: false,
      friend: {
        id: '',
        projects: []
      },
      blobCnt: ''
    }
    this.listAuthors = this.listAuthors.bind(this);
    this.toggleFriend = this.toggleFriend.bind(this);
    this.onClickFriend = this.onClickFriend.bind(this);
    this.toggleBlob = this.toggleBlob.bind(this);
    this.onClickBlob = this.onClickBlob.bind(this);
    this.setupTorvalds = this.setupTorvalds.bind(this);
  }

  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let publicUser = params.get('user');
    let userId = '';
    
    // determine if we are showing a public dashboard or private
    if (!publicUser) {
      userId = this.state.user.id;      
    }
    else if (publicUser == this.state.user.id) {
      userId = this.state.user.id;
    }
    else {
      userId = publicUser;
      this.setState({ publicView: true });
    }

    this.props.getProfile(userId)
    .then((rv) => {
      if (rv.data) {
        let complete = true;

        for (let key in rv.data) {
          if (isEmpty(rv.data[key])) {
            complete = false;
            break;
          }
        }

        this.setState({
          user: this.props.auth.user,
          profile: rv.data,
          ready: true,
          complete: complete
        })
      }
      else {
        this.setState({
          user: this.props.auth.user,
          profile: {},
          complete: false,
          ready: true
        })
      }
    });
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

  onClickBlob(sha1) {
    this.toggleBlob();
    this.props.lookupSha(sha1, "blob", "showCnt")
    .then((res) => {
      this.setState({ blobCnt: res.data.stdout });
    });
  }

  toggleBlob() {
    this.setState({ showBlob: !this.state.showBlob });
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
    console.log(this.state.profile.projects);
    if (!this.state.ready) {
      return <div />
    }
    return (
      <>
      {/* {isEmpty(this.state.profile) &&
        <Container className="mt-4" fluid>
          <Row>
            <Col className="mb-2">
              <h2 className="text-center">Please wait while we populate the rest of your dashboard...</h2>
            </Col>
          </Row>
          <div className="text-center">
            <Button onClick={this.listAuthors}>Back to Search</Button>
          </div>
        </Container>
      } */}
        <Container className="mt-4" fluid>
          {!this.state.complete &&
            <Row>
              <Col className="mb-2">
                <h2 className="text-center">Please wait while we populate the rest of your dashboard...</h2>
              </Col>
            </Row>
          }
          {!isEmpty(this.state.friend) &&
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
          }
          {!isEmpty(this.state.blobCnt) &&
          <Modal centered={true} isOpen={this.state.showBlob} size="lg" fade={false} toggle={this.toggleBlob} style={{maxWidth: '80%'}}>
            <ModalHeader className="pb-0 mb-0" toggle={this.toggleBlob}>
              {<p style={{'fontSize': '24px'}}>Blob content</p>}
            </ModalHeader>
            <ModalBody style={{whiteSpace: 'pre-wrap', maxHeight: 'calc(100vh - 210px)', overflowY: 'auto'}} >{this.state.blobCnt}</ModalBody>
            <ModalFooter>
              <Button variant="primary" onClick={this.toggleBlob}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
          }
          {!isEmpty(this.state.profile.stats) && <DashboardHeader stats={this.state.profile.stats}/>}
          <Row>
            <Col md="6">
              {!isEmpty(this.state.profile.projects) &&
                <ProjStatTable
                stats={this.state.profile.projects}
                headers={['Project Name', 'Your Commits', 'Total Commits']}
                title="Your Projects"/>
              }
            </Col>
            <Col md="6">
              {!isEmpty(this.state.profile.files) &&
                <LanguageChart stats={this.state.profile.files}/>
              }
            </Col>
          </Row>
          <Row>
            <Col md="6" className="mt-4 mb-4">
              {!isEmpty(this.state.profile.friends) &&
                <FriendStatTable
                onClickFriend={this.onClickFriend}
                stats={this.state.profile.friends}
                headers={['Friend']}
                title="Your Collaborators"
                />
              }
            </Col>
            <Col md="6" className="mt-4 mb-4">
              {!isEmpty(this.state.profile.tridx) && !isEmpty(this.state.profile.tridx.path) &&
                <TorvaldsGraph stats={this.state.profile.tridx} />
              }  
            </Col>
          </Row>
          <Row className="justify-content-center align-items-center">
            <Col md="8">
              {!isEmpty(this.state.profile.blobs) &&
               <ProjStatTable
                  onClickBlob={this.onClickBlob}
                  stats={this.state.profile.blobs}
                  headers={['Blob SHA', 'Duplications', 'ChildCommits', 'Users' ]}
                  title="Your Blobs"/>
              }
            </Col>
          </Row>
          {!this.state.publicView &&
            <Row>
              <Col md="6" className="text-center mt-5">
                <Button onClick={this.listAuthors}>Back to Search</Button>
              </Col>
              <Col md="6" className="text-center mt-5">
                <Button onClick={() => this.props.history.push('/upload')}>Upload Author IDs</Button>
              </Col>
            </Row>
          }
        </Container>
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
