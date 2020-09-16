import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Router } from "react-router-dom";
import { connect } from 'react-redux';
import { styles } from '../../common/styles';
import queryString from 'query-string';
import {
	Card,
	CardBody,
	CardHeader,
	ListGroup,
	ListGroupItem,
	Table,
} from "reactstrap";

function select_map(props){
	let type = props.state.type;
	let data = props.state.data;

	if (type === "b2a") return b2a(data);
	else if (type === "b2c") return b2c(data);
	else if (type === "b2f") return b2f(data);
	else if (type === "b2ob") return b2ob(data);
	else if (type === "b2tk") return b2tk(data);
}

function b2a(data){
	let blob_link = "./lookupresult?sha1=" + data[0] + "&type=blob";
	let commit_link = "./lookupresult?sha1=" + data[3] + "&type=commit";
	return (
		<Table className="align-items-center table-flush" responsive>
		  <tbody>
	  	    <tr>
		      <td>Blob:</td>
		      <td><a href={blob_link}>{data[0]}</a></td>
		    </tr>
		    <tr>
		      <td>Author Time:</td>
		      <td>{data[1]}</td>
		    </tr>
		    <tr>
		      <td>Author:</td>
		      <td>{data[2]}</td>
		    </tr>
		    <tr>
		      <td>Commit:</td>
		      <td><a href={commit_link}>{data[3]}</a></td>
		    </tr>
		  </tbody>
		</Table> 
	);
}

function b2c(data) {
	// remove first element, leave the commits to print
	data.shift();
	const commits = data.map((commit) => 
	          <tr key={commit}> 
		        <td>Commit:</td>
		        <td><a href={"./lookupresult?sha1="+commit+"&type=commit"}>{commit}</a></td>
		      </tr>);


	return (
		<Table style={styles.table} className="align-items-center table-flush" responsive>
		  <tbody>
		    {commits}
		  </tbody>
		</Table>
	);
}

function b2f(data) {
	return(
		<ListGroup>
		  <ListGroupItem><a href={"./lookupresult?sha1="+data[0]+"&type=blob"}>{data[1]}</a></ListGroupItem>
		</ListGroup>
	);
}

function b2ob(data) {
	return(
		<ListGroup>
		  <ListGroupItem><a href={"./lookupresult?sha1="+data[1]+"&type=blob"}>{data[1]}</a></ListGroupItem>
		</ListGroup>
	);
}

function b2tk(data) {
	let output = "";
	if (data.length == 1) output = "No tokens/ctags available for this Blob";
	else output = data[1];
	return(
		<ListGroup>
		  <ListGroupItem>{output}</ListGroupItem>
		</ListGroup>
	);
}

export function BlobMap(props) {
	return (
		<div>
		  <Card className="bg-secondary shadow border-0">
		    <CardHeader>Mapping Results for Blob {props.state.sha}</CardHeader>
		      <CardBody>
		        {select_map(props)}
		      </CardBody>
	      </Card>
		</div>
	);
}
