import React from "react";

// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
 }from "reactstrap";

 //import { styles } from './styles';

class ProjStatTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: props.stats,
      title: props.title,
      headers: props.headers
    }

    this.renderBody = this.renderBody.bind(this);
    this.renderHeaders = this.renderHeaders.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.setState({
        stats: nextProps.stats,
        title: nextProps.title,
        headers: nextProps.headers
      }, () => {});
    }
  }

  renderHeaders() {
    const { headers } = this.state;
    if (headers.length) {
      return headers.map((header, index) => {
        return (
          <th key={index} scope="col">{header}</th>
        )
      })
    }
  }

  renderBody() {
    let { stats } = this.state;
    if (stats) {
      stats.sort((a,b) => a.id > b.id);
      return stats.map((friend, index) => {
        const { id, projects } = friend;
        return (
            <tr key={index}>
              <th className="text-center" scope="row">
                <a
                href="#"
                onClick={(e) => {e.preventDefault(); this.props.onClickFriend(friend);}}
                >
                {id}
                </a>
              </th>
            </tr>
        )
      })
    }
  }

  render() {
    return (
      <Card className="shadow">
        <CardHeader style={styles.header} className="border-0">
          <Row className="align-items-center">
            <div className="col">
              <h3 className="mb-0">{this.state.title}</h3>
              <p className="text-muted">Click on a collaborator to view projects they've worked on</p>
            </div>
          </Row>
        </CardHeader>
        <Table style={styles.table} className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            {/* <tr>
              <th scope="col">Click on an author id view a summary</th>
            </tr> */}
          </thead>
          <tbody>
            {this.renderBody()}
            {/* <tr>
              <th scope="row">entry</th>
              <td>4,569</td>
              <td>340</td>
              <td>
                <i className="fas fa-arrow-up text-success mr-3" />{" "}
                46,53%
              </td>
            </tr> */}
          </tbody>
        </Table>
      </Card>
    );
  }
}

/* I defined the styles here to ensure that
 * this card, and the card it's next to
 * have the same height */
const styles = {
    header: {
        height: '100px'
    },
    table: {
        'height': '500px',
        'overflow': 'scroll',
        'display': 'block'
    }
}

export default ProjStatTable;
