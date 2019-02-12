import MDXRenderer from "gatsby-mdx/mdx-renderer";
import React from "react";
import { Wrapper } from "./styles";

const Body = ({ body, className }) => {
  return (
    <Wrapper className={className}>
      <MDXRenderer>{body}</MDXRenderer>
    </Wrapper>
  );
};

export default Body;
