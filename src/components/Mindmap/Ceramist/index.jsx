import React, { useState, useEffect, useRef } from 'react';
import Graph from 'react-graph-vis';
import styled from 'styled-components';
import useWindowSize from "react-use/lib/useWindowSize";
import { graph, options, events } from "./graph";

const StyledGraph = styled(Graph)``;
const Index = ({ height, width, className }) => {
    const [network, setNetwork] = useState(null);
    const { winWidth, winHeight } = useWindowSize();
    useEffect(() => { if (network) { network.fit(); network.redraw(); } console.log("refit", winWidth, winHeight, network) }, [winWidth, winHeight]);
    return <StyledGraph
            className={className}
            graph={graph}
            options={options}
            events={events}
            style={{ height: height ? height : "100%", width: width ? width : "100%" }}
            getNetwork={network => setNetwork(network)}
        />

};

export default Index;

Index.propTypes = {};

