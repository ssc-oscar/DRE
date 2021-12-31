import React, { Component } from 'react';
// import { FilterableContent } from 'react-filterable-content';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import {
  Input,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

class LocateProfilesForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      keyword: '',
      data: []
    }  
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(event) {
    if (event && event.target) {
      const { value } = event.target;
      this.setState({keyword:value});
    }
  }

  onClick(e, id) {
    e.preventDefault();
    this.props.history.push(`/dash?user=${id}`);
  }

  buildUser(user, dataGroup){
    let first = user.searchParams.fname.toLowerCase()
                                        .split(' ')
                                        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                        .join(' ');
    let last = user.searchParams.lname.toLowerCase()
                                      .split(' ')
                                      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                      .join(' ');
    let name = first + ' ' + last;
    return(
      <ListGroupItem
        tag="a"
        href="#"
        action
        filterable-group='true'
        key={user._id}
        onClick={(e) => this.onClick(e, user._id)}>
          <ListGroupItemHeading>{user.email}</ListGroupItemHeading>
          <ListGroupItemText>{name}</ListGroupItemText>
      </ListGroupItem>
    )
  }

  componentDidMount() {
    this.renderUsers();
  }

  renderUsers(){
    let result = []

    this.props.getAllUsers()
    .then((users) => {
      users.data.forEach(user => {
        result.push(this.buildUser(user, 1))
      })
      this.setState({ data: result });
    },
    (err) => { console.log(err) }
    );

    // contactData1.forEach(  contact =>{
    //   result.push(this.buildUser(contact, 1))
    // });
  }

  render () {
    let { keyword } = this.state;

    return (
      <Container fluid>
        <h2>List Of Contact</h2>
        <InputGroup>
          <Input
            className={'mb-2 mt-0'}
            type={'text'}
            value={keyword}
            placeholder={'Search for a developer'}
            onChange={this.onChange}
          />
        </InputGroup>        
        <Row>
          <Col>
            <FilterableContent keyword={keyword}>
              <ListGroup>
                {this.state.data}
              </ListGroup>
            </FilterableContent>
          </Col>
        </Row>
      </Container>
    )
  }
}

LocateProfilesForm.propTypes = {
}

function mapStateToProps(state) {
  return {
    
  };
}

export default connect(mapStateToProps, {})(withRouter(LocateProfilesForm));
