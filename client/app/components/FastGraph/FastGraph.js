import React, { Component } from "react";

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

import * as d3 from 'd3';

class FastGraph extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const search = window.location.search;
		const params = new URLSearchParams(search);
		this.getData(params).then(data => {
			this.initGraph(data);
		});
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
	generateWarning(sha) {
		if(!sha || sha.length == 0) return {warning: 'Warning: No SHA1 specified.', isError: true };
		else if(sha.length != 40)	return { warning: 'Warning: A SHA1 must be 40 characters long.', isError: true };
		else return { warning: '', isError: false };
	}

	lookupSha(sha, type) {
		let command = 'getValues'
		if(['commit', 'blob', 'tree'].includes(type))
			command = 'showCnt'

		return this.props.lookupSha(sha, type, command)
			.then(response => {
				const result = response.data.stdout;
				if(!result)	throw(response.data.stderr);
				return result.split(/;|\r|\n/).slice(1).filter(v => !!v);
			});
	}

	Sha2Val(sha, traversal) {
		const type = traversal[0] + '2' + traversal[1];
		return this.lookupSha(sha, type)
			.then(data => {
				return Promise.all(data.map(v => {
					return (traversal.length == 2) ? v : this.Sha2Val(v, traversal.slice(1));
				})).then(v => v.flat());
			});
	}

	
	// ['c', 'a'] 			 						=> [ca] 
	// ['c', ['a', 'P']] 						=> [[ca], [cp]]
	// ['c', ['a', 'P'], 'b'] 			=> [[cab], [cPb]]
	// ['c', ['a', ['P','D']], 'b'] => [[cab],[[cPb],[cDb]]]
	// [['c', 'a'], 'D'] 						=> [[cD], [aD]]
	// [[['c'], ['a']], ['b'], ['f']] 		=> [[[cbf]], [[abf]]]

	Sha2Val2(sha, traversal) {
		
		let returnVal = [];
		
		let curr = traversal[0];
		let next = traversal[1];

		for(let i = 1; i < traversal.length-1; ++i){	
	
			const step = returnVal.concat((function Sha2ValRecurse(sha, sub0, sub1) {
				//convert to arrays if not
				sub0 = Array.of(sub0).flat();
				sub1 = Array.of(sub1).flat();
				
				console.log('sub0: ', sub0);
				console.log('sub1: ', sub1);
				
				//iterate over all elements at this level
				let ret = [];
				for(let j = 0; j < sub0.length; ++j){
					if(Array.isArray(sub0[j])){
						//if element is an array, recurse
						ret.push(Sha2ValRecurse(sha, sub0[j], sub1));
					} else {
						//else, compare this element with every other element in sub1
						for(let k = 0; k < sub1.length; ++k){
							//if element is an array, recurse
							if(Array.isArray(sub1[k])){
								ret = ret.concat(Sha2ValRecurse(sha, sub0[j], sub1[k]));
							} else {
								//do normal comparison between sub0[j] and sub1[k]
								ret.push([sub0[j], sub1[k]]);
							}
						}
					}
				}
				return ret;
			})(sha, curr, next));

			curr = step;
			next = [traversal[i+1]];
			console.log('curr: ', curr, 'next: ', next);

		}

		return curr;
	}

	getData(params) {
		const sha  = params.get('sha1');
		const type = params.get('type');
		const { warning, isError } = this.generateWarning(sha);
		if(isError) {
			console.log('Error: ', warning);
			return null;
		}

		let commit;
		if(type !== 'commit')
			commit = this.lookupSha(sha, type[0] + '2c')[0];
		else
			commit = sha;
		
		let nodes = []
		let links = {};
		return this.Sha2Val(sha, ['c', 'P', 'c']).then(commits => {
			let promises = [];
			let promiseAll = [];

			for(let i = 0; i < commits.length; ++i){
				const commit = commits[i];
				if(!nodes.includes(commit))	nodes.push({value: commit, type: 'commit'});
				promises.push(this.lookupSha(commit, 'commit').catch(()=>{}));
			};
			promiseAll.push(Promise.all(promises).then(cdata => {
				for(let i = 0; i < cdata.length; ++i){
					const commit = commits[i];

					const commitParent = cdata[i][1];
					if(!nodes.includes(commitParent)) nodes.push({value: commitParent, type: 'commit'});

					const str = [commit, commitParent].sort().join(',');
					links[str] = {source: commit, target: commitParent, type: 'parent'};

					const commitAuthor = cdata[i][2];
					if(!nodes.includes(commitAuthor)) nodes.push({value: commitAuthor, type: "author"});
					
					const astr = [commit, commitAuthor].join(',');
					links[astr] = {source: commit, target: commitAuthor, type: 'author'};
				}
			}));
			promises = [];

			for(let i = 0; i < commits.length; ++i)
				promises.push(this.Sha2Val(commits[i], ['c', 'f']).catch(()=>{}));
			promiseAll.push(Promise.all(promises).then(fdata => {
				for(let i = 0; i < fdata.length; ++i) {
					const commitFiles = fdata[i];
					for(let j = 0; j < commitFiles.length; ++j){
						const commitFile = commitFiles[j];
						if(!nodes.includes(commitFile)) nodes.push({value: commitFile, type: 'file'});
						
						const str = [commits[i], commitFile].join(',');
						links[str] = {source: commits[i], target: commitFile, type: 'file'};
					}
				}
			}));
			promises = [];

			return Promise.all(promiseAll).then(() => {	
				const typeMap = {
					"commit": "#ff0000",
					"file": "#00ff00",
					"author": "#0000ff",
					"project": "#ffff00",
				};
				const linkMap = {
					"parent": {color: "#aaa", opacity: 1.0},
					"author": {color: "#aaa", opacity: 0.2},
					"file":   {color: "#aaa", opacity: 0.3}
				};
				nodes = nodes.map(node => {
					return {id: node.value, name: node.value, color: typeMap[node.type] || "#000000"};
				});
				links = Object.values(links).map(link => ({...link, color: linkMap[link.type].color, opacity: linkMap[link.type].opacity }));

				return {nodes, links};
			});
		});
	}

	initGraph(data) {
		
		let width = 400;
		let height = 400;		

		const svg = d3.select("#fg_vis")
		.append("svg")
			.attr("width", width)
  		.attr("height", height)
		.append("g")
		
		{
			const link = svg.append("g")
					.attr("class", "links")
				.selectAll("line")
				.data(data.links)
				.enter().append("line")
					.attr("stroke-width", 1)
					.attr("opacity", (link) => link.opacity)
					.style("stroke", (link) => link.color);
		
			const node = svg.append("g")
					.attr("class", "nodes")
				.selectAll("circle")
				.data(data.nodes)
				.enter().append("g");

			const circles = node.append("circle")
					.attr("r", 5)
					.attr("stroke", -30)
					.attr("stroke-width", 2)
					.style("fill", (node) => node.color)
					.call(d3.drag()
						.on("start", dragstarted)
						.on("drag", dragged)
						.on("end", dragended));

			const lables = node.append("title").text((d) => d.id)
			
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
}

export default FastGraph;
