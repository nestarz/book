import React from 'react'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import styled from 'styled-components'
import { animated, Spring, config } from 'react-spring'

const Wrapper = styled.div`
`;
const Body = ({ body }) => <Wrapper>
  <Spring
  native
  config={config.slow}
  delay={1000}
  from={{ opacity: 0 }}
  to={{ opacity: 1 }}>
    {props => (
      <animated.div style={props}>
        <MDXRenderer>{body}</MDXRenderer>
      </animated.div>
    )}
  </Spring>
</Wrapper>

export default Body;
