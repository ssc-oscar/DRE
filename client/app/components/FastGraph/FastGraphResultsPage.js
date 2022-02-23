import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';
import FastGraph from './FastGraph.js';

class FastGraphResultsPage extends Component {
    constructor(props) {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const sha = params.get('sha1');
        const type = params.get('type');

        super(props);

        this.state = {
            type: type,
            sha: sha
        }
        this.handler = this.handler.bind(this);
    }

    handler(sha, type) {
        this.setState({
            type: type,
            sha: sha
        });
    }

    render() {
      const { lookupSha } = this.props;
      return (
        <div className="row justify-content-center">
          <Card className="bg-secondary shadow border-0">
            <CardBody>
              <FastGraph lookupSha={lookupSha} sha={this.state.sha} type={this.state.type} handler={this.handler}/>
            </CardBody>
          </Card>
        </div>
      )
    }
}

export default FastGraphResultsPage;
