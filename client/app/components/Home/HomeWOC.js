import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardHeader, ListGroup, ListGroupItem } from "reactstrap";
import PropTypes from 'prop-types';

class HomeWOC extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Row className="justify-content-center">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent">
                  <p>Listed below are some additional resources about the World of Code dataset</p>
                  <ListGroup>
                    <ListGroupItem>
                      <a href="https://github.com/woc-hack/tutorial">How to access and use the WoC dataset and APIs</a>
                    </ListGroupItem>
                    <ListGroupItem>
                      <a href="https://bitbucket.org/swsc/lookup/src/master/README.md">Details on WoC storage and the APIs</a>
                    </ListGroupItem>
                    <ListGroupItem>
                      <a href="https://bitbucket.org/swsc/overview/src/master/README.md">Overview of the Software Supply Chains</a>
                    </ListGroupItem>
                    <ListGroupItem>
                      <a href="https://bitbucket.org/swsc/overview/raw/master/pubs/WoC.pdf">Original paper</a>
                    </ListGroupItem>
                    <ListGroupItem>
                      <a href="https://bitbucket.org/swsc/overview/src/master/fun/README.md">Fun Facts</a>
                    </ListGroupItem>
                  </ListGroup>
              </CardHeader>
            </Card>
        </Row>
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

export default connect(null, { })(withRouter(HomeWOC));
