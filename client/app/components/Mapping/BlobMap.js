import React from 'react';
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
    let buttonClicked = (props.state.buttonClicked) ? true : false;

	if (type === "b2fa") return b2a(data, buttonClicked);
	else if (type === "b2c") return b2c(data, buttonClicked);
	else if (type === "b2f") return b2f(data, buttonClicked);
	else if (type === "b2ob") return b2ob(data, buttonClicked);
	else if (type === "b2tk") return b2tk(data, buttonClicked);
}

function b2a(data, buttonClicked){
	let blob_link = "./lookupresult?sha1=" + data[0] + "&type=blob";
	let commit_link = "./lookupresult?sha1=" + data[3] + "&type=commit";

	return (
		<Table className="align-items-center table-flush" responsive>
		  <tbody>
	  	    <tr>
		      <td>Blob:</td>
		      <td><a href={blob_link}>{data[0]}</a></td>
              {!buttonClicked && <td><MapButton query={data[0]} from={'blob'} /></td>}
		    </tr>
		    <tr>
		      <td>Author Time:</td>
		      <td>{data[1]}</td>
		    </tr>
		    <tr>
		      <td>Author:</td>
		      <td>{data[2]}</td>
              {!buttonClicked && <td><MapButton query={data[2]} from={'author'} /></td>}
		    </tr>
		    <tr>
		      <td>Commit:</td>
		      <td><a href={commit_link}>{data[3]}</a></td>
              {!buttonClicked && <td><MapButton query={data[3]} from={'commit'} /></td>}
		    </tr>
		  </tbody>
		</Table> 
	);
}

function b2c(data, buttonClicked) {
	// remove first element, leave the commits to print
	data.shift();

	const commits = data.map((commit) => 
	          <tr key={commit}> 
		        <td>Commit:</td>
		        <td><a href={"./lookupresult?sha1="+commit+"&type=commit"}>{commit}</a></td>
                {!buttonClicked && <td><MapButton query={commit} from={'commit'} /></td>}
		      </tr>);


	return (
		<Table style={styles.table} className="align-items-center table-flush" responsive>
		  <tbody>
		    {commits}
		  </tbody>
		</Table>
	);
}

function b2f(data, buttonClicked) {
	return(
		<ListGroup>
		  <ListGroupItem><a href={"./lookupresult?sha1="+data[0]+"&type=blob"}>{data[1]}</a>
          {!buttonClicked && <MapButton query={data[0]} from={'file'} />}
          </ListGroupItem>
		</ListGroup>
	);
}

function b2ob(data, buttonClicked) {
	return(
		<ListGroup>
		  <ListGroupItem><a href={"./lookupresult?sha1="+data[1]+"&type=blob"}>{data[1]}</a>
          {!buttonClicked && <MapButton query={data[1]} from={'blob'} />}
          </ListGroupItem>
		</ListGroup>
	);
}

function b2tk(data, buttonClicked) {
	let output = "";
	if (data.length == 1) output = "No tokens/ctags available for this Blob";
	else output = data[1];
	return(
		<ListGroup>
		  <ListGroupItem>{output}</ListGroupItem>
		</ListGroup>
	);
}

export function BlobMap(props) {
	return (
		<div>
		  <Card className="bg-secondary shadow border-0">
		    <CardHeader>Mapping Results for Blob {props.state.sha}</CardHeader>
		      <CardBody>
		        {select_map(props)}
		      </CardBody>
	      </Card>
		</div>
	);
}
