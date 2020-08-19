import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Router } from "react-router-dom";
import { connect } from 'react-redux';
import { styles } from '../../common/styles';
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

	if (type === "a2b") return a2b(data);
}

function a2b(data) {
	data.shift();
	const Blobs = data.map((Blob) =>
			<tr key={Blob}>
			<td>Blob:</td>
			<td><a href={"./lookupresult?sha1="+Blob+"&type=blob"}>{Blob}</a></td>
			</tr>);


	return (
		<Table style={styles.table} className="align-items-center table-flush" responsive>
		  <tbody>
			{Blobs}
		  </tbody>
		</Table>
	);
}

export function AuthorMap(props) {
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
