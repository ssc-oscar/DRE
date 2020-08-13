import React from 'react';
import Component from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { styles } from '../../common/styles';
import { 
	Card,
	CardBody,
	Table,
} from 'reactstrap';

function formatTable(props) {
	if(props.state.type === 'c2p') return c2p(props);
	else if(props.state.type === 'c2P') return c2P(props);
}

function c2p(props) {
	let data = props.state.data;
	data.shift();

	const c2pTable = props.state.data.map( (project) =>
		<tr key={project}>
		  <td> Project: </td>
	      	  <td> {project} </td>
		</tr>
	)
	return c2pTable;
}

function c2P(props) {
	let data = props.state.data;

	const c2PTable = (
		<tr>
		  <td> Project: </td>
		  <td> {data[1]} </td>
		</tr>
	)
	return c2PTable;
}
	
export function CommitMap(props) {
	console.log("In CommitMap");
	console.log(props.state);
	return(
		<>
		  <Card className='bg-secondary shadow border-0'>
		    <CardBody>
		      <Table style={styles.table} className='align-items-center table-flush' responsive>
		        <tbody>
		        { formatTable(props) }
		        </tbody>
		      </Table>
		    </CardBody>
		  </Card>
		</>
	)
}
