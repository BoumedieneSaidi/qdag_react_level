import { DataSet, Network } from 'vis';
import React, { Component, createRef } from "react";





// initialize your network!


class ResultGraph extends Component {

  constructor(props) {
    super();
    this.result = props.result;
    this.query = props.query;
    console.log("result",this.result);
    this.updateData();
    this.network = {};
    this.appRef = createRef();
  }
  updateData(){
    let datasetNodes = []
    let datasetEdges = []
    let nodesIds = new Map();
    let mappedArr = this.result.map(mapping => mapping["mapping"])
    let i = 1;
    let queryLines = this.query.split("\n");
    let links = new Map();
    queryLines.forEach(line => {
             if(line.startsWith("?")){
                 let tp = line.split(" ");
                 let link = tp[0] + "," + tp[2];
                 if(!links.has(link)){
                     links.set(link,tp[1])
                 }
             }
    });
    console.log("links",links)
    let vars = queryLines[0].split(" ").filter(arg => arg.startsWith("?"));
    mappedArr.forEach(line => {
        const truplet = line.split("|");
        for (let index = 0; index < vars.length; index++) {
            const node = truplet[index];
            if(!nodesIds.has(node)){
                nodesIds.set(node,i++)
                datasetNodes.push({ id: nodesIds.get(node), label: node})
            }
        }
        for (let index = 0; index < vars.length; index++) {
              const node = truplet[index];
              if(!nodesIds.has(node)){
                  nodesIds.set(node,i++)
                  datasetNodes.push({ id: nodesIds.get(node), label: node})
              }
            for(let i = 0 ; i < vars.length; i++){
                let link = vars[index]+ "," + vars[i];
                if(truplet[index] === "<http://db.uwaterloo.ca/~galuc/wsdbm/Review724254>"){
                    console.log("le9iiiiiiiiiiiiiiiiiiiiiteha ouiiiiiiiiiiiiiiiiiiii",link,links.has(link),truplet[index]);
                }
                if(links.has(link)){
                  if(truplet[index] === "<http://db.uwaterloo.ca/~galuc/wsdbm/Review724254>"){
                    console.log("le9iiiiiiiiiiiiiiiiiiiiiteha ouiiiiiiiiiiiiiiiiiiii directly",truplet[index] ,truplet[i]);
                }
                    datasetEdges.push({from:nodesIds.get(truplet[index]),to:nodesIds.get(truplet[i]),label:links.get(link)})
                }
            }
        }
        
    });
    console.log(datasetNodes);
    console.log(datasetEdges);
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
    this.network.stabilize();
  }

  render() {
    return (
      <div id="net-container" ref={this.appRef} />
    );
  }
}
export default ResultGraph;