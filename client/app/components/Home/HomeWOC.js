import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { 
  Row, 
  Card, 
  CardHeader, 
  ListGroup, 
  ListGroupItem 
} from "reactstrap";

// decodeURIComponent(%40article %7B ma2021world,  title%22%7BWorld of code: Enabling a research workflow for mining and analyzing the universe of open source vcs data%7D, author%22%7BMa, Yuxing and Dey, Tapajit and Bogart, Chris and Amreen, Sadika and Valiev, Marat and Tutko, Adam and Kennard, David and Zaretzki, Russell and Mockus, Audris%7D, journal%22%7BEmpirical Software Engineering%7D, volume%2226,  number%222, pages%22%7B1--42%7D,  year%222021, publisher%22Springer%7D</a>
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
            <p>How to use/cite World of Code:</p>
            <ListGroup>
            <ListGroupItem> <a href="https://github.com/woc-hack/tutorial">Tutorial</a></ListGroupItem>	    
            <ListGroupItem> <a href="http://bit.ly/WoCSignup">Sign up to use WoC/participate in upcoming WoC hackathons</a></ListGroupItem>
	    <ListGroupItem> <a href="https://bitbucket.org/swsc/overview/src/master/README.md">General WoC infrastructure overview</a> </ListGroupItem>
            <ListGroupItem> <a href="https://bitbucket.org/swsc/lookup/src/master/README.md">More details on WoC APIs</a> </ListGroupItem>
            <ListGroupItem> <a href="https://bitbucket.org/swsc/overview/src/master/fun/README.md">Fun facts about some crazy competitions among git repositories</a> </ListGroupItem>
            <ListGroupItem>
            <a href="https://bitbucket.org/swsc/overview/raw/master/pubs/WoC.pdf">WoC Cite: 
            '@article ma2021world,  title="World of code: Enabling a research workflow for mining and analyzing the universe of open source vcs data", author="Ma, Yuxing and Dey, Tapajit and Bogart, Chris and Amreen, Sadika and Valiev, Marat and Tutko, Adam and Kennard, David and Zaretzki, Russell and Mockus, Audris", journal="Empirical Software Engineering", volume=26,  number=2, pages="1--42",  year=2021, publisher=Springer'</a></ListGroupItem>
	    <ListGroupItem>   <a href="https://github.com/woc-hack/tutorial/blob/master/LICENSE">License</a>  </ListGroupItem>
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
