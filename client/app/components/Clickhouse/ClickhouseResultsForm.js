import React, {Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { styles } from '../common/styles';
// import queryString from 'query-string';
import {
	Card,
	CardBody,
	CardHeader,
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
		let limit = params.get('limit');
		this.Query(start, end, count, limit);
	}

	onClick(e,type,sha){
		e.preventDefault();
		this.Search(sha,type);
	}

	Query(start, end, count, limit){
		if(!end) end = start;
		this.props.clickhouseQuery(start, end, count, limit)
		.then( (response) => {
			console.log(response.data);
			this.setState({
				start: start,
				end: end,
				count: count,
				data: response.data
			})
		})
	}

	generateTable(){
        this.state.data.sort((a,b) => (a['time'] > b['time'] ? 1 : -1));
		let result = this.state.data.map((entry, index) => {
			return (
				<tr key={index}>
				<td>Commit made at {entry['time']}:</td>
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
