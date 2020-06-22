import React, { Component } from 'react';
import { FilterableContent } from 'react-filterable-content';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
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
	Input,
	ListGroup,
	ListGroupItem,
	ListGroupItemHeading,
	ListGroupItemText,
	InputGroup,
	Container,
	Row,
	Col,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter
} from "reactstrap";
class LookupSearch extends Component {
	constructor(props){
		super(props);
		this.state = { 
			sha: '',
			data: [],
			lookup: false
		}
		this.onKeyUp = this.onKeyUp.bind(this);
	}

	onKeyUp(event) {
		if (event.key === 'Enter') {
			const { value } = event.target;
			this.setState({
				sha:value,
				lookup:true	
			});
		}
	}

	componentDidUpdate() {

	}


	render() {
		let { sha } = this.state.sha;
		if(!this.state.lookup) {

			return (
				<Container fluid>
				  <InputGroup>
				    <Input
				      className={'mb-2 mt-0'}
				      type={'text'}
				      placeholder={'Search SHA1'}
				      onKeyUp={this.onKeyUp}
				    />
				  </InputGroup>        
				</Container>
			)
		}
		else {

			return (
				<>
				  <Container className="mt-4" fluid>
				    <Row>
				      <Col className="mb-2">
				        <h2 className="text-center">{ this.state.data }</h2>
				      </Col>
				    </Row>
				  </Container>
				</>

			)
		}
	}
}

export default withRouter(LookupSearch);
