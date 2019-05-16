import React from 'react';
import ReactDOM from 'react-dom';
import DashboardHeader from './DashboardHeader';
import ProjStatTable from '../common/ProjStatTable';
import FriendStatTable from '../common/FriendStatTable';
import LanguageChart from './LanguageChart';
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      showFriend: false,
      friend: {
        id: '',
        projects: []
      }
    }
    this.listAuthors = this.listAuthors.bind(this);
    this.toggleFriend = this.toggleFriend.bind(this);
    this.onClickFriend = this.onClickFriend.bind(this);
  }

  componentDidMount() {
    // this.props.getProfile(this.state.user.id)
    this.props.getUser(this.state.user.id)
    .then(() => {
      this.props.getProfile(this.state.user.id)
      .then((rv) => {
        this.setState({
          user: this.props.auth.user,
          profile: rv.data
        })
      });
    })
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
    return (
      <>
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
          </Row>
          
          {/* <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <DashboardLanguage/>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Total orders</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  Chart
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Page visits</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Page name</th>
                      <th scope="col">Visitors</th>
                      <th scope="col">Unique users</th>
                      <th scope="col">Bounce rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">entry</th>
                      <td>4,569</td>
                      <td>340</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">entry</th>
                      <td>3,985</td>
                      <td>319</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">entry</th>
                      <td>3,513</td>
                      <td>294</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        36,49%
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Social traffic</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Referral</th>
                      <th scope="col">Visitors</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>1,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-gradient-danger"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>5,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">70%</span>
                          <div>
                            <Progress
                              max="100"
                              value="70"
                              barClassName="bg-gradient-success"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Google</th>
                      <td>4,807</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">80%</span>
                          <div>
                            <Progress max="100" value="80" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Instagram</th>
                      <td>3,678</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">75%</span>
                          <div>
                            <Progress
                              max="100"
                              value="75"
                              barClassName="bg-gradient-info"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">twitter</th>
                      <td>2,645</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">30%</span>
                          <div>
                            <Progress
                              max="100"
                              value="30"
                              barClassName="bg-gradient-warning"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>*/}
          <div className="text-center">
            <Button onClick={this.listAuthors}>Back to Search</Button>
          </div>
        </Container>
      </>
    );
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