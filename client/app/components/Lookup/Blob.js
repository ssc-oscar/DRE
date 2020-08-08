import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Router } from "react-router-dom";
import { connect } from 'react-redux';
import { styles } from '../common/styles';
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

function format_b2a_Table(data){
	return (
		<>
		  <tr>
		    <td>Blob:</td>
		    <td>{data[0]}</td>
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
		    <td>{data[3]}</td>
		  </tr>
		</>
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
				  {format_b2a_Table(props.state.data)}
				</tbody>
			  </Table>
			</CardBody>
		  </Card>
		</div>
	);
}
