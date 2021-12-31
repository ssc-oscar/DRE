import React, { Component } from 'react';
// import { FilterableContent } from 'react-filterable-content';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Multiselect } from 'multiselect-react-dropdown';
import { saveAs } from 'file-saver';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from '@material-ui/lab/DatePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from 'material-ui/lab/LocalizationProvider';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
} from "reactstrap";
import {
    FormControl,
    MenuItem,
    Select,
    TextField
}from '@material-ui/core';


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
		this.chooseSampling = this.chooseSampling.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
        if(!date) return;
		let sd = parseInt(date.getTime()/1000).toFixed(0);
		this.setState( (state) => {
			return { startDate: date, unixStart: sd }
		});
	}
	handleEndSelect(date) {
        if(!date) return;
		let ed = parseInt(date.getTime()/1000).toFixed(0);
		this.setState( (state) => {
			return { endDate: date, unixEnd: ed }
		});
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
	handleChange(e) {
		console.log(this.state.activityRange);
		this.setState({
			[e.target.name]: e.target.checked
		})
	}

	render() {
        let spacer  = "\xa0\xa0";
        return (
            <form onSubmit={this.onSubmit}>
              <Card className="bg-secondary shadow border-0" style={{ width: '30rem'}}>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center mt-2">
                    <FormControl variant="standard" >
                      <div>
                        Sample: {spacer}
                        <Select value={this.state.sampleType} onChange={this.onChange} name="sampleType">
                          <MenuItem value="Projects">Projects</MenuItem>
                          <MenuItem value="Authors">Authors</MenuItem>
                        </Select>
                      </div>
                    </FormControl>
                  </div>
                <FormGroup>
                  <div className="text-center mt-2">
                    By: {spacer}
                    <FormControlLabel
                      control={
                        <Checkbox checked={this.state.activityRange} 
                        onChange={this.handleChange} 
                        name="activityRange" 
                        />
                      }
                      label="Activity Range"
                    />
                  <FormControlLabel
                    control={
                      <Checkbox checked={this.state.languages} 
                        onChange={this.handleChange} 
                        name="languages" 
                      />
                    }
                    label="Language Usage"
                  />
                </div>
              </FormGroup>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                renderInput={props => 
                  <TextField 
                    label="Start Date"
                    margin="normal"
                    fullWidth={true}
                    id="date-picker-dialog"
                  />
                }
                inputFormat="MM/dd/yyyy"
                value={this.state.startDate}
                onChange={this.handleStartSelect}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                renderInput={props => 
                  <TextField 
                    label="Start Date"
                    margin="normal"
                    fullWidth={true}
                    id="date-picker-dialog"
                  />
                }
                inputFormat="MM/dd/yyyy"
                value={this.state.endDate}
                onChange={this.handleEndSelect}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </LocalizationProvider>
              <p/>
            <div>
              <Label>Language Used:&nbsp;
                <Multiselect
                  options={this.state.options} // Options to display in the dropdown
                  selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                  onSelect={this.onSelect} // Function will trigger on select event
                  onRemove={this.onRemove} // Function will trigger on remove event
                  displayValue="Language" // Property name to display in the dropdown options
                /> 
                  <p/>
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
