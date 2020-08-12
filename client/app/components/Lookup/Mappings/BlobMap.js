import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Router } from "react-router-dom";
import { connect } from 'react-redux';
import { styles } from '../../common/styles';
import queryString from 'query-string';
import {
		Container,
		Row,
		Col,
		Card,
		CardBody,
		Table,
		FilterableContent,
		ListGroup,
		ListGroupItem
} from "reactstrap";

function pick_a_map(props){
	let type = props.state.type;
	let data = props.state.data;

	if (type === "b2a") return format_b2a_table(data);
	else if (type === "b2c") return format_b2c_table(data);
}

function format_b2a_table(data){
	let blob_link = "./lookupresult?sha1=" + data[0] + "&type=blob";
	let commit_link = "./lookupresult?sha1=" + data[3] + "&type=commit";

	return (
		<>
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
		</>
	)
}

function format_b2c_table(data) {
	// remove first element, leave the commits to print
	data.shift();

	return data.map((commit) => 
			<tr key={commit}> 
			  <td>Commit:</td>
			  <td><a href={"./lookupresult?sha1="+commit+"&type=commit"}>{commit}</a></td>
			</tr>
	)
}

export function BlobMap(props) {
		console.log(props.state);
		return(
		<div>
		  <Card className="bg-secondary shadow border-0">
			<CardBody>
			  <Table style={styles.table} className="align-items-center table-flush" responsive>
				<tbody>
				  {pick_a_map(props)}
				</tbody>
			  </Table>
			</CardBody>
		  </Card>
		</div>
	);
}
