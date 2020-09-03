import PropTypes from 'prop-types';
import React, { useEffect, useState, Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Router } from "react-router-dom";
import { connect } from 'react-redux';
import { styles } from '../common/styles';
import queryString from 'query-string';
import TextFieldGroup from '../common/TextFieldGroup';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Form,
	FormFeedback,
	FormGroup,
	Label,
	ListGroup,
	ListGroupItem,
	Table,
	UncontrolledTooltip
} from "reactstrap";

class ClickhouseForm extends Component{
	constructor(props){
		super(props);

		this.state = {
			start: '',
			end: '',
			count: false,
			start_error: false,
			end_error: false,
			backwards: false,
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	onSubmit(e){
		e.preventDefault();
		let s_err = false, e_err = false, back = false;
		let {start, end, count} = this.state;
		let [new_start, new_end] = this.checkDate(start, end);
		if (new_start === "bad start") s_err = true; 
		if (new_end === "bad end") e_err = true;
		//don't display chronological error on bad input(s) or empty "End time"
		if (new_start > new_end && new_end && !s_err && !e_err) back = true;
		if (s_err || e_err || back) {
			this.setState({ 
				start_error: s_err, 
				end_error: e_err, 
				backwards: back,
			})
		}
		else this.props.history.push(`/clickhouseresult?start=${new_start}&end=${new_end}&count=${count}`);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	checkDate(start,end){
		let ret_arr = [], parts = [];
		var month, day, year, hour, min, sec, parse_time, timestamp;

		if(!(/(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{1,2}):(\d{2}):(\d{1,2})/.test(start))
			&& !(/(\d{10})/.test(start))) ret_arr.push("bad start");
		
		else {
			//date, time format
			parts = start.match(/(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{1,2}):(\d{2}):(\d{1,2})/)
			if (parts){
				parts.shift();
				[ month, day, year, hour, min, sec ] = parts;
				parse_time = new Date(year, month-1, day, hour, min, sec);
				timestamp = (parse_time.getTime()/1000).toFixed(0);
				ret_arr.push(timestamp);
			}
			//unix timestamp
			else if (start.match(/(\d{10})/)) ret_arr.push(start);
		}

		//searching on single timestamp/date-time in "Start time", leaving "End time" blank
		if (!end) ret_arr.push(end);

		else if(!(/(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{1,2}):(\d{2}):(\d{1,2})/.test(end))
			&& !(/(\d{10})/.test(end))) ret_arr.push("bad end");

		else {
			//date, time format
			parts = end.match(/(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{1,2}):(\d{2}):(\d{1,2})/)
			if (parts){
				parts.shift();
				[ month, day, year, hour, min, sec ] = parts;
				parse_time = new Date(year, month-1, day, hour, min, sec);
				timestamp = (parse_time.getTime()/1000).toFixed(0);
				ret_arr.push(timestamp);
			}
			//unix timestamp
			else if (end.match(/(\d{10})/)) ret_arr.push(end);
		}

		return ret_arr;
	}

	render() {
		let start_err_msg = (this.state.start_error ? 
					"Please specify a UNIX timestamp or Date & Time format (mm/dd/yyyy hh:mm:ss)" : 
					"");
		let end_err_msg = (this.state.end_error ? 
					"Please specify a UNIX timestamp or Date & Time format (mm/dd/yyyy hh:mm:ss)" : 
					"");
		return (
			<form onSubmit={this.onSubmit}>
			  <div className="row justify-content-center">
			    <Card className="bg-secondary shadow border-0" style={{ width: '30rem'}}>
			      <CardHeader className="bg-transparent">
			        <div className="text-center mt-2">
			        Specify a time or timeframe & return a set of commits.
			        </div>
			      </CardHeader>
				  <CardBody className="px-lg-5 py-lg-5">
					<Label className="control-label" id="start">
					  Start time <i className="fa fa-info-circle"></i>
					</Label>
					<UncontrolledTooltip placement="top" target="start">
					  Filling this field while leaving "End time" blank will search 
					  on this specific timestamp, rather than a range.
					</UncontrolledTooltip>
			        <TextFieldGroup
						focus={true}
						label=""
						onChange={this.onChange}
						value={this.state.start}
						field="start"
						error={start_err_msg}
					/>
				    {this.state.backwards && 
					<div className="row justify-content-center" style={{ color: "red"}}><p>Start date must be chronologically before end date!</p></div>}
					<Label>End Time</Label>
					<TextFieldGroup
					  focus={true}
					  label=""
					  onChange={this.onChange}
					  value={this.state.end}
					  field="end"
					  error={end_err_msg}
					/>
					<FormGroup>
					<Button color="primary" disabled={this.state.isLoading}>
				 	  SEARCH
					{this.state.isLoading && <i className="ml-2 fa fa-spinner fa-spin"></i>}
					</Button>
					</FormGroup>
				  </CardBody>
				</Card>
			  </div>
		    </form>
		)
	}
}

ClickhouseForm.propTypes = {
}

function mapStateToProps(state) {
	return {

	};
}

export default connect(mapStateToProps, {})(withRouter(ClickhouseForm));
