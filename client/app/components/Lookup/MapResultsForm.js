import PropTypes from 'prop-types';
import React, { useEffect, useState, Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Router } from "react-router-dom";
import { connect } from 'react-redux';
import { styles } from '../common/styles';
import queryString from 'query-string';
import { BlobMap } from './Mappings/BlobMap';
import { CommitMap } from './Mappings/CommitMap';
import { AuthorMap } from './Mappings/AuthorMap';
import { ProjectMap } from './Mappings/ProjectMap';
import { FileMap } from './Mappings/FileMap';
import { ShowFileContent } from './showFileContent';
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

class MapResultsForm extends Component{
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
		/*if(len != 40) {
			warning = 'Warning: A SHA1 must be 40 characters long.'
			isError = true;
		}*/
		if(len == 0) {
			warning = 'Warning: No SHA1/query specified.'
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
		let command = "getValues";
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
					data = result.split(/;|\r|\n/);
					//last element in array is always "", so remove it!
					data.pop();
					if(!this.state.back) {
						window.history.pushState({sha: sha, type: type}, '', `./mapresult?sha1=${sha}&type=${type}`);
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

	render() {
		const { sha, type } = this.state;
		if (type[0] === "a") return (<AuthorMap state={this.state}/>)
		else if (type[0] === "b") return (<BlobMap state={this.state}/>)
		else if (type[0] === 'c') return (<CommitMap state={this.state}/>)
		else if (type[0] === 'p' || type[0] === 'P') return (<ProjectMap state={this.state}/>)
		else if (type[0] === 'f') return (<FileMap state={this.state}/>)
		else {
			return (
				<div>
				  <Card className='bg-secondary shadow border-0'>
				    <CardBody>
				    </CardBody>
				  </Card>
				</div>
			)
		}
	}
}

MapResultsForm.propTypes = {
}

function mapStateToProps(state) {
	return {

	};
}

export default connect(mapStateToProps, {})(withRouter(MapResultsForm));
