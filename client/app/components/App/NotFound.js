import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { Button, Row, Card, CardHeader, CardBody } from 'reactstrap';

class NotFound extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
          errorMsg: '',
          backLoc: '',
      }
  }

  componentDidMount() {
      this.setState({ errorMsg: this.props.errorMsg, backLoc: this.props.backLoc });
  }

  defineError(errorMsg) {
      if(errorMsg = "Search returned nothing") {

          const fullError = '# This search returned no results \n\n' +
                            '### There are two likely causes for this error: \n' +
                            '- The SHA entered does not exist in our database. \n' +
                            '- The type selected did not match the type of the SHA.';

          return(fullError);
      }
  }

  displayError(errorMsg) {
      const fullError = this.defineError(errorMsg);
      
      if(errorMsg) {
          return (
              <Card className="bg-secondary shadow border-0" style={{ width: '30rem' }}> 
                <CardBody> <Markdown children={fullError} /> </CardBody>
              </Card>
          )
      }
  }

  backButton(backLoc) {

      if(!backLoc) {
          return (
            <Button onClick={() => this.props.history.push('/')}>Back to Home</Button>
          )
      }
      else if(backLoc == "lookup") {
          return (
            <Button onClick={() => this.context.router.history.push('/lookup')}>Back to Lookup</Button>
          )
      }
  }

  render() {
      console.log(this.state.errorMsg);
      let spacer = "\xa0"
    return (
        <>
        <div className="row justify-content-center">
        {this.displayError(this.state.errorMsg)}
        </div>
        {spacer}
        <div className="row justify-content-center">
        {this.backButton(this.state.backLoc)}
        </div>
        </>
    );
  }
}

NotFound.contextTypes = {
  router: PropTypes.object.isRequired
}

export default NotFound;
