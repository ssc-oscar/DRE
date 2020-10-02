import PropTypes from 'prop-types';
import React, { useEffect, useState, Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Router } from "react-router-dom";
import { connect } from 'react-redux';
import { styles } from '../common/styles';
import { options } from './options';
import { CommitMap } from './Mappings/CommitMap';
import { AuthorMap } from './Mappings/AuthorMap';
import MapButton from './Mappings/MapButton';
import queryString from 'query-string';
import Markdown from 'react-markdown';
import {
    Button as MenuButton,
    FormControl,
    Menu,
    MenuItem,
    InputLabel,
    Select
} from '@material-ui/core';

import {
	Button,
	Card,
	CardBody,
	CardHeader,
	FormGroup,
	ListGroup,
	ListGroupItem,
	Modal,
	ModalHeader,
	ModalBody,
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
	
	componentDidMount() {
		let search = window.location.search;
		let params = new URLSearchParams(search);
		let sha = params.get('sha1');
		let type = params.get('type');
		this.Search(sha, type, "showCnt");
	}

	UNSAFE_componentWillMount() {
		window.addEventListener('popstate', e => {
			this.setState({ back: true });
			this.Search(window.history.state.sha, window.history.state.type, "showCnt");
		})
	}

	onClick(e, type, sha, command){
		e.preventDefault();
		this.Search(sha, type, command);
	}

	generateWarning(sha, command) {
		let warning = '';
		let isError = false;
		let len = sha.length;

        if(command === "showCnt") {
            if(len != 40) {
                warning = 'Warning: A SHA1 must be 40 characters long.'
                isError = true;
            }
            else if(len == 0) {
                warning = 'Warning: No SHA1 specified.'
                isError = true;
            }
        }

		return { warning, isError };
	}

	displayWarning(warning) {
        console.warn(warning);
		this.props.history.push('./error');
	}

	Search(sha, type, command) {
		let { warning, isError } = this.generateWarning(sha, command);
        console.log(sha);

		if(!isError) {
			this.props.lookupSha(sha, type, command)
			.then( (response) => {
				console.log(response);
				let result = response.data.stdout;
				let stderr = response.data.stderr;

				/*Don't immediately go to error page if lookup returned
				  empty results. "no {sha} in {*.tch file}" is the only 
				  error that should be allowed past this check.*/
				if(!result && !(/no\s.+\sin\s.+/.test(stderr))) {
					warning = "Search returned nothing.";
					this.displayWarning(warning);
					isError = true;
				}
	
				if(!isError) {
					let data = [];

					if(type == "blob") data = result;
					else data = result.split(/;|\r|\n/);

					if(!this.state.back && command === "showCnt") {
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

	generateTable() {	
		let { data, type, sha } = this.state;
		if(type == 'commit'){
			let spacer = "\xa0";
			let tree = data[1];
			let [p, p2] = ((data[2].length > 40) ? data[2].split(":") : [data[2], ""])
			let author = data[3];
			let a_time = data[5].replace(/ \+\d{4}/, "");
			let widest = author.length + 'rem';
			let highest = (p2 ? '30rem' : '27rem');
            return (
                <div className="row justify-content-center">
				  <Card className="bg-secondary shadow border-0" style={{ width: {widest}, height: {highest}}}>
                    <CardHeader>Lookup Results for Commit {sha}</CardHeader>
                      <CardBody>
                        <ListGroup>
                          <ListGroupItem>Commit: {sha}
							<MapButton query={sha} from="commit"/>                          
						  </ListGroupItem>
                          <ListGroupItem>Tree: <a href="#" onClick={(e) => this.onClick(e,"tree", tree, "showCnt")}>{tree}</a></ListGroupItem>
                          <ListGroupItem>Parent:{spacer}
						  {(p ? <a href="#" onClick={(e) => this.onClick(e,"commit", p, "showCnt")}>{p}</a>
							  : "This commit has no parents")}
						  {p && <MapButton query={p} from="commit"/>}                          
						  </ListGroupItem>
                          {p2 && <ListGroupItem>Parent:{spacer} 
							<a href="#" onClick={(e) => this.onClick(e,"commit", p2, "showCnt")}>{p2}</a>
						   <MapButton query={p2} from="commit"/></ListGroupItem>}
                          <ListGroupItem>Author: {author}
						   <MapButton query={author} from="author"/>
                          </ListGroupItem>
                          <ListGroupItem>Author Time:{spacer}  
						    <a href={`./clickhouseresult?start=${a_time}&end=&count=false&limit=1000`}>{a_time}</a></ListGroupItem>
                        </ListGroup>
                      </CardBody>
                    </Card>
                  </div>
            )
        }
		else if(type == 'tree'){
			var i, j;
			let table_rows = []
			for (i=0, j=0; i < data.length; i+=3, j++) {
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
					  <td><a href="#" onClick={(e) => this.onClick(e,(mode === "040000") ? "tree" : "blob",sha,"showCnt")}>
					      {sha}</a></td>
					  <td>{filename}</td>
					</tr>
				)
			})
			return (
		        <div className="row justify-content-center">
				  <Card className="bg-secondary shadow border-0" style={{ width: '45rem', height: '37rem'}}>
					<CardHeader>Lookup Results for Tree {sha}</CardHeader>
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
			return (
				<div className="row justify-content-center">
		          <Card className="bg-secondary shadow border-0">
			        <CardHeader>Lookup Results for Blob {sha}</CardHeader>
			        <CardBody>
				      <Markdown source={data} />
			        </CardBody>
			      </Card>
	            </div>
			)
		}
	}

	render() {
		return (
			<div>	
				{this.generateTable()}
			</div>
		);
	}
}

LookupResultsForm.propTypes = {
}

function mapStateToProps(state) {
	return {

	};
}

export default connect(mapStateToProps, {})(withRouter(LookupResultsForm));
