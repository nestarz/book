import React from 'react'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import styled from 'styled-components'
import { animated, useSpring, config } from 'react-spring'

const Wrapper = styled.div`
`;
const Body = ({ body }) => {
  const props = useSpring({
    config: config.slow,
    delay: 1000,
    from: { opacity: 0 },
    opacity: 1
  })
return <Wrapper>
      <animated.div style={props}>
        <MDXRenderer>{body}</MDXRenderer>
      </animated.div>
</Wrapper>
}
export default Body;
