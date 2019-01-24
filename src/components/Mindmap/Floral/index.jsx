import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Graph from 'react-graph-vis';
import useWindowSize from "react-use/lib/useWindowSize";
import { graph, options, events } from "./graph";
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;
const Index = ({ height, width, className }) => {
    const [network, setNetwork] = useState(null);
    const { winWidth, winHeight } = useWindowSize();
    useEffect(() => { if (network) { network.fit(); network.redraw(); }}, [winWidth, winHeight]);
    return <Wrapper className={className}>
            <Graph
                graph={graph}
                options={options}
                events={events}
                style={{ height: height ? height : "100%", width: width ? width : "100%" }}
                getNetwork={network => setNetwork(network)}
            />
        </Wrapper> 

};

export default Index;

Index.propTypes = {};

