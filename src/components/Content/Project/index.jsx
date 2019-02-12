import Typing from "external/react-typing-animation/src/Typing";
import React from "react";
import styled from "styled-components";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import TOC from "./TOC";

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
      <svg className={"stamp"} xmlns="http://www.w3.org/2000/svg" height="154px" width="154px">
        <path
          id="myTextPath"
          d="M 64,0 A 64,64 0 0 1 -64,0 A 64,64 0 0 1 64,0"
          transform="translate(80,80)"
          fill="none"
          stroke="transparent"
          stroke-width="25"
        />
        <text stroke-width="0">
          <textPath xlinkHref="#myTextPath">
            <tspan dy="5">
              <Typing speed={100} element={""} cursorElement={"tspan"}>
                Data visualisation, Design objet, Céramique <Typing.Cursor />
              </Typing>
            </tspan>
          </textPath>
        </text>
      </svg>
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
    </Wrapper>
  );
};

export default Project;
