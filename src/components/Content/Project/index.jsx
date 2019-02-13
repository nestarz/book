import React from "react";
import styled from "styled-components";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import TOC from "./TOC";
import Star from "components/SVG/Star";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > section {
    min-width: 60vw;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    font-size: 100%;
  }
  svg.stamp {
    position: absolute;
    right: 1em;
    bottom: 1em;
    stroke: #000000;
    fill: ${props => props.theme.colors.body_color};
  }
`;
const HeadWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow-y: scroll;
  justify-content: space-between;
  padding: 1em;
  padding-right: 0;
  position: relative;
  &:hover:after {
    content: "";
    writing-mode: vertical-rl;
    margin-bottom: 1em;
    font-size: 38vmin;
    text-orientation: mixed;
    line-height: 30vmin;
    position: absolute;
    top: -0.1em;
    bottom: 0;
    right: 0;
    left: 0;
  }
`;
const ContentWrapper = styled.div`
  flex: 50%;
  max-height: 100vh;
  overflow-y: scroll;
  & > *:first-child {
    margin-top: 1em;
  }
`;
const StarFixed = styled(Star)`
  position: fixed;
  bottom: 1em;
  right: 1em;
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
      <HeadWrapper>
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
      </HeadWrapper>
      <ContentWrapper>
        <Footer
          frontmatter={frontmatter}
          birthtime={birthtime}
          birthtimeTimeStamp={birthtimeTimeStamp}
          mtime={mtime}
        />
        <Body body={body} />
      </ContentWrapper>
      <StarFixed/>
    </Wrapper>
  );
};

export default Project;
