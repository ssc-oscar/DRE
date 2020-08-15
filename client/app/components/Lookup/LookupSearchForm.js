import React, { Component } from 'react';
import { FilterableContent } from 'react-filterable-content';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import LookupSearchHeader from './LookupSearchHeader';
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	Label,
	FormGroup,
	Form,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from "reactstrap";

class LookupSearchForm extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			sha: '',
			type: '',
			command: 'showCnt',
			from: '',
			to: '',
			isLoading: false
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		let { sha, type, command, from, to } = this.state;
		this.setState({isLoading: true});

		if (command === "showCnt"){
			this.props.history.push(`/lookupresult?sha1=${sha}&type=${type}`);
		}
		else if (command === "getValues"){
			type = from[0] + "2" + to[0];
			this.props.history.push(`/mapresult?sha1=${sha}&type=${type}`);
		}
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	
	Mappings() {
		if(this.state.from === 'commit') {
			const maps = ( 
				<>
				  {" to "}
				  <select value={this.state.to} name="to" onChange={this.onChange}>
				    <option defaultValue="">Select</option>
				    <option field="p">project</option>
				    <option field="P">Project</option>
				  </select>
				</>
			);
			return maps;
		}
		else if (this.state.from === 'blob') {
			const maps = ( 
				<>
				  {" to "}
				  <select value={this.state.to} name="to" onChange={this.onChange}>
				    <option defaultValue="">Select</option>
				    <option field="a">author</option>
				    <option field="c">commit</option>
				  </select>
				</>
			);
			return maps;
		}
		else return (<div />)
	}


	generatecard() {
		if(this.state.command == "showCnt") {
			return(	
				<CardBody className="px-lg-5 py-lg-5">
				  <Label>SHA</Label>
				  <TextFieldGroup
				    label=""
				    focus={true}
				    onChange={this.onChange}
				    value={this.state.sha}
				    field="sha"
				  />
				  <div>
				    <select value={this.state.type} name="type" onChange={this.onChange}>
				      <option defaultValue="">Select</option>
				      <option field="commit">commit</option>
				      <option field="tree">tree</option>
				      <option field="blob">blob</option>
				    </select>
				    <p></p>
				  </div>
				  <FormGroup>
				    <Button color="primary" disabled={this.state.isLoading}>
				      Search
				      {this.state.isLoading && <i className="ml-2 fa fa-spinner fa-spin"></i>}
				    </Button>
				  </FormGroup>
				</CardBody>
			)
		} else {
			return (
				<CardBody className="px-lg-5 py-lg-5">
				  <Label>SHA</Label>
				    <TextFieldGroup
				      label=""
				      focus={true}
			              onChange={this.onChange}
			              value={this.state.sha}
		          	      field="sha"
				    />
				  <div>
				    <select value={this.state.from} name="from" onChange={this.onChange}>
				      <option defaultValue="">Select</option>
				      <option field="b">blob</option>
				      <option field="c">commit</option>
				    </select>
				    {this.Mappings()}
				    <p></p>
				  </div>
				  <FormGroup>
				    <Button color="primary" disabled={this.state.isLoading}>
				      Search
				      {this.state.isLoading && <i className="ml-2 fa fa-spinner fa-spin"></i>}
				    </Button>
				  </FormGroup>
				</CardBody>
			)

		}
	}


	render() {
		return (
			<form onSubmit={this.onSubmit}>
			  <Card className="bg-secondary shadow border-0" style={{ width: '30rem'}}>
			    <CardHeader className="bg-transparent">
		              <div>
			        <select value={this.state.command} name="command" onChange={this.onChange}>
			          <option field="showCnt">showCnt</option>
			          <option field="getValues">getValues</option>
			        </select>
			        <p></p>
			      </div>
		              <LookupSearchHeader option={this.state.command}/> 
			    </CardHeader>
		              {this.generatecard()}
			  </Card>
			</form>
		);
	}
}

LookupSearchForm.propTypes = {
}

function mapStateToProps(state) {
	return {

	};
}

export default connect(mapStateToProps, {})(withRouter(LookupSearchForm));
