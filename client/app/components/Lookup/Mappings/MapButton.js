import PropTypes from 'prop-types';
import React, { useEffect, useState, Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Router } from "react-router-dom";
import { connect } from 'react-redux';
import { options } from '../options';
import { CommitMap } from './CommitMap';
import { AuthorMap } from './AuthorMap';
import { BlobMap } from './BlobMap';
import { FileMap } from './FileMap';
import { ProjectMap } from './ProjectMap';
import { lookupSha } from '../../../../actions/Search';
import '../modal.css';
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
	Modal,
	ModalHeader,
	ModalBody,
} from "reactstrap";

class MapButton extends Component{
	constructor(props){
		super(props);

		this.state = {
			query: '',
			data: [],
			from: '',
            type: '',
            showMap: false,
            Anchor: null,
            isLoaded: false
		}

	    this.onClick = this.onClick.bind(this);
        this.toggleMap = this.toggleMap.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);

	}

    componentDidMount() {
        console.log(this.props);
        this.setState({
            query: this.props.query,
            from: this.props.from,
            isLoaded: true
        })
    }

	toggleMap(){
		this.setState({ 
			showMap: !this.state.showMap,
		});
	}

	onClick(e,type){
		e.preventDefault();
		this.Search(type);
	}

    handleClick(e){
        this.setState({ Anchor: e.currentTarget });
    }

    handleClose(e){
        console.log("handleClose");
        this.setState({ Anchor: null })	
	}	

    Search(type) {
        this.props.lookupSha(this.state.query, type, "getValues")
            .then( (response) => {
                console.log(response);
                let result = response.data.stdout;
                let stderr = response.data.stderr;
                let data = [];
                data = result.split(/;|\r|\n/);
                this.setState({
                    data: data,
                    type: type,
					showMap: !this.state.showMap,
					Anchor: null
                });
            });
    }

    renderButton() {
        let from = this.state.from;
        return (
            <>
              <span className="float-right">
                <MenuButton 
                  color="primary" 
                  disabled={this.state.isLoading} 
                  onClick={(e) => this.handleClick(e)}>
                  Map
                </MenuButton>
              </span>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.Anchor}
                  keepMounted
                  open={Boolean(this.state.Anchor)}
                  onClose={this.handleClose}>
                {Object.keys(options[from]).map((to) => (
                  <MenuItem
                    key={options[from][to]}
                    onClick={(e) => this.onClick(e, from[0]+"2"+options[from][to])}>
                    {to}
                  </MenuItem>
                  ))}
                </Menu>
            </>
        )
    }

    renderModal() {
        let props = { state:{sha:this.state.query, type:this.state.type, data:this.state.data} };

        if(this.state.from === "commit") return CommitMap(props);
        else if(this.state.from === "author") return AuthorMap(props);
        else if(this.state.from === "blob") return BlobMap(props);
        else if(this.state.from === "file") return FileMap(props);
        else if(this.state.from === "project") return ProjectMap(props);
    }

	
	render() {
		return (
            <>
             {this.state.isLoaded && this.renderButton()}
			 {console.log(this.state.data)}
             {this.state.data && <Modal isOpen={this.state.showMap} centered={true} size="lg"
                fade={false} toggle={this.toggleMap}>
                <ModalBody>
                  {this.renderModal()}
                </ModalBody>
              </Modal>}
            </>
		);
	}
}


MapButton.propTypes = {
}

function mapStateToProps(state) {
        return { };
}

export default connect(null, { lookupSha }) (MapButton);
