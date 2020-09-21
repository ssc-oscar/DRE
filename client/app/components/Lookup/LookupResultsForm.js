import PropTypes from 'prop-types';
import React, { useEffect, useState, Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Router } from "react-router-dom";
import { connect } from 'react-redux';
import { styles } from '../common/styles';
import { options } from './options';
import queryString from 'query-string';
import Markdown from 'react-markdown';
import {
    Button as MenuButton,
    FormControl,
    Menu,
    MenuItem,
    InputLabel,
    Select
} from '@material-ui/core';

import {
	Button,
	Card,
	CardBody,
	CardHeader,
	FormGroup,
	ListGroup,
	ListGroupItem,
	Modal,
	ModalHeader,
	ModalBody,
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
			sha: '',
			showMap: false,
            setAnchorEl: null,
            anchorEl: null,
            command: ''
		}

		this.onClick = this.onClick.bind(this);
		this.onClickMap = this.onClickMap.bind(this);
		this.toggleMap = this.toggleMap.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
	}
	
	componentDidMount() {
		let search = window.location.search;
		let params = new URLSearchParams(search);
		let sha = params.get('sha1');
		let type = params.get('type');
		this.Search(sha, type);
	}

	UNSAFE_componentWillMount() {
		window.addEventListener('popstate', e => {
			this.setState({ back: true });
			this.Search(window.history.state.sha, window.history.state.type);
		})
	}

	onClick(e,type,sha){
		e.preventDefault();
		this.Search(sha,type);
	}

	onClickMap(){
		this.toggleMap();
	}

	toggleMap(){
		this.setState({ showMap: !this.state.showMap });
	}

    handleClick(e){
        console.log(e.currentTarget);
        this.setState({ setAnchorEl: e.currentTarget });
    }

    handleMenuItemClick(e, option) {
        console.log(option);
        this.setState({
            command: option,
            setAnchorEl: null 
        })
        this.toggleMap();
    }


    handleClose(e){
        this.setState({
            setAnchorEl: null 
        })
    }

	generateWarning(sha) {
		let warning = '';
		let isError = false;
		let len = sha.length;

		if(len != 40) {
			warning = 'Warning: A SHA1 must be 40 characters long.'
			isError = true;
		}
		else if(len == 0) {
			warning = 'Warning: No SHA1 specified.'
			isError = true;
		}

		return { warning, isError };
	}

	displayWarning(warning) {
		this.props.history.push('./error');
	}

	Search(sha, type) {
		let { warning, isError } = this.generateWarning(sha);
		let command = "showCnt";

		if(!isError) {
			this.props.lookupSha(sha, type, command)
			.then( (response) => {
				console.log(response);
				let result = response.data.stdout;
	
				if(!result) {
					warning = "Search returned nothing.";
					this.displayWarning(warning);
					isError = true;
				}

				if(!isError) {
					let stderr = response.data.stderr;
					let data = [];

					if (type == "blob") data = result;
					else data = result.split(/;|\r|\n/);

					if(!this.state.back) {
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
		} else this.displayWarning(warning);
	}

	generateTable() {
		let { data, type, sha } = this.state;
        let c_options = options["commit"];
		let spacer = "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
		if(type == 'commit'){
			let tree = data[1];
			let p = data[2];
			let author = data[3];
			let widest = author.length + 'rem';
			let a_time = data[5];
			let committer = data[4];
			let c_time = data[6];	
			return (
		      <div className="row justify-content-center">
		        <Card className="bg-secondary shadow border-0" style={{ width: {widest}, height: '29rem'}}>
			      <CardHeader>Lookup Results for Commit {sha}</CardHeader>
			        <CardBody>
					  <ListGroup>
				        <ListGroupItem>Tree: <a href="#" onClick={(e) => this.onClick(e,"tree",tree)}>{tree}</a></ListGroupItem>
				        <ListGroupItem>Parent: <a href="#" onClick={(e) => this.onClick(e,"commit",p)}>{p}</a>
						{spacer}
						<MenuButton 
                          color="primary" 
                          disabled={this.state.isLoading} 
                          onClick={this.handleClick}>
                        Map
                        </MenuButton>
                        <Menu
                          id="simple-menu"
                          anchorEl={this.state.setAnchorEl}
                          keepMounted
                          open={Boolean(this.state.setAnchorEl)}
                          onClose={this.handleClose}
                        >
                        {c_options.map((option) => (
                        <MenuItem
                            key={option}
                            selected={option === this.state.command}
                            onClick={(event) => this.handleMenuItemClick(event, option)}>
                            {option}
                        </MenuItem>
                        ))}
                        </Menu>
						</ListGroupItem>
				        <ListGroupItem>Author: {author}</ListGroupItem>
				        <ListGroupItem>Author Time: {a_time}</ListGroupItem>
				        <ListGroupItem>Committer: {committer}</ListGroupItem>
				        <ListGroupItem>Commit Time: {c_time}</ListGroupItem>
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
					  <td><a href="#" onClick={(e) => this.onClick(e,(mode === "040000") ? "tree" : "blob",sha)}>
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
				        <Markdown source={data} />
			          </CardBody>
			      </Card>
	            </div>
			)

		}
	}

	render() {
		const { sha, type } = this.state;
		console.log(this.state.showMap);
			return (
			<div>	
				{this.state.showMap && <Modal isOpen={this.state.showMap} centered={true} size="lg"
                    fade={false} toggle={this.toggleMap}>
                    <ModalBody>
                    Eat my ass there are starving kids in Africa. 
                    {this.state.command}
                    </ModalBody>
                    </Modal>}
		          {this.generateTable()}
			</div>
		)
	}
}

LookupResultsForm.propTypes = {
}

function mapStateToProps(state) {
	return {

	};
}

export default connect(mapStateToProps, {})(withRouter(LookupResultsForm));
