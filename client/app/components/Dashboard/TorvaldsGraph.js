import React from "react";

// reactstrap components
import { 
  Row,
  Card,
  CardHeader,
  CardBody,
  UncontrolledTooltip
 } from "reactstrap";
import { Graph } from 'react-d3-graph';

class TorvaldsGraph extends React.Component {
  constructor(props) {
    super(props);
    let { nodes, links } = this.transformStats(props.stats);
    this.state = {
      stats: props.stats,
      data: { nodes: nodes, links: links },
      ready: false
    }

    this.onMouseOverLink = this.onMouseOverLink.bind(this);
    this.onMouseOutLink = this.onMouseOutLink.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  transformStats(stats) {
    const { path, idx } = stats;
    const gap = 450/Math.ceil(path.length/2);
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
    this.handleLoad();
  }

  handleLoad() {
    const gap = 450/Math.ceil(this.state.stats.path.length/2);
    const x = 25;
    let currY = 25;
    const links = this.state.data.links;

    window.requestAnimationFrame(function() {
      const svg = document.getElementById('tridx-graph-container-zoomable');
      const triggers = document.getElementsByClassName('link');
      if (triggers !== undefined) {
        for (let i = 0; i < triggers.length; i++) {
          let tt = document.createElementNS("http://www.w3.org/2000/svg","text")
          const source = triggers[i].id.split(',')[0]
          const target = triggers[i].id.split(',')[1]
          const label = links.find(x => x.source == source && x.target == target).label
          tt.setAttribute('id', 'tt-' + triggers[i].id);
          tt.setAttribute('x', x+15);
          tt.setAttribute('y', currY + gap/2);
          tt.setAttribute('font-size', '12px');
          tt.textContent = 'Worked on: ' + label;
          tt.setAttribute('visibility', 'hidden');
        
          svg.appendChild(tt)
          currY += gap
        }
      }
    });
    // this.setState({ ready: true }, () => {});

    // let el = document.getElementById('tridx-graph-wrapper'),
    // elClone = el.cloneNode(true);
    // el.parentNode.replaceChild(elClone, el);
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

  onMouseOverLink(source, target) {
    let tt = document.getElementById(`tt-${source},${target}`);
    tt.setAttribute('visibility', 'visible');
  }

  onMouseOutLink(source, target) {
    let tt = document.getElementById(`tt-${source},${target}`);
    tt.setAttribute('visibility', 'hidden');
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
      "maxZoom": 1,
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
        <CardHeader style={styles.header} className="border-1 mb-0 pb-0">
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
            onMouseOverLink={this.onMouseOverLink}
            onMouseOutLink={this.onMouseOutLink}
            onClickGraph={this.onClickGraph}
          />
        </CardBody>
      </Card>
    );
  }
}

const styles = {
  header: {
      height: '100px'
  },
  body: {
    height: '500px'
  }
}

export default TorvaldsGraph;
