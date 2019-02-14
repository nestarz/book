import React from "react";
import styled from "styled-components";

const H1 = styled.h1`
  margin: 0 !important;
  :after,
  :before {
    display: none;
  }
`;
const Header = ({ birthtime, frontmatter }) => {
  return (
    <div style={{marginBottom: "1em"}}>
      <H1>
        <span>Date</span> {frontmatter.date ? frontmatter.date : birthtime}
      </H1>
      {frontmatter.client && (
        <H1>
          <span>Où</span> {frontmatter.client}
        </H1>
      )}
      {frontmatter.service && (
        <H1>
          <span>Pour</span> {frontmatter.service}
        </H1>
      )}
    </div>
  );
};

export default Header;
