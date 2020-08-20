import React from 'react';
import Component from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { styles } from '../../common/styles';
import { 
	Card,
	CardBody,
	CardHeader,
	Table,
	ListGroup,
	ListGroupItem
} from 'reactstrap';

function select_map(props) {
	const type = props.state.type;
	const data = props.state.data;

	if(type === 'c2p') return c2p(data);
	else if(type === 'c2P') return c2P(data);
	else if(type === 'c2b') return c2b(data);
}

function c2p(data) {
	//leave query out of results
	data.shift();	
	const c2pTable = data.map( (project) =>
		<Table>
		<tbody>
		<tr key={project}>
		  <td> Project: </td>
	      	  <td> {project} </td>
		</tr>
		</tbody>
		</Table>
	)
	return c2pTable;
}

function c2P(data) {
	const c2PTable = (
		<ListGroup>
		  <ListGroupItem>Project: {data[1]}</ListGroupItem>
		</ListGroup>
	)
	return c2PTable;
}

function c2b(data) {

}
	
export function CommitMap(props) {
	return(
		<div>
		  <Card className='bg-secondary shadow border-0'>
		    <CardHeader> Mapping Results for Commit: {props.state.sha}</CardHeader>
		    <CardBody>
		      { select_map(props) }
		    </CardBody>
		  </Card>
		</div>
	)
}
