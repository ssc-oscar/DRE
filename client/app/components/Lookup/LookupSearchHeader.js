import React from "react";
import { Container, Row, Col } from "reactstrap";

class LookupSearchHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			option: ""
		}
	}

	render() {
		if(option == "showCnt") {
			return (
			  <div className="text-center mt-2">

