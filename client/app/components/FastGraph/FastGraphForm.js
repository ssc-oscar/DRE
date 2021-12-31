import React, { Component } from 'react';
// import { FilterableContent } from 'react-filterable-content';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Label,
    FormGroup
} from "reactstrap";

class FastGraphForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sha: '',
            isLoading: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        let sha = this.state.sha;
        this.setState({isLoading: true});

        this.props.history.push(`/fastgraphresults?sha1=${sha}&type=commit`);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
          <form onSubmit={this.onSubmit}>
            <Card className="bg-secondary shadow border-0" style={{ width: '30rem' }}>
                <CardBody className="px-lg-5 py-lg-5">
                  <Label>SHA1</Label>
                  <TextFieldGroup
                    focus={true}
                    label=""
                    onChange={this.onChange}
                    value={this.state.sha}
                    field="sha"
                  />
                  <FormGroup>
                    <Button color="primary" disabled={this.state.isLoading}>
                      GRAPH
                      {this.state.isLoading && <i className="ml-2 fa fa-spinner fa-spin"></i>}
                    </Button>
                  </FormGroup>
                </CardBody>
              </Card>
            </form>
        )
    }        
}

export default withRouter(FastGraphForm);
