import React from "react";

// reactstrap components
import { Container, Row, Col, Card, CardHeader, Button, Table } from "reactstrap";
import { styles } from './styles';

class ProjStatTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: [],
      title: '',
      headers: []
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
      if (this.state.title == 'Your Projects')
        stats.sort((a,b) => b.nMyC - a.nMyC);
      else
        stats.sort((a,b) => b.nc - a.nc);
      return stats.map((proj, index) => {
        if (this.state.title == 'Your Projects') {
          const { nC, url, name, nMyC } = proj
          return (
              <tr key={index}>
                <th scope="row"><a href={`${url}`} target="_blank">{name}</a></th>
                <td>{nMyC}</td>
                <td>{nC}</td>
              </tr>
          )
        }
        else {
          const { nc, name, nAuth } = proj
          return (
              <tr key={index}>
                <th scope="row">{name}</th>
                <td>{nc}</td>
                <td>{nAuth}</td>
              </tr>
          )
        }
      })
    }
  }

  render() {
    return (
      <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <div className="col">
              <h3 className="mb-0">{this.state.title}</h3>
            </div>
            {/* <div className="col text-right">
              <Button
                color="primary"
                href="#pablo"
                onClick={e => e.preventDefault()}
                size="sm"
              >
                See all
              </Button>
            </div> */}
          </Row>
        </CardHeader>
        <Table style={styles.table} className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              {this.renderHeaders()}
            </tr>
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

export default ProjStatTable;
