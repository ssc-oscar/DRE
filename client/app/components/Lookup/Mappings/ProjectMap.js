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
	//query string won't be displayed in results
	data.shift();
	
	if (type === "p2a") return p2a(data);
	else if (type === "p2c") return a2f(data);
	else if (type === "P2c") return a2fb(data);
}

export function ProjectMap(props) {
	return (
		<div>
		  <Card className="bg-secondary shadow border-0">
		    <CardHeader>Mapping Results for Project {props.state.sha}</CardHeader>
		      <CardBody>
				<Table style={styles.table} className="align-items-center table-flush" responsive>
				  <tbody>
		            {select_map(props)}
				  </tbody>
				</Table> 
		      </CardBody>
	      </Card>
		</div>
	);
}
