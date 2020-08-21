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
	if (type === "p2a") return p2a(data);
	else if (type === "p2c" || type === "P2c") return p2c(data);
}

function p2a(data){
	data.shift();
	const authors = data.map((author) =>
			<tr key={author}>
			  <td>Author:</td>
			  <td>{author}</td>
			</tr>);


	return (
			<Table style={styles.table} className="align-items-center table-flush" responsive>
			  <tbody>
			    {authors}
			  </tbody>
			</Table>
		   );

}

function p2c(data){
	if (data.length == 1) {
		return (
			<ListGroup>
			  <ListGroupItem>No commits found, may not be central repo.</ListGroupItem>
			</ListGroup>
		)
	}
	
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

export function ProjectMap(props) {
	return (
		<div>
		  <Card className="bg-secondary shadow border-0">
		    <CardHeader>Mapping Results for Project {props.state.sha}</CardHeader>
		      <CardBody>
		        {select_map(props)}
		      </CardBody>
	      </Card>
		</div>
	);
}
