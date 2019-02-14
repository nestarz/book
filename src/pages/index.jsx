import Layout from "components/Layout";
import TwoColumns from "components/Layout/Columns/Two";
import Contact from "components/Layout/Contact";
import Name from "components/Layout/Header/Name";
import ProjectList from "components/Layout/List/Projects";
import SpringPosition from "components/Layout/SpringPosition";
import Star from "components/SVG/Star";
import { Link } from "gatsby";
import Img from "gatsby-image";
import useHover from "hooks/useHover";
import { useToggleGlobalLanguage } from "hooks/useLanguage";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import ReactTerminal from "react-terminal-component";
import styled, { withTheme } from "styled-components";

const Wrapper = styled(TwoColumns)`
  .title {
    margin-bottom: 1em;
  }
  .nav {
    display: flex;
    flex-direction: column;
  }
  & > *:first-child {
    background-color: ${props => props.theme.colors.bg_color};
  }
  &:after {
    content: '🐉';
    font-size: 1400%;
    position: absolute;
    right: 0;
  }
  .body {
    .terminalContainer {
      font-weight: 500;
      transform: scale(1.3, 0.9);
      margin-right: 5em;
      display: block;
      transform-origin: left;
    }
    .terminalContainer,
    .terminalContainer,
    .terminalContainer > * {
      & * {
        font-family: "CircularStd" !important;
        font-weight: 500 !important;
      }
    }
    .terminalOutput {
      > div > span,
      > div > input {
        margin-right: 1.2em;
        :first-child {
          font-weight: 300 !important;
        }
      }
    }
    .terminalInput {
      > form > span {
        margin-right: 1.2em;
        :first-child {
          font-weight: 300 !important;
        }
      }
    }
  }
`;
const Focus = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  flex: 1;
  pointer-events: none;
  margin-top: 2em;
  margin-bottom: 2em;
  z-index: 1999;
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(3, 33%);
  grid-template-rows: 50%;
  grid-auto-rows: 50%;
  & > div {
    display: grid;

    grid-template-columns: 1fr;

    grid-template-rows: 1fr;

    width: 100%;
  }
  .gatsby-image-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    width: 100%;
    position: relative;
    &:after {
    content: '🐉';
    font-size: 1400%;
    position: absolute;
    right: -100%;
    top: 0;
    left: 0;
    bottom: 0;
  }
  }
  img {
    margin-top: 0;
  }
  & div {
    min-width: 0;
    max-height: 100%;
    overflow: hidden;
    & div {
      max-height: 100%;
    }
    & img {
      overflow: hidden;
      min-width: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  img {
    object-fit: cover;
  }
  & > * {
    overflow: hidden;
  }
  img {
    object-fit: cover !important;
  }
`;
const About = styled.h1`
  :before {
    content: "A1" !important;
  }
`;
const StarFixed = styled(Star)`
  position: fixed;
  bottom: 1em;
  right: 1em;
`;
const ProjectItem = ({ project, onMouseOver, onMouseOut }) => {
  let ref = useRef(null);
  let hover = useHover(ref);
  useEffect(() => {
    if (hover) onMouseOver();
    else onMouseOut();
  }, [hover]);
  return (
    <h1 ref={ref}>
      <Link to={project.fields.slug}>{project.frontmatter.title}</Link>
    </h1>
  );
};
const Terminal = props => (
  <ReactTerminal
    {...props}
    theme={{
      background: props.theme.colors.bg_color,
      promptSymbolColor: props.theme.colors.body_color,
      commandColor: props.theme.colors.body_color,
      outputColor: props.theme.brand.primary,
      errorOutputColor: props.theme.colors.body_color,
      fontSize: "100%",
      spacing: "0%",
      fontFamily: "monospace",
      width: "100%",
      height: "100%"
    }}
  />
);

const TerminalOk = withTheme(Terminal);

const Index = ({ data, location }) => {
  const [language, toggleLanguage] = useToggleGlobalLanguage();
  const [projectFocus, setProjectFocus] = useState();
  return (
    <Layout pathname={location.pathname} withNav={true}>
      <Wrapper>
        <div>
          <Name withDesc={true} />
          <div className={"nav"}>
            <Link to={"/listentothis"}>Listen To This</Link>
            <Link to={"/animelist"}>Animes</Link>
            <button onClick={() => toggleLanguage()}>
              {language == "en" ? "Passer en Français" : "Switch to English"}
            </button>
            <Contact withIcons={false} />
          </div>
        </div>
        <div>
          <div className={"body"}>
            <ProjectList>
              {projects =>
                projects.map((project, i) => (
                  <ProjectItem
                    key={i}
                    project={project}
                    onMouseOver={() => setProjectFocus(project)}
                    onMouseOut={() => setProjectFocus(null)}
                  />
                ))
              }
            </ProjectList>
            <About>
              Currently focusing on Interaction and Object Design exploring the
              interaction of objects, people, art, technology and science using
              form and code with a mix of analog and digital materials.
            </About>
            <TerminalOk promptSymbol={"A2"} inputStr={"help me"} />
            <Focus>
              {projectFocus && (
                <SpringPosition
                  style={{
                    gridColumnStart: 1 + Math.floor(Math.random() * 3),
                    gridRowStart: 1 + Math.floor(Math.random() * 2)
                  }}
                >
                  <Img
                    fluid={projectFocus.frontmatter.cover.childImageSharp.fluid}
                  />
                </SpringPosition>
              )}
            </Focus>
          </div>
        </div>
      </Wrapper>
      <StarFixed />
    </Layout>
  );
};

export default Index;

Index.propTypes = {
  location: PropTypes.object.isRequired
};
