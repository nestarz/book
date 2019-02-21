import Layout from "components/Layout/Main";
import TwoColumns from "components/Layout/Template/TwoColumns";
import Contact from "components/Content/Contact";
import Name from "components/Content/Name";
import ExperimentList from "components/Queries/Experiments";
import ProjectList from "components/Queries/Projects";
import SpringPosition from "components/Visual/SpringPosition";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import useHover from "hooks/useHover";
import { useToggleGlobalLanguage } from "hooks/useLanguage";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled(TwoColumns)`
  .title {
    margin-bottom: 1em;
  }
  .nav {
    display: flex;
    flex-direction: column;
  }
  .body {
    h1,
    h2 {
      margin: 0.1em 0;
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
  grid-template-columns: repeat(3, 33vh);
  grid-template-rows: 33vh;
  grid-auto-rows: 33vh;
  margin-left: 30vw;
  margin-top: 10vh;
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
      content: "";
      font-size: 1400%;
      position: fixed;
      transform: translate(-10vw);
      right: 0;
      top: 0;
      left: 0;
      bottom: 0;
      filter: grayscale(1) contrast(5) saturate(0);
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
  /*color: ${props => props.theme.brand.primary} !important;*/
  transform: translateX(-3em);
  margin-top: 1em !important;
  margin-bottom: 1em !important;
  font-size: 190% !important;
  @media (max-width: 700px) {
    font-size: 100% !important;
  }
`;
const ProjectItem = ({ project, onMouseOver, onMouseOut, i }) => {
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

const Index = ({
  data: {
    site: {
      siteMetadata: {
        authorCv: { shortBio }
      }
    }
  },
  location
}) => {
  const [language, toggleLanguage] = useToggleGlobalLanguage();
  const [projectFocus, setProjectFocus] = useState();
  return (
    <Layout pathname={location.pathname} withNav={true}>
      <Wrapper>
        <div>
          <Name withDesc={true} />
          <div className={"nav"}>
          <Link to={"/ressources"}>Ressources (v2)</Link>
          <Link to={"/almusiqa"}>Almusiqa</Link>
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
                    i={i}
                  />
                ))
              }
            </ProjectList>
            <About>{shortBio[language]}</About>
            <ExperimentList>
              {projects =>
                projects.map((project, i) => (
                  <ProjectItem
                    key={i}
                    project={project}
                    onMouseOver={() => setProjectFocus(project)}
                    onMouseOut={() => setProjectFocus(null)}
                    i={9 - i}
                  />
                ))
              }
            </ExperimentList>
            {/* <TerminalOk promptSymbol={"A2"} inputStr={"help me"} /> */}
            <Focus>
              {projectFocus && projectFocus.frontmatter.cover && (
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
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        authorCv {
          shortBio {
            fr
            en
          }
        }
      }
    }
  }
`;

Index.propTypes = {
  location: PropTypes.object.isRequired
};
