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
		let command = "getValues";
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
					data = result.split(/;|\r|\n/);
					console.log(data);				
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
		} else { 
			this.displayWarning(warning);
		}

	}

	onClick(e,type,sha){
		e.preventDefault();
		this.Search(sha,type);
	}

	render() {
		const { sha, type } = this.state;
			return (
			<div>	
		          <Card className="bg-secondary shadow border-0">
			    <CardBody>
			      <Table style={styles.table} className="align-items-center table-flush" responsive>
			        <tbody>
					{this.state.data}
			        </tbody>
		              </Table>
			    </CardBody>
			  </Card>
			</div>
		)
	}
}

MapResultsForm.propTypes = {
}

function mapStateToProps(state) {
	return {

	};
}

export default connect(mapStateToProps, {})(withRouter(MapResultsForm));
