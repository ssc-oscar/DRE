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
			count: false
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	onSubmit(e){
		e.preventDefault();
		let {start, end, count} = this.state;
		let [new_start, new_end] = this.checkDate(start, end);
		this.props.history.push(`/clickhouseresult?start=${new_start}&end=${new_end}&count=${count}`);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	checkDate(start,end){
		if (start.includes("/")){
			var parts = this.state.start.match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{1,2}):(\d{2}):(\d{2})/)
			parts.shift();
			let [ month, day, year, hour, min, sec ] = parts;
			let parse_time = new Date(year, month-1, day, hour, min, sec);
			let timestamp = (parse_time.getTime()/1000).toFixed(0);
			return [timestamp, end]
		}
		return [start,end]
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
			  <div className="row justify-content-center">
			    <Card className="bg-secondary shadow border-0" style={{ width: '30rem'}}>
			      <CardHeader className="bg-transparent">
			        <div className="text-center mt-2">
			        <p>
			        Specify timeframe (in UNIX timestamp)
			        </p>
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
			/>
			<Label>End time</Label>
			<TextFieldGroup
			focus={true}
			label=""
			onChange={this.onChange}
			value={this.state.end}
			field="end"
			/>
					<FormGroup>
					<Button color="primary" disabled={this.state.isLoading}>
					SEARCH
					{this.state.isLoading && <i className="ml-2 fa fa-spinner fa-spin"></
					i>}
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
