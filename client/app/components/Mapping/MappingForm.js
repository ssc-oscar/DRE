import React, { Component } from 'react';
import { FilterableContent } from 'react-filterable-content';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { options } from './options';
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
	FormGroup,
} from "reactstrap";

class MappingForm extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			sha: '',
			type: '',
			from: '',
			to: '',
            inputError: '',
            typeError: '',
            badInput: false,
            noFrom: false,
            noTo: false,
			isLoading: false
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		let { sha, type, from, to } = this.state;
		this.setState({isLoading: true, badInput: false, noFrom: false, noTo: false});

        if(from == "commit" || from == "blob") {
            if(sha.length != 40) {
                this.setState({
                    badInput: true, 
                    isLoading: false,
                    inputError: "Sha must be 40 characters in length"
                });
            }
        }
        if(!sha) {
            this.setState({
                badInput: true,
                isLoading: false,
                inputError: "No element to map specified"
            });
        }
        else if(!from) {
            this.setState({ 
                noFrom: true, 
                isLoading: false,
                typeError: "A 'From' type is required"
            });
        }
        else if(!to) {
            this.setState({
                noTo: true,
                isLoading: false,
                typeError: "A 'To' is required to do a mapping"
            });
        }
        else {
            if (to === "Pc") type = "P2c";
            else type = from[0] + "2" + to; 
            console.log(type);
            this.props.history.push(`/mapresult?sha1=${sha}&type=${type}`);
        }
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	
	Mappings() {
		return ( 
			  <FormControl variant="standard" size="medium" style={{minWidth: 80}}>
				<InputLabel id="label" required={true}>To</InputLabel>
				 <Select value={this.state.to} name="to" onChange={this.onChange}>
					<MenuItem value=""><em>None</em></MenuItem>
					{Object.keys(options[this.state.from]).map((to) => (
						<MenuItem
							key={options[this.state.from][to]}
							value={options[this.state.from][to]}
						>
						{to}
						</MenuItem>
					))}
				  </Select>
			  </FormControl>
		);
	}

	generatecard() {
			let spacer = "\xa0\xa0\xa0\xa0";
			return (
				<CardBody className="px-lg-5 py-lg-5">
				  <Label>Element to Map</Label>
				    <TextFieldGroup
				      label=""
				      focus={true}
			          onChange={this.onChange}
			          value={this.state.sha}
		          	  field="sha"
				    />
                  {this.state.badInput &&
                  <div className="row justify-content-center" style={{ color: "red" }} ><p> {this.state.inputError} </p></div>}
				  <div>
					<FormControl variant="standard" size="medium" style={{minWidth: 80}}> 
				    <InputLabel id="label" required={true}>From</InputLabel>
						<Select value={this.state.from} onChange={this.onChange} name="from">
						<MenuItem value="">
						<em>None</em>
						</MenuItem>
						  <MenuItem value="author">author</MenuItem>
						  <MenuItem value="blob">blob</MenuItem>
						  <MenuItem value="commit">commit</MenuItem>
						  <MenuItem value="project">project</MenuItem>
						  <MenuItem value="file">file</MenuItem>
						</Select>
					</FormControl>
					{spacer}
				    {this.state.from && this.Mappings()}
				    <p></p>
				  </div>
				  <FormGroup>
                    {this.state.noFrom &&
                    <div className="row justify-content-left" style={{ color: "red" }}><p> {this.state.typeError} </p></div>}
                    {this.state.noTo &&
                    <div className="row justify-content-left" style={{ color: "red" }}><p> {this.state.typeError} </p></div>}
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
              <Card className="bg-secondary shadow border-0" style={{width: '30rem'}}>
                {this.generatecard()}
              </Card>
            </form>
		);
	}
}

MappingForm.propTypes = {
}

function mapStateToProps(state) {
	return {

	};
}

export default connect(mapStateToProps, {})(withRouter(MappingForm));
