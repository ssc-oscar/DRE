import React from "react";

// reactstrap components
import DashboardStatCard from '../common/DashboardStatCard';
import { Container, Row, Col } from "reactstrap";

class DashboardHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.stats
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextprops', nextProps);
    if (this.props != nextProps) {
      this.setState({ ...nextProps.stats });
    }
  }

  render() {
    return (
      <>
        <div className="header mb-5 pt-0">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col>
                  <DashboardStatCard
                  title="Commits"
                  stat={this.state.NCommits}
                  icon="fa fa-code-branch"
                  color="bg-danger"
                  blurb="Total # of commits you have made"
                  />
                </Col>
                <Col>
                  <DashboardStatCard
                  title="Projects"
                  stat={this.state.NProjects}
                  icon="far fa-folder"
                  color="bg-info"
                  blurb="Total # of projects you have worked on"
                  />
                </Col>
                <Col>
                  <DashboardStatCard
                  title="Friends"
                  stat={this.state.NFriends}
                  icon="fas fa-user-friends"
                  color="bg-warning"
                  blurb="Total # of people you have collaborated with"
                  />
                </Col>
                <Col>
                  <DashboardStatCard
                  title="Files"
                  stat={this.state.NFiles}
                  icon="far fa-file-code"
                  color="bg-success"
                  blurb="Total # of files you have modified"
                  />
                </Col>
                {/* <Col>
                  <DashboardStatCard
                  title="Files"
                  stat={this.state.NBlobs}
                  icon="far fa-file-code"
                  color="bg-success"
                  blurb="Total # of blobs you have modified"
                  />
                </Col> */}
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default DashboardHeader;
