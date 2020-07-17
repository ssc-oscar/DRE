import React, {Component} from 'react';
import LookupSearch from './LookupSearch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Container, Card } from 'reactstrap';
//import { BuildResultTable} from './BuildResultTable'

class LookupResultsPage extends Component {
	/*constructor(props){
		super(props);

		this.state = {
			sha: '',
			type: '',
			data: []
		}
	}

	componentDidMount(){
		const { sha, type, data } = this.props.location.state;
		this.setState({
			sha: sha,
			type: type, 
			data: data
		});
	}
	*/
	
	render() {
		const { sha, type, data } = this.props.location.state;

/*		return (
			<div>
			  <BuildResultTable data={data} type={type}/>
			</div>
		)
*/
		if(type == "commit") {
		let c = data[0];
		let tree = data[1];
		let p = data[2];
		let author = data[3];
		let a_time = data[5];
		let committer = data[4];
		let c_time = data[6];
		console.log(data);
		console.log(c,tree,p);	
		return (
			<div>
			<Card className="bg-secondary shadow border-0">
			<Row>
			<Col className="mb-2">
			<table>
			<tbody>
			<tr>
				<td>Commit:</td>
				<td>{c}</td>
			</tr>
			<p></p>
			<tr>
				<td>Tree:</td>
				<td>{tree}</td>
			</tr>
			<p></p>
			<tr>
				<td>Parent:</td>
				<td>{p}</td>
			</tr>
			<p></p>
			<tr>
				<td>Author:</td>
				<td>{author}</td>
			</tr>
			<p></p>
			<tr>
				<td>Author Time:</td>
				<td>{a_time}</td>
			</tr>
			<p></p>
			<tr>
				<td>Committer></td>
				<td>{committer}</td>
			</tr>
			<p></p>
			<tr>
				<td>Commit Time:</td>
				<td>{c_time}</td>
			</tr>
			</tbody>
			</table>
			</Col>
			</Row>
			</Card>
			</div>
		)
		}
	}
}


export default LookupResultsPage;
