import { DataSet, Network } from 'vis';
import React, { Component, createRef } from "react";





// initialize your network!


class VisNetwork extends Component {

  constructor(props) {
    super();
    this.query = props.query;
    this.updateData();
    this.network = {};
    this.appRef = createRef();
  }
  updateData(){
    let datasetNodes = []
    let datasetEdges = []
    let nodesIds = new Map();
    let lines = this.query.split("\n");
    let i = 1;
    lines.forEach(line => {
      if(line.startsWith("?")){
        const truplet = line.split(" ");
        if(!nodesIds.has(truplet[0])){
            nodesIds.set(truplet[0],i++)
            datasetNodes.push({ id: nodesIds.get(truplet[0]), label: truplet[0] })
        }
        if(!nodesIds.has(truplet[2])){
            nodesIds.set(truplet[2],i++)
            datasetNodes.push({ id: nodesIds.get(truplet[2]), label: truplet[2] })
        }
        datasetEdges.push({from:nodesIds.get(truplet[0]),to:nodesIds.get(truplet[2]),label:truplet[1]})
    }
    });
    let nodes = new DataSet(datasetNodes);
    let edges  = new DataSet(datasetEdges);
    this.data = {
      nodes: nodes,
      edges: edges
    };
    this.options = {
      nodes : {
        shape : 'dot',
        size : 30,
        color : '#212529', // select color

        font : {
            size : 20,
        },
        borderWidth : 2
    },
      edges: {
        length: 400,
        font: {
          align: "top"
        },
        arrows: {
          to: { enabled: true, scaleFactor: 1, type: "arrow" }
        },
      },
      physics: {
        // Even though it's disabled the options still apply to network.stabilize().
        enabled: false,
        solver: "repulsion",
        repulsion: {
          nodeDistance: 400 // Put more distance between the nodes.
        }
      }
    };
  }
  componentDidMount() {
    this.network = new Network(this.appRef.current, this.data, this.options);
  }

  render() {
    return (
      <div id="net-container" ref={this.appRef} />
    );
  }
}
export default VisNetwork;