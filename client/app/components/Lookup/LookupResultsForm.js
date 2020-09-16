import PropTypes from 'prop-types';
import React, { useEffect, useState, Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Router } from "react-router-dom";
import { connect } from 'react-redux';
import { styles } from '../common/styles';
import queryString from 'query-string';
import {
	Card,
	CardBody,
	CardHeader,
	Table
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
		let command = "showCnt";
		if(!isError) {
			this.props.lookupSha(sha, type, command)
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

					if (type == "blob") data = result;
					else data = result.split(/;|\r|\n/);

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
		} else this.displayWarning(warning);
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
		            <div className="row justify-content-center">
		              <Card className="bg-secondary shadow border-0" style={{ width: '35rem', height: '37rem'}}>
			      <CardHeader>Lookup Results for Commit</CardHeader>
			        <CardBody>
			          <Table style={styles.table} className="align-items-center table-flush" responsive>
			            <tbody>
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
			            </tbody>
		                  </Table>
			        </CardBody>
			      </Card>
	                    </div>
			)
		}
		else if(type == 'tree'){
			var i, j;
			let table_rows = []
			for (i = 0, j=0; i < data.length; i+=3, j++) {
				let row = [];
				row['id'] = j;
				row['mode'] = data[i];
				row['sha'] = data[i+1];
				row['filename'] = data[i+2];
				table_rows.push(row);
			}
			const treeTable = table_rows.map((result, index) => {
				const { id, mode, sha, filename } = result
				return (
					<tr key={id}>
					  <td>{mode}</td>
					  <td><a href="#" onClick={(e) => this.onClick(e,(mode === "040000") ? "tree" : "blob",sha)}>
					      {sha}</a></td>
					  <td>{filename}</td>
					</tr>
				)
			})
			return (
		            <div className="row justify-content-center">
		              <Card className="bg-secondary shadow border-0" style={{ width: '45rem', height: '37rem'}}>
			      <CardHeader>Lookup Results for Tree</CardHeader>
			        <CardBody>
			          <Table style={styles.table} className="align-items-center table-flush" responsive>
			            <tbody>
				      {treeTable}
			            </tbody>
		                  </Table>
			        </CardBody>
			      </Card>
	                    </div>
			)
		}
		else if(type == 'blob'){
			const blobTable = data.split("\n").map((i,key) => {
				return <tr key={key}>{i}</tr>;
			})
			return (
		            <div className="row justify-content-center">
		              <Card className="bg-secondary shadow border-0">
			      <CardHeader>Lookup Results for Blob</CardHeader>
			        <CardBody>
			          <Table style={styles.table} className="align-items-center table-flush" responsive>
			            <tbody>
				      {blobTable}
			            </tbody>
		                  </Table>
			        </CardBody>
			      </Card>
	                    </div>
			)

		}
	}

	render() {
		const { sha, type } = this.state;
			return (
			<div>	
		          {this.generateTable()}
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
