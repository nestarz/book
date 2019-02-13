import styled from "styled-components";

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap-reverse;
  canvas {
    max-height: 100vh !important;
  }
  justify-content: flex-end;
  /*background-color:${props => props.theme.brand.primary};*/
  padding-left: 0px;
  h1,h2,h3,h4,h5,h6 {
    margin: 0;
  }
  @media print {
    display: none;
  }
  position: relative;
`;

export const Content = styled.section`
  display: flex;
  flex: 1;
  width: 100%;
  flex-grow: 1;
  padding: 0em 0em;
  & > ul,
  & > ol {
    & > li > ul:not(:empty) {
      margin-bottom: 1em;
    }
    & > li:last-child > ul {
      margin-bottom: 0;
    }
  }
  ul,
  ol {
    overflow-x: scroll;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: flex-start;
    margin: 0;
    padding: 0;
    margin-top: auto !important;
    h3 {
      font-size: 100%;
      text-align: left;
    }
    li a {
      color: ${props => props.theme.colors.body_color};
    }
    & > li {
      break-inside: avoid;
    }
  }
  ul {
    list-style-type: none;
    flex-direction: column;
  }
  ol > li {
    list-style-type: none;
    padding: 0;
    min-width: 12em;
    list-style-position: inside;
  }
  ol {
    padding: 0 0px;
  }
`;
