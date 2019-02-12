import MDXRenderer from "gatsby-mdx/mdx-renderer";
import React from "react";
import { animated, config, useSpring } from "react-spring";
import styled from "styled-components";

const Wrapper = styled.div``;
const Body = ({ body }) => {
  const props = useSpring({
    config: config.slow,
    delay: 1000,
    from: { opacity: 0 },
    opacity: 1
  });
  return (
    <Wrapper>
      <animated.div style={props}>
        <MDXRenderer>{body}</MDXRenderer>
      </animated.div>
    </Wrapper>
  );
};
export default Body;
