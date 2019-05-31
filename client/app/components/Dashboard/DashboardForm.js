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
import isEmpty from 'lodash/isEmpty';
import { Graph } from 'react-d3-graph';

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
    let data = {
      nodes: [
        {
          id: 'Andrey <akarnauc@vols.utk.edu>',
          x: 25,
          y: 25,
          color: "rgb(244, 117, 96)"
        },
        {
          id: 'Paul Preston Provins <34664319+3PIV@users.noreply.github.com>',
          x: 25,
          y: 100,
          color: "rgb(97, 205, 187)"
        },
        {
          id: 'Florian Larysch <fl@n621.de>',
          x: 25,
          y: 200,
          color: "rgb(97, 205, 187)"
        },
        {
          id: 'Linus Torvalds <torvalds@athlon.transmeta.com>',
          x: 50,
          y: 300,
          color: "rgb(244, 117, 96)"
        }
      ],
      links: [
        {
          source: 'Andrey <akarnauc@vols.utk.edu>',
          target: 'Paul Preston Provins <34664319+3PIV@users.noreply.github.com>',
          label: 'fdac18_Miniproject3'
        },
        {
          source: 'Paul Preston Provins <34664319+3PIV@users.noreply.github.com>',
          target: 'Florian Larysch <fl@n621.de>',
          label: 'neovim_neovim'
        },
        {
          source: 'Florian Larysch <fl@n621.de>',
          target: 'Linus Torvalds <torvalds@athlon.transmeta.com>',
          label: 'Tomoms_kernel_laptop'
        }
      ]
    }
    const myConfig = {
      "automaticRearrangeAfterDropNode": false,
      "collapsible": false,
      "directed": false,
      "focusAnimationDuration": 0.75,
      "focusZoom": 1,
      "height": 500,
      "highlightDegree": 1,
      "highlightOpacity": 0.2,
      "linkHighlightBehavior": true,
      "maxZoom": 1.2,
      "minZoom": 1,
      "nodeHighlightBehavior": true,
      "panAndZoom": false,
      "staticGraph": true,
      "width": "",
      "d3": {
        "alphaTarget": 0.05,
        "gravity": -100,
        "linkLength": 100,
        "linkStrength": 1
      },
      "node": {
        "color": "#d3d3d3",
        "fontColor": "black",
        "fontSize": 12,
        "fontWeight": "normal",
        "highlightColor": "SAME",
        "highlightFontSize": 12,
        "highlightFontWeight": "bold",
        "highlightStrokeColor": "SAME",
        "highlightStrokeWidth": 1.5,
        "labelProperty": "name",
        "mouseCursor": "pointer",
        "opacity": 1,
        "renderLabel": true,
        "size": 450,
        "strokeColor": "none",
        "strokeWidth": 1.5,
        "svg": "",
        "symbolType": "circle"
      },
      "link": {
        "color": "#d3d3d3",
        "fontColor": "black",
        "fontSize": 8,
        "fontWeight": "normal",
        "highlightColor": "rgb(232, 193, 160)",
        "highlightFontSize": 8,
        "highlightFontWeight": "normal",
        "labelProperty": "label",
        "mouseCursor": "pointer",
        "opacity": 1,
        "renderLabel": false,
        "semanticStrokeWidth": false,
        "strokeWidth": 4
      }
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
            <Col md="6" className="mt-4 mb-4">
              <Card className="shadow pr-0">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Torvald's Index</h3>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody style={styles.body} className="text-center">
                  <Graph
                    id="tridx"
                    data={data}
                    config={myConfig}
                  />
                </CardBody>
              </Card>
            </Col>
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