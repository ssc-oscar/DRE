import React, { Component } from 'react';
import{
	Container,
	Row,
	Col,
	Card,
	Table
} from "reactstrap";

class BuildResultTable extends Component{
	constructor(props){
		super(props);

		this.state = {
			data: [],
			type: ''
		}
	}

	/*componentDidMount(){
		this.setState({data: this.props.data, type: this.props.type})
	}
	*/

	render() {
		return (
			<div>
			  <Card>
			    <Row>
			      <Col>
			        Test
			      </Col>
			    </Row>
			  </Card>
			</div>
		)
	}


}

export default BuildResultTable;
