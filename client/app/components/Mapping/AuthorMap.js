import React from 'react';
import { URLS } from './URL';
import MapButton from './MapButton';
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
	let	buttonClicked = (props.state.buttonClicked ? true : false); 
	
	data.shift(); //query string won't be displayed in results
	if (data[data.length-1] === "") data.pop();	  //take "" last element out of results array	

	if (type === "a2c") return a2c(data,buttonClicked);
	else if (type === "a2f") return a2f(data,buttonClicked);
	else if (type === "a2fb") return a2fb(data,buttonClicked);
	else if (type === "a2p") return a2p(data,buttonClicked);
}

function a2c(data,buttonClicked) {
	//console.log(data);
	return (
		<Table style={styles.table} className="align-items-center table-flush" responsive>
		  <tbody>
			{data.map((commit) =>
			<tr key={commit}>
			<td>Commit:</td>
			<td><a href={"./lookupresult?sha1="+commit+"&type=commit"}>{commit}</a></td>
            {!buttonClicked && <td><MapButton query={commit} from={"commit"}/></td>}
			</tr>)}
		  </tbody>
		</Table>
	);
}

function a2f(data,buttonClicked) {
	//console.log(data);
	return (
		<Table style={styles.table} className="align-items-center table-flush" responsive>
		  <tbody>
			{data.map((file) =>
			<tr key={file}>
			<td>File:</td>
			<td><a href={"./lookupresult?sha1="+file+"&type=file"}>{file}</a></td>
            {!buttonClicked && <td><MapButton query={file} from={"file"}/></td>}
			</tr>)}
		  </tbody>
		</Table>
	);
}

function a2fb(data,buttonClicked) {
	//console.log(data);
	return (
		<Table style={styles.table} className="align-items-center table-flush" responsive>
		  <tbody>
			{data.map((blob) =>
			<tr key={blob}>
			<td>Blob:</td>
			<td><a href={"./lookupresult?sha1="+blob+"&type=blob"}>{blob}</a></td>
            {!buttonClicked && <td><MapButton query={blob} from={"blob"}/></td>}
			</tr>)}
		  </tbody>
		</Table>
	);

}

function a2p(data, buttonClicked) {
	//console.log(data);
	const p_list = [];
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

	if (data.length > 1) {
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
	else if (data.length === 1) {
		return (
			<ListGroup>
			  <ListGroupItem>Root Project: <a href={p_list[0]}>{data[0]}</a>
				{!buttonClicked && <MapButton query={data[0]} from={"project"}/>}
			  </ListGroupItem>
			</ListGroup>
		);
	}
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
