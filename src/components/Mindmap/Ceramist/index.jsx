import React, { useState, useEffect, useRef } from 'react';
import { Net, Tree } from 'react-g6';
import useWindowSize from "react-use/lib/useWindowSize";
import { graph, options, events } from "./graph";

const Index = () => {
    const [network, setNetwork] = useState(null);
    const { width, height } = useWindowSize();
    useEffect(() => { if (network) network.fit; console.log("refit", network) }, [width, height]);
    return <Net
    attributes={{ height: height, fitView: 'autoZoom' }}
    nodes={graph.nodes}
    edges={graph.edges}
  />
    <Graph
        graph={graph}
        options={options}
        events={events}
        style={{ height: height, width: width }}
        getNetwork={network => setNetwork(network)}
    />
    
};

export default Index;

Index.propTypes = {};

