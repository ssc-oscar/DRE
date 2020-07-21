import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import { withRouter } from "react-router-dom";
import { styles } from '../common/styles';
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	Table,
	FilterableContent,
	ListGroup
} from "reactstrap";

class BuildResultTable extends Component{
	constructor(props){
		super(props);

		this.state = {
			data: [],
			type: ''
		}
	}

	componentDidMount(){
		this.setState({data: this.props.data, type: this.props.type})
	}
	
	generateTable(type, data) {
		if(type == 'commit'){
			let c = data[0];
			let tree = data[1];
			let p = data[2];
			let author = data[3];
			let a_time = data[5];
			let committer = data[4];
			let c_time = data[6];	
			return (
				   <>
				    <tr>
				      <td>Commit:</td>
				      <td>{c}</td>
				    </tr>
				    <tr>
				      <td>Tree:</td>
				      <td>{tree}</td>
				    </tr>
				    <tr>
				      <td>Parent:</td>
				      <td>{p}</td>
				    </tr>
				    <tr>
				      <td>Author:</td>
				      <td>{author}</td>
				    </tr>
				    <tr>
				      <td>Author Time:</td>
				      <td>{a_time}</td>
				    </tr>
				    <tr>
				      <td>Committer:</td>
				      <td>{committer}</td>
				    </tr>
				    <tr>
				      <td>Commit Time:</td>
				      <td>{c_time}</td>
				    </tr>
				   </>
			)
		}
		else if(type == 'tree'){
			var i, j;
			let table_rows = []
			for (i = 0, j=0; i < data.length; i+=3, j++) {
				let row = [];
				row['id'] = j;
				row['mode'] = data[i];
				row['blob'] = data[i+1];
				row['filename'] = data[i+2];
				table_rows.push(row);
			}
			return table_rows.map((result, index) => {
				const { id, mode, blob, filename } = result
				return (
						<tr key={id}>
						  <td>{mode}</td>
						  <td>{blob}</td>
						  <td>{filename}</td>
						</tr>
				)
			})
		}
		else if(type == 'blob'){
			return data.split("\n").map((i,key) => {
				return <tr key={key}>{i}</tr>;
			})
		}
	}

	render() {
		const { data } = this.state;
		const { type } = this.state;
		console.log(data, type);
		console.log(typeof(data));
		return (
			<div>
			  <Card className="bg-secondary shadow border-0">
			    <CardBody>
			      <Table style={styles.table} className="align-items-center table-flush" responsive>
			        <tbody>
			      {this.generateTable(type,data)}
			        </tbody>
		              </Table>
			    </CardBody>
			  </Card>
			</div>
		)
	}
}

BuildResultTable.propTypes = {
}

export default withRouter(BuildResultTable);
