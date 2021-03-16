import PropTypes from 'prop-types';
import React, { useEffect, useState, Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Router } from "react-router-dom";
import { connect } from 'react-redux';
import FastGraph from './FastGraph';
import { lookupSha } from '../../../actions/Search';
import '../common/modal.css';

import {
    Button as MenuButton,
    FormControl,
    Menu,
    MenuItem,
    InputLabel,
    Select
} from '@material-ui/core';

import {
    Card,
    CardBody,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';

class GraphButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
			sha: '',
			type: '',
            showGraph: false,
            isLoaded: false
        }
        this.toggleGraph = this.toggleGraph.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handler = this.handler.bind(this);
    }

	componentDidMount() {
		this.setState({
			sha: this.props.sha,
			type: this.props.type,
			isLoaded: true
		})
	}
    
    handler(sha, type) {
        this.setState({
            type: type,
            sha: sha
        });
    }

	toggleGraph(){
		this.setState({ 
			showGraph: !this.state.showGraph,
		});
	}

	handleClick(e){
		this.setState({ 
            showGraph: !this.state.showGraph 
        });
	}

	renderButton() {
		return (
			<>
			<span className="float-right">
			<MenuButton 
			color="primary" 
			disabled={this.state.isLoading} 
			onClick={(e) => this.handleClick(e)}>
			Graph
			</MenuButton>
			</span>
			</>
		);
	}

	renderModal() {
		return (
            <Card className="bg-secondary shadow border-0">
              <CardBody>
                <FastGraph sha={this.state.sha} type={this.state.type} handler={this.handler}/>
              </CardBody>
            </Card>
		)

	}

	render() {
		return (
			<>
			  {this.renderButton()}
			  <Modal isOpen={this.state.showGraph} centered={true} size="lg"
			    fade={false} toggle={this.toggleGraph}>
			    <ModalBody>
				  {this.renderModal()}
				</ModalBody>
			  </Modal>
			</>
		);
	}
}


GraphButton.propTypes = {
}

function mapStateToProps(state) {
        return { };
}

export default connect(null, { lookupSha }) (GraphButton);
