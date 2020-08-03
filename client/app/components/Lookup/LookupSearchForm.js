import React, { Component } from 'react';
import { FilterableContent } from 'react-filterable-content';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	Label,
	FormGroup,
	Form,
	Row,
	Col,
	UncontrolledTooltip
} from "reactstrap";

class LookupSearchForm extends Component {

	constructor(props){
		super(props);
		this.state = { 
			sha: '',
			type: 'commit',
			command: 'showCnt',
			isLoading: false
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		const { sha, type, command} = this.state;
		this.setState({isLoading: true});
		this.props.history.push(`/lookupresult?sha1=${sha}&type=${type}`);
		console.log(command);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
			  <Card className="bg-secondary shadow border-0" style={{ width: '30rem'}}>
			    <CardHeader className="bg-transparent">
			      <div className="text-center mt-2">
			        <p>
			          Lookup the contents of a SHA1
			        </p>
			      </div>
			    </CardHeader>
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
