import PropTypes from 'prop-types';
import React, { useEffect, useState, Component } from 'react';
import ReactDOM from 'react-dom';
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

class LookupResultsForm extends Component{
	constructor(props){
		super(props);

		this.state = {
			isError: false,
			back: false,
			data: [],
			type: '',
			sha: ''
		}

		this.onClick = this.onClick.bind(this);
	}

	generateWarning(sha) {
		let warning = '';
		let isError = false;
		let len = sha.length;

		if(len != 40) {
			warning = 'Warning: A SHA1 must be 40 characters long.'
			isError = true;
		}
		else if(len == 0) {
			warning = 'Warning: No SHA1 specified.'
			isError = true;
		}

		return { warning, isError };
	}

	displayWarning(warning) {
		
		this.props.history.push('./error');
	}
	
	componentDidMount() {
		let search = window.location.search;
		let params = new URLSearchParams(search);
		let sha = params.get('sha1');
		let type = params.get('type');
		this.Search(sha, type);
	}

	UNSAFE_componentWillMount() {
		window.addEventListener('popstate', e => {
			this.setState({ back: true });
			this.Search(window.history.state.sha, window.history.state.type);
		})
	}

	Search(sha, type) {
		let { warning, isError } = this.generateWarning(sha);
		if(!isError) {
			this.props.lookupSha(sha, type)
			.then( (response) => {
				let result = response.data.stdout;
				if(!result) {
					warning = "Search returned nothing.";
					this.displayWarning(warning);
					isError = true;
				}
				if(!isError) {
					let stderr = response.data.stderr;
					let data = [];
					if (type == "blob") {
						data = result;
						
					}
					else { 
						data = result.split(/;|\r|\n/);
						
					}
					if(!this.state.back) {
						window.history.pushState({sha: sha, type: type}, '', `./lookupresult?sha1=${sha}&type=${type}`);
					}
					this.setState({
						data: data,
						type: type,
						sha: sha,
						back: false
					});
				}
			});
		} else { 
			this.displayWarning(warning);
		}

	}

	onClick(e,type,sha){
		e.preventDefault();
		this.Search(sha,type);
	}

	generateTable() {
		let { data, type, sha } = this.state;
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
				      <td>{c}</td>
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
		const { sha, type } = this.state;
			return (
			<div>	
		          <Card className="bg-secondary shadow border-0">
			    <CardBody>
			      <Table style={styles.table} className="align-items-center table-flush" responsive>
			        <tbody>
			          {this.generateTable()}
			        </tbody>
		              </Table>
			    </CardBody>
			  </Card>
			</div>
		)
	}
}

LookupResultsForm.propTypes = {
}

function mapStateToProps(state) {
	return {

	};
}

export default connect(mapStateToProps, {})(withRouter(LookupResultsForm));
