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

class FastGraph extends Component {
	constructor(props) {
		super(props);
	}

	makeGraph() {
		getGraphData({sha: this.props.sha, type: this.props.type}).then(data => {
			this.initGraph(data.data);
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
							<div id="fg_vis"/>
						</div>
					</Row>
				</CardHeader>
				<CardBody className="text-center mx-0 my-0 px-0 py-0">
				</CardBody>
			</Card>	
		);	
	}	

	initGraph(data) {
		const self = this;

		/*
			TODO:
			zoom
			pan
		*/
		
		let width = 400;
		let height = 400;		

		d3.select("#SVGID").remove();

		const svg = d3.select("#fg_vis")
		.append("svg")
			.attr("id", "SVGID")
			.attr("width", width)
  		.attr("height", height)
		.append("g");
		
		const node = svg.append("g")
				.attr("class", "nodes")
			.selectAll("circle")
			.data(data.nodes)
			.enter().append("g");
		
		const link = svg.append("g")
				.attr("class", "links")
			.selectAll("line")
			.data(data.links)
			.enter().append("line")
				.attr("stroke-width", 1)
				.attr("opacity", (link) => link.opacity)
				.style("stroke", (link) => link.color);
	
		const circles = node.append("circle")
				.attr("r", 5)
				.attr("stroke", -30)
				.attr("stroke-width", 2)
				.style("fill", (node) => node.color)
				.call(d3.drag()
					.on("start", dragstarted)
					.on("drag", dragged)
					.on("end", dragended));

		node.on("click", onClick);
		
		const simulation = d3.forceSimulation(data.nodes)
			.force("link", d3.forceLink()
				.id(d => d.id)
				.links(data.links))
			.force("charge", d3.forceManyBody())
			.force("center", d3.forceCenter(width / 2, height / 2));
			
		simulation.on("tick", () => {
			link
				.attr("x1", d => d.source.x )
				.attr("y1", d => d.source.y )
				.attr("x2", d => d.target.x )
				.attr("y2", d => d.target.y );
			node
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
		d3.select(window).on("resize", function(){
			width = +svg.node().getBoundingClientRect().width;
			height = +svg.node().getBoundingClientRect().height;
		});
		
	}
}

export default FastGraph;
