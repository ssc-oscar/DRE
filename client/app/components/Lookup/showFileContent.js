import regeneratorRuntime from "regenerator-runtime";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Router } from "react-router-dom";
import { connect } from 'react-redux';
import { styles } from '../common/styles';

class ShowFileContent extends Component {
	constructor(props){
		super(props);
		this.state = {
			blobs: [],
			commits: [],
			time_author: [],
			author_save: '',
			blob_save: '',
			time_save: ''
		}
	}

	componentDidMount(){
		console.log(this.props);
		this.Search(this.props.file, "f2b", blobs);
	}

	Search(sha, type, resType) {
		let data = [];
		this.props.lookupSha(sha, type, "getValues")
		.then( (response) => {
			console.log(response);
			let result = response.data.stdout;
			let stderr = response.data.stderr;

			/*Don't immediately go to error page if lookup returned
			  empty results. "no {sha} in {*.tch file}" is the only
			  error that should be allowed past this check.*/
			if(!result && !(/no\s.+\sin\s.+/.test(stderr))) {
				console.warn("Search returned nothing.");
			}

			data = result.split(/;|\r|\n/);
			data.shift();	//take query out of results array
			data.pop();		//take "" last element out of array

			this.setState({ blobs: data });
		});
	}

	render(){
		return (
			<div>
				{console.log(this.state.data)}	
			</div>
		);
	}
}

export { ShowFileContent };
