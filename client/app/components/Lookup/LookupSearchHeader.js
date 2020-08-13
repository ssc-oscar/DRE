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
		let option = this.props.option;
		if(option == "showCnt") {
			return (
			  <div className="text-center mt-2">
				 <p>
					Search on a SHA1 hash
				 </p>
			  </div> 
			)
		}
		else {
			return (
			  <div className="text-center mt-2">
				 <p>
					Search for SHA1 MAPPINGS
				 </p>
			  </div> 
			)
		}
	}
}

export default LookupSearchHeader;
