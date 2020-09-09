import PropTypes from 'prop-types';
import React, { useEffect, useState, Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Router } from "react-router-dom";
import { connect } from 'react-redux';
import { styles } from '../common/styles';
import queryString from 'query-string';
import Markdown from 'react-markdown';
import {
	Card,
	CardBody,
	CardHeader,
	ListGroup,
	ListGroupItem,
	Table
} from "reactstrap";

class ClickhouseResultsForm extends Component{
	constructor(props){
		super(props);

		this.state = {
			start: '',
			end: '',
			count: false,
			data: [],
		}

		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		let search = window.location.search;
		let params = new URLSearchParams(search);
		let start = params.get('start');
		let end = params.get('end');
		let count = params.get('count');
		this.Query(start, end, count);
	}

	onClick(e,type,sha){
		e.preventDefault();
		this.Search(sha,type);
	}

	unicodeToChar(text) {
		var build_str = []
		for(var i = 0; i < text.length; i++){
			var hex = Number(text.charCodeAt(i).toString(16));
			build_str.push(hex);
		}
		return build_str.join(' ');
	}


	Query(start, end, count){
		if(!end) end = start;
		this.props.clickhouseQuery(start, end, count)
		.then( (response) => {
			console.log(response.data);
			console.log(response.data[0]['parent']);
			console.log(this.unicodeToChar(response.data[0]['parent']));
			console.log(response.data[1]['parent']);
			console.log(this.unicodeToChar(response.data[1]['parent']));
			console.log(response.data[2]['parent']);
			console.log(this.unicodeToChar(response.data[2]['parent']));
			this.setState({
				start: start,
				end: end,
				count: count,
				data: response.data
			})
		})
	}

	generateTable(){
		let result = this.state.data.map((entry, index) => {
			return (
				<tr key={index}>
				<td>Commit:</td>
				<td><a href={"./lookupresult?sha1="+entry['sha1']+"&type=commit"}>{entry['sha1']}</a></td>
				</tr>
			)
		});

		return result;
	}

	formatDate(){
		let nc = this.state.data.length;
		let start = new Date(this.state.start * 1000);
		let start_min = start.getMinutes();
		let start_month = start.getMonth()+1;
		if (start_min < 10) start_min = "0" + start_min;
		let start_date = start_month + "/" + start.getDate() + "/" + start.getFullYear() 
						+ ", " + start.getHours() + ":" + start_min + ":" + start.getSeconds(); 
		
		if (this.state.start !== this.state.end){
			let end = new Date(this.state.end * 1000);
			let end_min = end.getMinutes();
			let end_month = end.getMonth()+1;
			if (end_min < 10) end_min = "0" + end_min;
			let end_date = end_month + "/" + end.getDate() + "/" + end.getFullYear()
						+ ", " + end.getHours() + ":" + end_min + ":" + end.getSeconds();
			return nc+" Commits from "+start_date+" to "+end_date;
		}

		return nc+" Commits made on "+start_date;
	}

	render() {
		return (
		  <div className="row justify-content-center">
			<Card className="bg-secondary shadow border-0">
		      <CardHeader style={{textAlign: 'center'}}>{this.formatDate()}</CardHeader>
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

ClickhouseResultsForm.propTypes = {
}

function mapStateToProps(state) {
	return {

	};
}

export default connect(mapStateToProps, {})(withRouter(ClickhouseResultsForm));
