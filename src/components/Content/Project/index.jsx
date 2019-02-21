import React from "react";
import styled from "styled-components";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import TOC from "./TOC";
import TwoColumns from "components/Layout/Template/TwoColumns";

const Wrapper = styled(TwoColumns)`
  .body {
    overflow: hidden;
    h1 {
      grid-template-columns: minmax(4em, 0.1fr) 9.9fr !important;
    }
    h1,
    h2,
    h3 {
      margin-bottom: 1em;
      :not(:first-child) {
        margin-top: 1em;
      }
    }
  }
`;
export const Project = ({
  excerpt,
  birthtime,
  birthtimeTimeStamp,
  mtime,
  frontmatter,
  tableOfContents,
  body
}) => {
  return (
    <Wrapper>
      <div>
        <Header
          frontmatter={frontmatter}
          birthtime={birthtime}
          birthtimeTimeStamp={birthtimeTimeStamp}
          mtime={mtime}
          excerpt={excerpt}
        />
        {tableOfContents && tableOfContents.items && (
          <TOC tableOfContents={tableOfContents} />
        )}
      </div>
      <div>
        <div className={"body"}>
          <Footer
            frontmatter={frontmatter}
            birthtime={birthtime}
            birthtimeTimeStamp={birthtimeTimeStamp}
            mtime={mtime}
          />
          <Body body={body} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Project;
