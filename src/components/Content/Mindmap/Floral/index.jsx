import React, { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import useWindowSize from "react-use/lib/useWindowSize";
import styled from "styled-components";
import { events, graph, options } from "./graph";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Index = ({ style, className }) => {
  const [network, setNetwork] = useState(null);
  const windowSize = useWindowSize();
  useEffect(() => {
    if (network) {
      network.fit();
      network.redraw();
    }
  }, [windowSize]);
  return (
    <Wrapper style={style} className={className}>
      <Graph
        graph={graph}
        options={options}
        events={events}
        style={{ height: "100%", width: "100%" }}
        getNetwork={network => setNetwork(network)}
      />
    </Wrapper>
  );
};

export default Index;

Index.propTypes = {};
