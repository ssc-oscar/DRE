import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import { withRouter, Router } from "react-router-dom";
import { connect } from 'react-redux';
import { styles } from '../common/styles';
import queryString from 'query-string';
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	Table,
	FilterableContent,
	ListGroup,
	ListGroupItem
} from "reactstrap";


class BuildResultTable extends Component{
	constructor(props){
		super(props);

		this.state = {
			data: [],
			type: '',
			sha: ''
		}

		this.onClick = this.onClick.bind(this);
	}

	componentDidMount(){
		this.setState({
			data: this.props.data,
			type: this.props.type,
			sha: this.props.sha
		})
	}

	onClick(e,type,sha){
		e.preventDefault();
		let search = window.location.search;
		let params = new URLSearchParams(search);
		let sha1 = params.get('sha1');
		let type2 = params.get('type');
		console.log(sha1, type2);

		this.props.lookupSha(sha, type)
			.then( (response) => {
				let result = response.data.stdout;
				let stderr = response.data.stderr;
				let data = [];
				console.log(stderr);
				if (type == "blob") {
					data = result;
					console.log(data);
				}
				else {
					data = result.split(/;|\r|\n/);
					console.log(data);
				}
				this.props.history.push(`/lookupresult?sha1=${sha}&type=${type}` , {
					data: this.state.data,
					type: this.state.type,
					sha: this.state.sha
				})
				this.setState({
					data: data,
					type: type,
					sha: sha
				});		
			});
	}

	generateTable(type, data) {
		if(type == 'commit'){
			let c = data[0];
			let key = c._id;
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
				      <td><a href="#" onClick={(e) => this.onClick(e,"commit",c)}>{c}</a></td>
				    </tr>
				    <tr>
				      <td>Tree:</td>
				      <td><a href="#" onClick={(e) => this.onClick(e,"tree",tree)}>{tree}</a></td>
				    </tr>
				    <tr>
				      <td>Parent:</td>
				      <td><a href="#" onClick={(e) => this.onClick(e,"commit",p)}>{p}</a></td>
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
					  <td><a href="#" 
						onClick={(e) => this.onClick(e,"blob",blob)}>
					      {blob}</a></td>
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

function mapStateToProps(state) {
	return {

	};
}

export default connect(mapStateToProps, {})(withRouter(BuildResultTable));
