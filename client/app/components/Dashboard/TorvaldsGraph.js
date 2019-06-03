import React from "react";

// reactstrap components
import { 
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Table,
  UncontrolledTooltip
 } from "reactstrap";
import { Graph } from 'react-d3-graph';

class TorvaldsGraph extends React.Component {
  constructor(props) {
    super(props);
    let { nodes, links } = this.transformStats(props.stats);
    this.state = {
      stats: props.stats,
      data: { nodes: nodes, links: links }
    }

    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  transformStats(stats) {
    const { path, idx } = stats;
    const gap = 450/Math.ceil(path.length/2);
    console.log(gap);
    const x = 25;
    let currY = 25;
    let i;
    let nodes = [];
    let links = [];

    for (i = 0; i < path.length; i++) {
      if (i % 2 == 0) {
        if (i == 0) {
          nodes.push({
            id: path[i],
            color: "rgb(244, 117, 96)",
            x: x,
            y: currY
          });
        }
        else if (i == path.length - 1) {
          nodes.push({
            id: path[i],
            color: "rgb(244, 117, 96)",
            x: x,
            y: currY
          });
        }
        else {
          nodes.push({
            id: path[i],
            color: "rgb(97, 205, 187)",
            x: x,
            y: currY
          });
        }
        currY += gap;
      }
      else {
        links.push({
          source: path[i-1],
          target: path[i+1],
          label: path[i]
        });
      }
    }

    return { nodes, links }
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
  }

  handleLoad() {
    let tt = document.createElementNS("http://www.w3.org/2000/svg","text")
    tt.setAttribute('id', 'tooltip');
    tt.setAttribute('font-size', '12px');
    tt.textContent = 'Tooltip';
    tt.setAttribute('visibility', 'hidden');
    const svg = document.getElementsByTagName('svg')[1];
    svg.appendChild(tt);

    const triggers = document.getElementsByClassName('link');
    for (let i = 0; i < triggers.length; i++) {
      triggers[i].addEventListener('mousemove', this.showTooltip);
      triggers[i].addEventListener('mouseout', this.hideTooltip);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      const stats = nextProps.stats;
      
      if (stats) {
        let { nodes, links } = this.transformStats(stats);
        this.setState({ stats: stats, data: { nodes: nodes, links: links } }, () => {});
      }
    }
  }

  showTooltip(e) {
    const tooltip = document.getElementById('tooltip');
    const source = e.target.id.split(',')[0]
    const target = e.target.id.split(',')[1]
    const label = this.state.data.links.find(x => x.source == source && x.target == target).label
    const svg = document.getElementsByTagName('svg')[1];
    const CTM = svg.getScreenCTM();
    const mouseX = (e.clientX - CTM.e) / CTM.a;
    const mouseY = (e.clientY - CTM.f) / CTM.d;
    tooltip.setAttributeNS(null, "x", mouseX + 20 / CTM.a);
    tooltip.setAttributeNS(null, "y", mouseY + 15 / CTM.d);
    tooltip.textContent = 'Worked on: ' + label;
    tooltip.setAttributeNS(null, "visibility", "visible");
  }

  hideTooltip(e) {
    const tooltip = document.getElementById('tooltip');
    tooltip.setAttributeNS(null, "visibility", "hidden");
  }

  render() {
    const myConfig = {
      "automaticRearrangeAfterDropNode": false,
      "collapsible": false,
      "directed": false,
      "focusAnimationDuration": 0.75,
      "focusZoom": 1.2,
      "height": 500,
      "highlightDegree": 1,
      "highlightOpacity": 0.2,
      "linkHighlightBehavior": true,
      "maxZoom": 2,
      "minZoom": 1,
      "nodeHighlightBehavior": true,
      "panAndZoom": true,
      "staticGraph": true,
      "width": 500,
      "d3": {
        "alphaTarget": 0.05,
        "gravity": -200,
        "linkLength": 300,
        "linkStrength": 1
      },
      "node": {
        "color": "#d3d3d3",
        "fontColor": "black",
        "fontSize": 12,
        "fontWeight": "normal",
        "highlightColor": "SAME",
        "highlightFontSize": 12,
        "highlightFontWeight": "bold",
        "highlightStrokeColor": "SAME",
        "highlightStrokeWidth": 1.5,
        "labelProperty": "id",
        "mouseCursor": "pointer",
        "opacity": 1,
        "renderLabel": true,
        "size": 450,
        "strokeColor": "black",
        "strokeWidth": 1,
        "svg": "",
        "symbolType": "circle"
      },
      "link": {
        "color": "#d3d3d3",
        "fontColor": "black",
        "fontSize": 8,
        "fontWeight": "normal",
        "highlightColor": "rgb(232, 193, 160)",
        "highlightFontSize": 8,
        "highlightFontWeight": "normal",
        "labelProperty": "label",
        "mouseCursor": "pointer",
        "opacity": 1,
        "renderLabel": false,
        "semanticStrokeWidth": false,
        "strokeWidth": 4
      }
    }
    return (
      <Card className="shadow pr-0">
        <CardHeader className="border-1 mb-0 pb-0">
          <Row className="align-items-center">
            <div className="col">
              <h3 className="mb-0">Your Torvalds Index:</h3>
              <h1 id="torvalds">{this.state.stats.idx}</h1>
              <UncontrolledTooltip placement="left" target="torvalds">
              The number of "hops", in terms of collaborators, you are away from Linus Torvalds.
              </UncontrolledTooltip>
            </div>
          </Row>
        </CardHeader>
        <CardBody style={styles.body} className="text-center mx-0 my-0 px-0 py-0">
          <Graph
            id="tridx"
            data={this.state.data}
            config={myConfig}
            // onMouseOverLink={() => this.onMouseOverLink(e)}
            onClickGraph={this.onClickGraph}
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

export default TorvaldsGraph;
