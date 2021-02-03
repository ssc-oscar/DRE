import React, { Component } from 'react';
import { FilterableContent } from 'react-filterable-content';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { 
	FormControl,
	InputLabel,
	MenuItem,
	Select
} from '@material-ui/core';
import {
	Button,
	Card,
	CardBody,
	Label,
	FormGroup
} from "reactstrap";

class LookupSearchForm extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			sha: '',
			type: '',
			isLoading: false,
            badInput: false,
            noType: false
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		let { sha, type } = this.state;
		this.setState({isLoading: true});

        if(sha.length != 40) this.setState({badInput: true, isLoading: false});
        else if(!type) this.setState({noType: true, isLoading: false});
        else this.props.history.push(`/lookupresult?sha1=${sha}&type=${type}`);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	generatecard() {
			return(	
				<CardBody className="px-lg-5 py-lg-5">
				  <Label>SHA1</Label>
				  <TextFieldGroup
				    focus={true}
				    label=""
				    onChange={this.onChange}
				    value={this.state.sha}
		          	field="sha"
				  />
                  {this.state.badInput &&
                  <div className="row justify-content-center" style={{ color: "red"}}><p>Sha must be 40 characters in length</p></div>}
				  <div>
					<FormControl variant="standard" size="medium" style={{minWidth: 80}}> 
				      <InputLabel id="label" required={true}>Type</InputLabel>
				      <Select value={this.state.type} name="type" onChange={this.onChange}>
				        <MenuItem value=""><em>None</em></MenuItem>
				        <MenuItem value="commit">commit</MenuItem>
				        <MenuItem value="tree">tree</MenuItem>
				        <MenuItem value="blob">blob</MenuItem>
				      </Select>
					</FormControl>
                    {this.state.noType &&
                    <div className="row justify-content-left" style={{ color: "red"}}><p>A sha type is required</p></div>}
				    <p></p>
				  </div>
				  <FormGroup>
				    <Button color="primary" disabled={this.state.isLoading}>
				      SEARCH
				      {this.state.isLoading && <i className="ml-2 fa fa-spinner fa-spin"></i>}
				    </Button>
				  </FormGroup>
				</CardBody>
			)
	}


	render() {
		return (
			<form onSubmit={this.onSubmit}>
			  <Card className="bg-secondary shadow border-0" style={{ width: '30rem'}}>
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
