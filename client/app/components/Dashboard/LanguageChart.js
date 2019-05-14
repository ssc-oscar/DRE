import React from "react";

// reactstrap components
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Table } from "reactstrap";
import { ResponsivePie } from '@nivo/pie';

class LanguageChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: [],
      value: false
    }

    // this.renderBody = this.renderBody.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      const stats = nextProps.stats;
      
      if (stats) {
        const keys = Object.keys(stats);
        let transformed = []
        for (const k of keys) {
          transformed.push({ value: stats[k], id: k, label: k})
        }
        this.setState({ stats: transformed }, () => console.log(this.state));
      }
    }
  }

  // renderBody() {
  //   let { stats } = this.state;
  //   console.log('got stats', stats);
  //   if (stats) {
  //     console.log('about to sort', stats);
  //     stats.sort((a,b) => b.nMyC - a.nMyC);
  //     return stats.map((proj, index) => {
  //       const { nC, url, name, nMyC } = proj //destructuring
  //       return (
  //           <tr key={index}>
  //             <th scope="row"><a href={`${url}`} target="_blank">{name}</a></th>
  //             <td>{nMyC}</td>
  //             <td>{nC}</td>
  //           </tr>
  //       )
  //     })
  //   }
  // }

  render() {
    const { value } = this.state;
    return (
      <Card className="shadow pr-0">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <div className="col">
              <h3 className="mb-0">Your Coding Languages</h3>
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
        <CardBody style={styles.body} className="text-center">
          <ResponsivePie
          data={this.state.stats}
          margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
          innerRadius={0.4}
          padAngle={4}
          cornerRadius={3}
          sortByValue={true}
          colors={{ scheme: 'pastel1' }}
          borderWidth={3}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor="#333333"
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
          radialLabelsLinkStrokeWidth={1}
          radialLabelsLinkColor={{ from: 'color' }}
          slicesLabelsSkipAngle={1}
          slicesLabelsTextColor="#333333"
          isInteractive={true}
          theme={theme}
          motionStiffness={10}
          motionDamping={5}
          // legends={[
          //     {
          //         anchor: 'bottom',
          //         direction: 'row',
          //         translateY: 56,
          //         itemWidth: 75,
          //         itemHeight: 18,
          //         itemTextColor: '#999',
          //         symbolSize: 18,
          //         symbolShape: 'circle',
          //         effects: [
          //             {
          //                 on: 'hover',
          //                 style: {
          //                     itemTextColor: '#000'
          //                 }
          //             }
          //         ]
          //     }
          // ]}
      />
        </CardBody>
      </Card>
    );
  }
}

const styles = {
  body: {
    height: '500px'
  }
}

const theme = {
  labels: {
    text: {
      fontSize: 14
    }
  }
}

export default LanguageChart;
