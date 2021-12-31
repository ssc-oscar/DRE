import React, { Component } from 'react';
// import { FilterableContent } from 'react-filterable-content';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import Markdown from 'react-markdown';
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
	    tutorial: false,
            noType:   false
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleHelp = this.handleHelp.bind(this);
		this.handleTest = this.handleTest.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		let { sha, type } = this.state;
		this.setState({isLoading: true});
		
		if(sha.length != 40) this.setState({badInput: true, isLoading: false});
        	else if(!type) this.setState({noType: true, isLoading: false});
		else this.props.history.push(`/lookupresult?sha1=${sha}&type=${type}`);
		
	}
	
	handleClick() {
		this.setState({tutorial: false});	
		this.setState({sha: ""});
		this.setState({type: ""});
	}
	handleHelp() {
		this.setState({tutorial: true});
		this.setState({sha: "464ac950171f673d1e45e2134ac9a52eca422132"});
		this.setState({type: "tree"});
	}
	handleTest() {
		this.props.history.push(`/lookupresult?sha1=464ac950171f673d1e45e2134ac9a52eca422132&type=tree`);
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
				    <Button color="Ltutorial"  onClick={this.handleHelp} disabled={this.state.isLoading}>
				      Need Help?
				      {this.state.isLoading && <i className="ml-2 fa fa-spinner fa-spin"></i>}
				    </Button>	    
				  </FormGroup>
				<div><p></p></div>
                  {this.state.tutorial &&
                  <div className="row justify-content-center" style={{ color: "black"}}>
			<Card color="Ltutorial" className="card" style={{width:"385px"}}>
			<FormGroup> 
			  <Button onClick={this.handleClick} color="Rtutorial" disabled={this.state.isLoading}>X</Button>
			</FormGroup>
                  	<div className="row justify-content-center" style={{ color: "black"}}>
				<Card color="Ltutorial" className="card" style={{width: "355px",color: "black", background: "#EFEFEF",border: "black"}}>
					<b style={{marginLeft:"0.35em",marginBottom:"10px"}}><strong>What is this page for?</strong></b>
					<p style={{marginLeft:"1.5em",marginRight:"1.5em"}}><strong>This page allows you to view the contents of a commit,
			  		blob, or tree through the specification of a SHA and TYPE. Using this tool displays a graphical representation of
			  		the lookup Perl scripts.
			  		</strong></p>
			  		<div><p>    </p></div>
				</Card>
			</div>	
			<div><p></p></div>
                  	<div className="row justify-content-center" style={{ color:"black"}}>
			  	<Card color="Ltutorial" className="card" style={{width: "355px", color: "black", background: "#EFEFEF",border: "black"}}>
					<b style={{marginLeft:"0.35em", marginBottom:"10px"}}><strong> Example:</strong></b>
			  		<p style={{marginLeft:"1.4em", marginBottom:"7px"}}><strong>SHA1</strong></p>                  			
			  		<div className="row justify-content-center" style={{ color: "black",font:"1px"}}>			  		
			  		<Card color="Ltext" className="card" 
			  		style={{justifycontent: "center", width: "325px", marginBottom:"8px",marginTop:"0px",height:"27px", 
					font: "10px",color: "black", background: "#FFF",border: "#000"}}>
						<p style={{color:"black", marginLeft:"7px",fontSize:"14px"}}>464ac950171f673d1e45e2134ac9a52eca422132</p>
			  		</Card>
			  		</div>
			  		<p style={{marginLeft:"1.4em", marginBottom:"0em", marginTop:"0.5"}}><strong>TYPE</strong></p>                  			
			  		<div className="row justify-content-left" style={{ marginLeft:"15px",justifycontent:"left", color: "black"}}>			  		
			  			<Card color="Ltutorial" className="card" 
			  			style={{justifycontent: "center",marginTop:"5px", width: "80px", 
						height:"30px",color: "black", background: "#FFF",border: "Ltutorial"}}>
			  				<p style={{color:"black", marginLeft:"7px"}}>Tree</p>
			  			</Card>
			  		</div>
			  		<br></br>	
					<b style={{marginLeft:"0.35em",marginBottom:"10px"}}><strong> Results:</strong></b>	
					<p style={{marginLeft:"1.5em",marginRight:"1.5em"}}><strong>This example is equivalent to the following command: </strong></p>
			  			<div className="row justify-content-center" style={{ color: "black",font:"1px"}}>			  		
			  			<Card color="Ltext" className="card" 
			  			style={{justifycontent: "center", width: "325px", marginBottom:"15px",marginTop:"0px",height:"40px", 
						font: "10px",color: "black", background: "#FFF",border: "#000"}}>
			  				<p style={{fontSize:"12px", marginLeft:"7px"}}>echo 464ac950171f673d1e45e2134ac9a52eca422132 | ~/lookup/showCnt tree</p> 
			  			</Card>
			  			</div>	
				    		<div className ="row justify-content-center">
				    		<Button color="Ltutorial" onClick={this.handleTest} disabled={this.state.isLoading}>
				      			Run This Example
				    		</Button>
			  			</div>
			  		<div><p>    </p></div>
			  		<br></br>
			  	</Card>
				</div>
			  <p></p>
			</Card>
		  </div>}
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
