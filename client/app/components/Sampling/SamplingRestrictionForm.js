import React, { Component } from 'react';
import { FilterableContent } from 'react-filterable-content';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import DatePicker from "react-datepicker";
import { Multiselect } from 'multiselect-react-dropdown';
import { saveAs } from 'file-saver';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  InputGroup,
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";


class SamplingRestrictionForm extends Component {

	constructor(props){
		super(props);
		this.state = {
			activityRange: false,
			sampleType: "Projects",
			languages: false,
			files: false,
			startDate: new Date(),
			endDate: new Date(),
			unixStart: 0,
			unixEnd: 0,
			isLoading: false,
			selected: [{ Id: "tmp", Language: "tmp"}],
			options: [ 
				   {"Id": "total_ada_files", "Language": "Ada"}, 
				   {"Id": "total_c_or_c++_files", "Language": "C/C++"}, 
				   {"Id": "total_cob_files", "Language": "COBOL"}, 
				   {"Id": "total_csharp_files", "Language": "CSharp"}, 
				   {"Id": "total_erlang_files", "Language": "Erlang"}, 
				   {"Id": "total_fml_files", "Language": "FML"}, 
				   {"Id": "total_fortran_files", "Language": "Fortran"}, 
				   {"Id": "total_go_files", "Language": "Go"}, 
				   {"Id": "total_java_files", "Language": "Java"}, 
				   {"Id": "total_javascript_files", "Language": "Javascript"}, 
				   {"Id": "total_jl_files", "Language": "JL"}, 
				   {"Id": "total_lisp_files", "Language": "Lisp"}, 
				   {"Id": "total_lua_files", "Language": "Lua"}, 
				   {"Id": "total_perl_files", "Language": "Perl"}, 
				   {"Id": "total_php_files", "Language": "PHP"}, 
				   {"Id": "total_python_files", "Language": "Python"}, 
				   {"Id": "total_r_files", "Language": "R"}, 
				   {"Id": "total_ruby_files", "Language": "Ruby"},  
				   {"Id": "total_rust_files", "Language": "Rust"},  
				   {"Id": "total_scala_files", "Language": "Scala"},  
				   {"Id": "total_sql_files", "Language": "SQL"},  
				   {"Id": "total_swift_files", "Language": "Swift"}  
				 ]

		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.onRemove = this.onRemove.bind(this);
		this.handleStartSelect = this.handleStartSelect.bind(this);
		this.handleEndSelect = this.handleEndSelect.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.chooseSampling = this.chooseSampling.bind(this);

	}


	onSubmit(e) {
	  e.preventDefault();
	  //this.setState({ isLoading: true });
	  console.log(this.state);
	  this.props.getSampling( this.state )
	  .then((sampling) => {
	    console.log( sampling );
	    var FileSaver = require('file-saver');
	    var blob = new Blob([JSON.stringify(sampling)], {type: "application/json"});
	    FileSaver.saveAs(blob, "sampling.json");
	  },
	  (err) => { console.log(err) }
	  );
	}
	
	
	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	onSelect(e) {
		this.setState( { selected: e } );
	}
	onRemove(e) {
		this.setState( { selected: e } );
	}

	handleStartSelect(date) {
		let sd = parseInt(date.getTime()/1000).toFixed(0);
		this.setState( (state) => {
			return { startDate: date, unixStart: sd }
		});
	}
	handleEndSelect(date) {
		let ed = parseInt(date.getTime()/1000).toFixed(0);
		this.setState( (state) => {
			return { endDate: date, unixEnd: ed }
		});
	}
	handleClick(e) {
		if( e.target.name == "activityRange" ) this.setState({activityRange: true});
		else if( e.target.name == "languages" ) this.setState({languages: true});
		else if( e.target.name == "files" ) this.setState({files: true});
	}
	chooseSampling(e) {
		console.log("Here");
		if( e.target.value == "Authors" ) {
			this.setState({sampleType: "Authors"});
		}
		else {
			this.setState({sampleType: "Projects"});
		}
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
			  <Card className="bg-secondary shadow border-0" style={{ width: '30rem'}}>
			    <CardHeader className="bg-transparent">
			      <div className="text-center mt-2">
			        <p>
			          Sample Projects or Authors
			        </p>
			      </div>
				<select onChange={this.chooseSampling}>
				  <option value="Projects">Projects</option>
				  <option value="Authors">Authors</option>
				</select>
			    </CardHeader>
			      <Label>
				  &nbsp;Activity Range:&nbsp;
				  <input
				    name="activityRange"
				    type="checkbox"
				    onChange={this.handleClick}  />
				 <Label>&nbsp;&nbsp;
				  Language Usage:&nbsp;
				  <input
				    name="languages"
				    type="checkbox"
				    onChange={this.handleClick} />
				 </Label>
                </Label>
		    <CardBody className="px-lg-5 py-lg-5">
				<Label>
				Start Date:&nbsp; 
				<DatePicker 
				  selected={this.state.startDate}
				  onSelect={this.handleStartSelect} // Function will trigger on select event
				  selectsStart
				  startDate={this.startDate}
				  endDate={this.state.endDate}
				  showMonthDropdown
				  showYearDropdown
				/>
				</Label>	
				<Label>End Date:&nbsp;&nbsp;&nbsp; 
			        <DatePicker 
				  selected={this.state.endDate}
				  onSelect={this.handleEndSelect} // Function will trigger on select event
				  selectsEnd
				  startDate={this.startDate}
				  endDate={this.state.endDate}
				  minDate={this.state.startDate}
				  showMonthDropdown
				  showYearDropdown
			       />
			       </Label>	
			      
			
				<div>
				<Label>Language Used:&nbsp;
				
				<Multiselect
				options={this.state.options} // Options to display in the dropdown
				selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
				onSelect={this.onSelect} // Function will trigger on select event
				onRemove={this.onRemove} // Function will trigger on remove event
				displayValue="Language" // Property name to display in the dropdown options
				/> 
				</Label>
			      </div>
			      <FormGroup>
			        <Button color="primary" disabled={this.state.isLoading}>
			          Search
			          {this.state.isLoading && <i className="ml-2 fa fa-spinner fa-spin"></i>}
			        </Button>
			      </FormGroup>
			    </CardBody>
			  </Card>
			</form>

 
		);
	}
}


SamplingRestrictionForm.propTypes = {
  getSampling: PropTypes.func.isRequired,
}



function mapStateToProps(state) {
	return {

	};
}

export default connect(mapStateToProps, {})(withRouter(SamplingRestrictionForm));
