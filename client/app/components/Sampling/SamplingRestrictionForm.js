import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Multiselect } from 'multiselect-react-dropdown';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  Button,
  Card,
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
				   {"Id": "Ada", "Language": "Ada"}, 
				   {"Id": "C/C++", "Language": "C/C++"}, 
				   {"Id": "Cobol", "Language": "COBOL"}, 
				   {"Id": "C#", "Language": "CSharp"}, 
				   {"Id": "Erlang", "Language": "Erlang"}, 
				   {"Id": "fml", "Language": "FML"}, 
				   {"Id": "Fortran", "Language": "Fortran"}, 
				   {"Id": "Go", "Language": "Go"}, 
				   {"Id": "Java", "Language": "Java"}, 
				   {"Id": "JavaScript", "Language": "Javascript"}, 
				   {"Id": "TypeScript", "Language": "Typescript"}, 
				   {"Id": "Julia", "Language": "JL"}, 
				   {"Id": "Lisp", "Language": "Lisp"}, 
				   {"Id": "Lua", "Language": "Lua"}, 
				   {"Id": "Perl", "Language": "Perl"}, 
				   {"Id": "PHP", "Language": "PHP"}, 
				   {"Id": "Python", "Language": "Python"}, 
				   {"Id": "R", "Language": "R"}, 
				   {"Id": "Ruby", "Language": "Ruby"},  
				   {"Id": "Rust", "Language": "Rust"},  
				   {"Id": "Scala", "Language": "Scala"},  
				   {"Id": "Sql", "Language": "SQL"},  
				   {"Id": "Swift", "Language": "Swift"},  
				   {"Id": "Kotlin", "Language": "Kotlin"},  
				   {"Id": "Clojure", "Language": "Clojure"},  
				   {"Id": "OCaml", "Language": "OCaml"},  
				   {"Id": "Basic", "Language": "Basic"},  
				   {"Id": "Dart", "Language": "Dart"},  
				   {"Id": "ipy", "Language": "IpythonNotebook"},  
				   {"Id": "Other", "Language": "Other"}  
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
    console.log({date})
    if(!date) return;
		let sd = parseInt(date.getTime()/1000).toFixed(0);
    console.log({sd})
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
		} else {
      if( e.target.value == "Projects" ){
			  this.setState({sampleType: "Projects"});
      }else{
        this.setState({sampleType: "APIs"});
      }
		}
	}
	handleChange(e) {
		console.log(e.target.name, this.state.activityRange);
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
                          <MenuItem value="APIs">APIs</MenuItem>
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
                    {...props}
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
              <DatePicker
                label="End Date"
                renderInput={props => 
                  <TextField 
                    {...props}
                    fullWidth={true}
                  />
                }
                inputFormat="MM/dd/yyyy"
                value={this.state.endDate}
                onChange={(date) => { this.handleEndSelect(date)}}
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
