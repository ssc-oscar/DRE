import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Router } from "react-router-dom";
import { connect } from 'react-redux';
import { styles } from '../../common/styles';
import queryString from 'query-string';
import { URLS } from './URL';
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
	
	if(type === "f2a") return f2a(data);
	else if(type === "f2b") return f2b(data);
	else if(type === "f2c") return f2c(data);
}

function f2a(data) {
	data.shift();

	const f2aTable = (
		<Table className="align-items-center table-flush" responsive>
		  <tbody>
		    {data.map((Author, index) =>
	              <tr key={Author}>
		        <td>Author:</td>
		        <td>{Author}</td>
	              </tr>
		    )}
		  </tbody>
		</Table>
	);
	return f2aTable;
}

function f2b(data) {
	data.shift();
	
	const f2bTable = (
		<Table className="align-items-center table-flush" responsive>
		  <tbody>
		  {data.map( (blob) => 
		    <tr key={blob}>
	              <td> Blob: </td>
		      <td><a href={"./lookupresult?sha1=" + blob + "&type=blob"}>{blob}</a></td>
	            </tr>
		)}
		  </tbody>
		</Table>
	)
	return f2bTable;
}

function f2c(data) {
	data.shift();

	const f2cTable = (
		<Table style={styles.table} className="align-items-center table-flush" responsive>
		<tbody>
		{data.map( (commit) => 
			<tr key={commit}>
			<td> Commit: </td>
			<td><a href={"./lookupresult?sha1=" + commit + "&type=commit"}>{commit}</a></td>
			</tr>
		)}
		</tbody>
		</Table>
	)
	return f2cTable;
}

export function FileMap(props) {
	return (
		<div>
		 <Card className="bg-secondary shadow border-0">
		  <CardHeader>Mapping Results for Author {props.state.sha}</CardHeader>
		    <CardBody>
		      {select_map(props)}
		    </CardBody>
	          </Card>
		</div>
	);
}
