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
	else if(type === 'c2cc') return c2cc(data);
	else if(type === 'c2f') return c2f(data);
	else if(type === 'c2h') return c2h(data);
	else if(type === 'c2pc') return c2pc(data);
	else if(type === 'c2ta') return c2ta(data);
	else if(type === 'c2td') return c2td(data);
}

function c2p(data) {
	data.shift();

	const c2pTable = (
		<Table className="align-items-center table-flush" responsive>
		  <tbody>
		    {data.map( (project) =>
		      <tr key={project}>
		        <td> Project: </td>
	      	        <td> {project} </td>
		      </tr>
		    )}
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
	data.shift();

	const c2bTable = (
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
	return c2bTable;
}

function c2cc(data) {
	const c2ccTable = (
		<ListGroup>
	          <ListGroupItem>Child Commit: <a href={"./lookupresult?sha1=" + data[1] + "&type=commit"}>{data[1]}</a></ListGroupItem>
		</ListGroup>
	)
	return c2ccTable;
}

function c2f(data) {
	data.shift();

	const c2fTable = (
		<Table className="align-items-center table-flush" responsive>
		  <tbody>
		    {data.map( (file) => 
		      <tr key={file}>
		        <td> File: </td>
	      	        <td>{file}</td>
		      </tr>
		    )}
		  </tbody>
		</Table>
	)
	return c2fTable;
}

function c2h(data) {
	const c2hTable = (
		<ListGroup>
		  <ListGroupItem>Head Commit: <a href={"./lookupresult?sha1=" + data[1] + "&type=commit"}>{data[1]}</a></ListGroupItem>
		</ListGroup>
	)
	return c2hTable;
}
	
function c2pc(data) {
	const c2pcTable = (
		<ListGroup>
		  <ListGroupItem>Parent Commit: <a href={"./lookupresult?sha1=" + data[1] + "&type=commit"}>{data[1]}</a></ListGroupItem>
		</ListGroup>
	)
	return c2pcTable;
}

function c2ta(data) {
	const c2taTable = (
		<ListGroup>
		  <ListGroupItem>Author: {data[2]}</ListGroupItem>
		  <ListGroupItem>Time: {data[1]}</ListGroupItem>
		</ListGroup>
	)
	return c2taTable;
}
		
function c2td(data) {
	let output = "";
	if(data.length == 1) output = "No tdiff available for this commit";
	else output = data[1];

	const c2tdTable = (
		<ListGroup>
		  <ListGroupItem>{output}</ListGroupItem>
		</ListGroup>
	)
	return c2tdTable;

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

