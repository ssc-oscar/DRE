import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { styles } from '../common/styles';
import ErrorPage from '../App/NotFound';
import MapButton from '../Mapping/MapButton';
import GraphButton from '../FastGraph/GraphButton';
// import queryString from 'query-string';
import Markdown from 'react-markdown';
import {
	Card,
	CardBody,
	CardHeader,
	ListGroup,
	ListGroupItem,
	Table
} from "reactstrap";

class LookupResultsForm extends Component{
	constructor(props){
		super(props);

		this.state = {
			isError: false,
			back: false,
			data: [],
			type: '',
			sha: ''
		}

		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		let search = window.location.search;
		let params = new URLSearchParams(search);
		let sha = params.get('sha1');
		let type = params.get('type');
		this.Search(sha, type, "showCnt");
	}

	UNSAFE_componentWillMount() {
		window.addEventListener('popstate', e => {
			this.setState({ back: true });
			this.Search(window.history.state.sha, window.history.state.type, "showCnt");
		})
	}

	onClick(e, type, sha, command){
		e.preventDefault();
		this.Search(sha, type, command);
	}

	displayWarning(warning) {
        console.warn(warning);
		this.props.history.push('./error');
	}

	Search(sha, type, command) {
        console.log(sha);

        this.props.lookupSha(sha, type, command)
            .then( (response) => {
                let result = response.data.stdout;
                let stderr = response.data.stderr;

                console.log(result);

                if(!result) {
                    let warning = "Search returned nothing";
                    //this.displayWarning(warning);
                    this.setState({
                        isError: true,
                        errorMsg: warning
                    });
                } 
                else {
                    let data = [];

                    if(type == "blob") data = result;
                    else data = result.split(/;|\r|\n/);

                    if(!this.state.back && command === "showCnt") {
                        window.history.pushState({sha: sha, type: type}, '', `./lookupresult?sha1=${sha}&type=${type}`);
                    }
                    this.setState({
                        data: data,
                        type: type,
                        sha: sha,
                        back: false
                    });
                }
            });
    }

	generateTable() {	
		let { data, type, sha } = this.state;
        if(this.state.isError) {
            return <ErrorPage errorMsg={ this.state.errorMsg } backLoc={"lookup"} />
        }
        else if(type == 'commit'){
			let spacer = "\xa0";
			let tree = data[1];
			let [p, p2] = ((data[2].length > 40) ? data[2].split(":") : [data[2], ""])
			let author = data[3];
			let a_time = data[5].replace(/ \+\d{4}/, "");
			let widest = author.length + 'rem';
			let highest = (p2 ? '30rem' : '27rem');
            return (
                <div className="row justify-content-center">
				  <Card className="bg-secondary shadow border-0" style={{ width: {widest}, height: {highest}}}>
                    <CardHeader>Lookup Results for Commit {sha}</CardHeader>
                      <CardBody>
                        <ListGroup>
                          <ListGroupItem>Commit: {sha}
							<MapButton query={sha} from="commit"/>                          
              <GraphButton sha={sha} type="commit"/>
						  </ListGroupItem>
                          <ListGroupItem>Tree: <a href="#" onClick={(e) => this.onClick(e,"tree", tree, "showCnt")}>{tree}</a></ListGroupItem>
                          <ListGroupItem>Parent:{spacer}
						  {(p ? <a href="#" onClick={(e) => this.onClick(e,"commit", p, "showCnt")}>{p}</a>
							  : "This commit has no parents")}
						  {p && <MapButton query={p} from="commit"/>}                          
						  {p && <GraphButton sha={p} type="commit"/>}
						  </ListGroupItem>
                          {p2 && <ListGroupItem>Parent:{spacer} 
							<a href="#" onClick={(e) => this.onClick(e,"commit", p2, "showCnt")}>{p2}</a>
						   <MapButton query={p2} from="commit"/>
                          <GraphButton sha={p2} type="commit"/>
                          </ListGroupItem>}
                          <ListGroupItem>Author: {author}
						   <MapButton query={author} from="author"/>
                          </ListGroupItem>
                          <ListGroupItem>Author Time:{spacer}  
						    <a href={`./clickhouseresult?start=${a_time}&end=&count=false&limit=1000`}>{a_time}</a></ListGroupItem>
                        </ListGroup>
                      </CardBody>
                    </Card>
                  </div>
            )
        }
		else if(type == 'tree'){
			var i, j;
			let table_rows = []
			for (i=0, j=0; i < data.length; i+=3, j++) {
				let row = [];
				row['id'] = j;
				row['mode'] = data[i];
				row['sha'] = data[i+1];
				row['filename'] = data[i+2];
				table_rows.push(row);
			}
			const treeTable = table_rows.map((result, index) => {
				const { id, mode, sha, filename } = result
				return (
					<tr key={id}>
					  <td>{mode}</td>
					  <td><a href="#" onClick={(e) => this.onClick(e,(mode === "040000") ? "tree" : "blob",sha,"showCnt")}>
					      {sha}</a></td>
					  <td>{filename}</td>
					</tr>
				)
			})
			return (
		        <div className="row justify-content-center">
				  <Card className="bg-secondary shadow border-0" style={{ width: '45rem', height: '37rem'}}>
					<CardHeader>Lookup Results for Tree {sha}</CardHeader>
					  <CardBody>
						<Table style={styles.table} className="align-items-center table-flush" responsive>
						  <tbody>
						    {treeTable}
						  </tbody>
					    </Table>
				      </CardBody>
			      </Card>
				</div>
			)
		}
		else if(type == 'blob'){
			return (
				<div className="row justify-content-center">
					<Card className="bg-secondary shadow border-0">
						<CardHeader>Lookup Results for Blob {sha}</CardHeader>
						<CardBody>
							<Markdown children={data} />
						</CardBody>
					</Card>
				</div>
			)
		}
	}

	render() {
		return (
			<div>	
				{this.generateTable()}
			</div>
		);
	}
}

LookupResultsForm.propTypes = {}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps, {})(withRouter(LookupResultsForm));
