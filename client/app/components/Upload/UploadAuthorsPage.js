import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";

class UploadAuthorsPage extends Component {
  render() {
    return (
      <Row className="justify-content-center">
        <Col>
          <Card>
            <CardHeader className="text-center">
              Author Identity Disambiguation Tool
            </CardHeader>
            <CardBody>
              <p>
                This page is for anyone seeking to utilize the backend capabilities of our tool.
                Specifically, if you have a list of author identities that need to be collated or
                disambiguated, please upload a <b>CSV</b> containing these author ids. Our backend
                will use our Disambiguation algorithm to find authors with multiple ids in your data
                set and attribute their multiple ids to just one id. Once the algorithm has finished,
                an email will be sent with the results to the email address you provided during signup!
              </p>
              <div className="text-center">
                <Button >Select File</Button>
              </div>
              <div className="text-center mt-5">
                <Button className="btn-default">Upload</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

UploadAuthorsPage.propTypes = {
}

export default withRouter(UploadAuthorsPage);