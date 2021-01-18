import React, { Component } from 'react';
import { FilterableContent } from 'react-filterable-content';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import LookupSearchHeader from './LookupSearchHeader';
import { options } from './options';
import { 
	Button as MenuButton,
	FormControl,
	InputLabel,
	makeStyles,
	Menu, 
	MenuItem,
	TextField,
	Select
} from '@material-ui/core';
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
			isLoading: false,
			anchorEl: null,
			setAnchorEl: null,
            badInput: false,
            noType: false
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		let { sha, type, command, from, to } = this.state;
		this.setState({isLoading: true});

		if (command === "showCnt"){
            if(sha.length != 40) this.setState({badInput: true, isLoading: false});
            else if(!type) this.setState({noType: true, isLoading: false});
            else this.props.history.push(`/lookupresult?sha1=${sha}&type=${type}`);
		}
		else if (command === "getValues"){
			console.log(to);
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
	
    handleClick(e){
	    console.log(e.currentTarget);
	    this.setState({ setAnchorEl: e.currentTarget });
    }

    handleMenuItemClick(e, option) {
	    console.log(option);
		this.setState({
			command: option,
			setAnchorEl: null 
		})
    }

    handleClose(e){
		this.setState({
			setAnchorEl: null 
		})
    }

	Mappings() {
		//console.log(this.state.from);
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
		if(this.state.command == "showCnt") {
			return(	
				<CardBody className="px-lg-5 py-lg-5">
				  <Label>SHA</Label>
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
		} else {
			let spacer = "\xa0\xa0\xa0\xa0";
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
				    <Button color="primary" disabled={this.state.isLoading}>
				      SEARCH
				      {this.state.isLoading && <i className="ml-2 fa fa-spinner fa-spin"></i>}
				    </Button>
				  </FormGroup>
				</CardBody>
			)

		}
	}


	render() {
		const options = [
			'showCnt',
			'getValues',
			];
		return (
			<form onSubmit={this.onSubmit}>
			  <Card className="bg-secondary shadow border-0" style={{ width: '30rem'}}>
			    <CardHeader className="bg-transparent">
		          <div> 

				  <MenuButton aria-controls="simple-menu" aria-haspopup="true" 
				  onClick={this.handleClick} variant="contained" style={{color: 'white', backgroundColor: '#5e72e4'}}>
				  Command
				  </MenuButton>
				  <Menu
				    id="simple-menu"
				    anchorEl={this.state.setAnchorEl}
				    keepMounted
				    open={Boolean(this.state.setAnchorEl)}
				    onClose={this.handleClose}
				  >
				  {options.map((option) => (
					<MenuItem
						key={option}
						selected={option === this.state.command}
						onClick={(event) => this.handleMenuItemClick(event, option)}
						>
						{option}
						</MenuItem>
						))}
				  </Menu>
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
