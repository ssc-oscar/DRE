import { getGraphData } from '../../../actions/getGraph';
import React, { Component } from "react";
import { connect } from 'react-redux';

// reactstrap components
import {
	Row,
	Card,
	CardHeader,
	CardBody,
} from "reactstrap";

import * as d3 from 'd3';

let width = 400;
let height = 400;	

class FastGraph extends Component {
	constructor(props) {
		super(props);
		this.fg = React.createRef()
	}

	makeGraph() {
		const svg = d3.select(this.fg.current)
			.attr("width", width)
  			.attr("height", height)
		.append("g");

		getGraphData({sha1: this.props.sha, command: 'getNeighbors', type: this.props.type}).then(response => {
			this.initGraph(response.data.stdout);
		});
	}

	componentDidMount() {
		this.makeGraph();
	}	

	render() {
		return (
			<Card className="shadow pr-0">
				<CardHeader className="border-1 mb-0 pb-0">
					<Row className="align-items-center">
						<div className="col">
							<h3 className="mb-0">FastGraph</h3>
						</div>
					</Row>
				</CardHeader>
				<CardBody className="text-center mx-0 my-0 px-0 py-0">
					<svg ref={this.fg}/>
				</CardBody>
			</Card>	
		);	
	}	

	getData(data) {
		data = data.filter(d => d.length === 4)
	
		const typeMap = {
			"P": {type: 'project', linkColor: "#aaa", linkOpacity: 1.0, nodeColor: '#f00'},
			"c": {type: 'commit',  linkColor: "#aaa", linkOpacity: 1.0, nodeColor: '#ff0'},
			"a": {type: 'author',  linkColor: "#aaa", linkOpacity: 0.2, nodeColor: '#00f'},
			"f": {type: 'file',    linkColor: "#aaa", linkOpacity: 0.3, nodeColor: '#0f0'},
		};
		
		let nodes = {};
		let links = [];
		
		const [from, type, to, value] = data[0];
		nodes[from] = {id: from, name: from, type: typeMap[type[0]].type, color: "#000"};
		for(let i = 0; i < data.length-1; ++i) {
			const [from, type, to, value] = data[i];
			const t = type.slice(-1);

			links.push({
				source: to,
				type: typeMap[t],
				target: value,
				value: value,
				color: typeMap[t].linkColor,
				opacity: typeMap[t].linkOpacity
			});

			if(nodes[value] === undefined) nodes[value] = {id: value, name: value, type: typeMap[t].type, color: typeMap[t].nodeColor || "#000000"};
		}
		nodes = Object.values(nodes);

		return {nodes, links};
	}

	initGraph(data) {

		const self = this;
		try {
			data = this.getData(data.split('\n').map(s => s.split(';')));
		} catch(error) {
			console.log(error);
			return;
		}

		const svg = d3.select(this.fg.current);
		svg.selectAll("*").remove();
		svg.attr("width", width)
  			.attr("height", height)
		.append("g");
		
		const nodes = svg.append("g")
				.attr("class", "nodes")
			.selectAll("circle")
			.data(data.nodes)
			.enter().append("g");
		
		const links = svg.append("g")
				.attr("class", "links")
			.selectAll("line")
			.data(data.links)
			.enter().append("line")
				.attr("stroke-width", 1)
				.attr("opacity", (link) => link.opacity)
				.style("stroke", (link) => link.color);
	
		const circles = nodes.append("circle")
				.attr("r", 5)
				.attr("stroke", -30)
				.attr("stroke-width", 2)
				.style("fill", (node) => node.color)
				.call(d3.drag()
					.on("start", dragstarted)
					.on("drag", dragged)
					.on("end", dragended));

		nodes.on("click", onClick);
		
		const simulation = d3.forceSimulation(data.nodes)
			.force("link", d3.forceLink()
				.id(d => d.id)
				.links(data.links))
			.force("charge", d3.forceManyBody())
			.force("center", d3.forceCenter(width / 2, height / 2));
			
		simulation.on("tick", () => {
			links
				.attr("x1", d => d.source.x )
				.attr("y1", d => d.source.y )
				.attr("x2", d => d.target.x )
				.attr("y2", d => d.target.y );
			nodes
				.attr("transform", d => "translate(" + d.x + "," + d.y + ")");
		});

		//////////// UI EVENTS ////////////
		function onClick(d) {
			self.props.handler(d.name, d.type);
			self.makeGraph();
		}
		function dragstarted(d) {
			if (!d3.event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		}
		function dragged(d) {
			d.fx = d3.event.x;
			d.fy = d3.event.y;
		}
		function dragended(d) {
			if (!d3.event.active) simulation.alphaTarget(0.0001);
			d.fx = null;
			d.fy = null;
		}

		// update size-related forces
		/*d3.select(window).on("resize", function(){
			width = +svg.nodes().getBoundingClientRect().width;
			height = +svg.nodes().getBoundingClientRect().height;
		});*/
	}
}

export default FastGraph;
