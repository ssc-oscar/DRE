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

class LookupSearch extends Component {

	constructor(props){
		super(props);
		this.state = { 
			sha: '',
			type: 'commit',
			isLoading: false
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	generateWarning() {
		let sha = this.state.sha;
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

	onSubmit(e) {
		e.preventDefault();
		const { sha, type } = this.state;

		this.setState({isLoading: true});
		const { warning, isError } = this.generateWarning();
		if(!isError) {
			this.props.lookupSha(sha, type)
			.then( (response) => {
				let result = response.data;
				let data = result.split(';'); 
				this.props.history.push('/lookupresult', {
					sha: sha,
					type: type,
					data: data
				});
			});
		} else { 
			console.log(warning);
			window.alert(warning);
		}
	}


	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
			  <Card className="bg-secondary shadow border-0">
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

LookupSearch.propTypes = {
}

function mapStateToProps(state) {
	return {

	};
}

export default connect(mapStateToProps, {})(withRouter(LookupSearch));
