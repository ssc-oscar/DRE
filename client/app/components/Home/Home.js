import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
  CardBody,
  FormFeedback,
  FormText
} from 'reactstrap';

class Home extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <>
        <div>
          <Jumbotron style={styles.container}>
            <Container>
              <Row>
                <Col>
                  <h1>Welcome to WoC Querying</h1>
                  <p>
                    <Button
                      tag="a"
                      color="info"
                      size="large"
                      href="http://reactstrap.github.io"
                      target="_blank"
                    >
                      View Documentation
                                    </Button>
                  </p>
                </Col>
              </Row>
            </Container>
          </Jumbotron>
        </div>
        <div style={styles.form}>
          <Card>
            <CardHeader style={styles.cardHeader}>Your Information</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="fname" sm={3}>First Name</Label>
                  <Col sm={9}>
                    <Input type="text" name="fname" id="fname" placeholder="" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="lname" sm={3}>Last Name</Label>
                  <Col sm={9}>
                    <Input type="text" name="lname" id="lname" placeholder="" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="email" sm={3}>Email</Label>
                  <Col sm={9}>
                    <Input type="email" name="email" id="email" placeholder="" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="ghid" sm={3}>Github ID</Label>
                  <Col sm={9}>
                    <Input type="text" name="ghid" id="ghid" placeholder="" />
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </div>
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
    fontSize: '24px'
  }
};
export default Home;