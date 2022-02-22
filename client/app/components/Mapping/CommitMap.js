import React from 'react';
import { URLS } from './URL';
import MapButton from './MapButton';
import { 
	Card,
	CardBody,
	CardHeader,
	Table,
	ListGroup,
	ListGroupItem
} from 'reactstrap';

function select_map(props) {
	let type = props.state.type;
	let data = props.state.data;
	let buttonClicked = (props.state.buttonClicked) ? true : false;

	data.shift();		//take search query out of results array
	if(data[data.length-1] === "") data.pop();		//take "" out of results		

	if(type === 'c2p' || type === 'c2P') return c2project(data,type, buttonClicked);
	else if(type === 'c2b') return c2b(data, buttonClicked);
	else if(type === 'c2cc' || type === "c2pc" || type === "c2h") return c2c(data,type, buttonClicked);
	else if(type === 'c2f') return c2f(data, buttonClicked);
	//else if(type === 'c2ta') return c2ta(data, buttonClicked);
	else if(type === 'c2td') return c2td(data, buttonClicked);
	//else if(type === 'c2dat') return c2dat(data, buttonClicked);
}

function c2project(data,type,buttonClicked) {
	let p_list = [];
	let URI_ = "";
	let build_str = ""
	let len = 0;
	let found = false;

	for (let i = 0; i < data.length; i++) {
		found = false;
		len = 0;
		build_str = ""
		if (data[i].match(/_/g)) len = data[i].match(/_/g).length;
		for (var URI in URLS) {
			URI_ = URI + "_";
			if (data[i].startsWith(URI_) && (len >= 2 || URI === "sourceforge.net")) {
				build_str = data[i].replace(URI, URLS[URI]);
				build_str = build_str.replace(/_/g, "/");
				build_str = "https://" + build_str;
				found = true;
				break;
			}
		}
		if (!found)
			build_str = "https://github.com/" + data[i].replace(/_/g, "/");

		p_list.push(build_str);
	}

	//list all repos
	if (type === "c2p" && data.length > 1) {
		return (
			<Table className="align-items-center table-flush" responsive>
			  <tbody>
				{data.map((Project, index) =>
				  <tr key={Project}>
					<td>Project:</td>
					<td><a href={p_list[index]}>{Project}</a></td>
					{!buttonClicked && <td><MapButton query={Project} from={"project"}/></td>}
				  </tr>
				)}
			  </tbody>
			</Table>
		);
	}
	//list root repository (or diff. formatting for commit with only 1 repo)
	else if (type === "c2P" || data.length === 1) {
		return (
			<ListGroup>
				  <ListGroupItem>Root Project: <a href={p_list[0]}>{data[0]}</a>
				  {!buttonClicked && <MapButton query={data[0]} from={"project"}/>}
				  </ListGroupItem>
			</ListGroup>
		);
	}
}

function c2b(data, buttonClicked) {
	//console.log(data);
	return (
		<Table className="align-items-center table-flush" responsive>
		  <tbody>
		    {data.map( (blob) => 
		      <tr key={blob}>
		        <td> Blob: </td>
				<td><a href={"./lookupresult?sha1=" + blob + "&type=blob"}>{blob}</a></td>
				{!buttonClicked && <td><MapButton query={blob} from={"blob"}/></td>}
		      </tr>
		    )}
		  </tbody>
		</Table>
	);
}

function c2f(data, buttonClicked) {
	//console.log(data);
	return (
		<Table className="align-items-center table-flush" responsive>
		  <tbody>
		    {data.map( (file) => 
		      <tr key={file}>
		        <td> File: </td>
	      	    <td>{file}</td>
				{!buttonClicked && <td><MapButton query={file} from={"file"}/></td>}
		      </tr>
		    )}
		  </tbody>
		</Table>
	);
}

function c2c(data, type, buttonClicked) {
	//console.log(data);
	let ctype = "";
	let spacer = "\xa0";
	if(type === "c2cc") ctype = "Child";
	if(type === "c2pc") ctype = "Parent";
	if(type === "c2h")  ctype = "Head";

	//Commits can have multiple parent/child shas, but only 1 head commit
	if (data.length > 1 && ctype !== "Head") {
		return (
			<Table className="align-items-center table-flush" responsive>
			  <tbody>
				{data.map( (commit) => 
				  <tr key={commit}>
					<td> {ctype} Commit: </td>
					<td><a href={"./lookupresult?sha1=" + commit + "&type=blob"}>{commit}</a></td>
					{!buttonClicked && <td><MapButton query={commit} from={"commit"}/></td>}
				  </tr>
				)}
			  </tbody>
			</Table>
		);
	}
	//Commit has 1 parent/child, or this is head commit
	else {
		return (
			<ListGroup>
				  <ListGroupItem>{ctype} Commit:{spacer} 
				  {(data.length != 0 ? <a href={"./lookupresult?sha1=" + data[0] + "&type=commit"}>{data[0]}</a>
						: "This commit has no parents")}
				  {(!buttonClicked && data.length != 0) && <MapButton query={data[0]} from={"commit"}/>}
				  </ListGroupItem>
			</ListGroup>
		);
	}
}


/*
function c2ta(data, buttonClicked) {
	return (
		<ListGroup>
		  <ListGroupItem>Author: {data[1]}
			{!buttonClicked && <MapButton query={data[1]} from={"author"}/>}
		  </ListGroupItem>
		  <ListGroupItem>Time: 
			<a href={`./clickhouseresult?start=${data[0]}&end=&count=false&limit=1000`}>{data[0]}</a>
		  </ListGroupItem>
		</ListGroup>
	);
}
*/
		
function c2td(data) {
	return (
		<ListGroup>
		  <ListGroupItem>Tdiff: {(data ? "No tdiff available for this commit" : data[0])}</ListGroupItem>
		</ListGroup>
	);
}

/*
function c2dat(data) {
	console.log('In c2dat');
	return (
		<ListGroup>
			<ListGroupItem>Commit: {data[0]}
				{!buttonClicked && <MapButton query={data[0]} from={"commit"} />}
			</ListGroupItem>
			<ListGroupItem>Commit Time: {data[1]} </ListGroupItem>
			<ListGroupItem>Timezone: {data[1]} </ListGroupItem>
		  <ListGroupItem>Author: {data[3]}
			{!buttonClicked && <MapButton query={data[3]} from={"author"}/>}
		  </ListGroupItem>
		  <ListGroupItem>Tree: {data[4]}
			{!buttonClicked && <MapButton query={data[4]} from={"tree"}/>}
		  </ListGroupItem>
			{ data.map((parent, index * 5) => {
				 <ListGroupItem>Parent: {parent}
				 {!buttonClicked && <MapButton query={parent} from={"commit"} />}
				 </ListGroupItem>
			})}
		</ListGroup>
	);
}
*/

export function CommitMap(props) {
	console.log("CommitMap");
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

