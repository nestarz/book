import Layout from 'components/Layout';
import Contact from 'components/Layout/Contact';
import Header from 'components/Layout/Header/Name';
import DigestList from 'components/Layout/List/Billets';
import ExperimentList from 'components/Layout/List/Experiments';
import ProjectList from 'components/Layout/List/Projects';
import { SketchComponentFixedBackground } from 'components/Visual/P5js';
import backgroundSketch from 'components/Visual/P5js/projects/mainScreen/sketch1';
import { graphql, StaticQuery } from "gatsby";
import Img from 'gatsby-image';
import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import { darken } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import { useToggle } from "react-use";
import { useGlobal } from 'reactn';
import styled from 'styled-components';


const Wrapper = styled.div`
position: fixed;
top: 0;
right: 0;
left: 0;
bottom: 0;
overflow-y: scroll;

    background-color: ${props => props.theme.colors.bg_color};
  flex: 1;
  height: 100%;
  display: flex;
  color: ${props => props.theme.colors.body_color};
  justify-content: space-between;
  flex-direction: row;
  align-content: space-between;
  font-size: 3.2vmin;
  @media (max-width: 1000px) {
    flex-wrap: wrap;
    font-size: 2.6vmax;
  }
  &>div.content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    justify-content: space-between;
    padding: 30px;
  }
  button {
    all: unset;
    margin-top: 1em;
    font-size: 100%;
    cursor: pointer;
    text-decoration: none;
  }
`;

const Navigation = styled.nav`
  display: flex;
  max-width: 1000px;
  flex-flow: column nowrap;
  position: relative;
  flex: 73%;
  padding: 30px;
  text-align: right;
  font-size: 100%;
  align-items: flex-end;
  @media (min-width: 1000px) {
    overflow-y: auto;
    max-height: 100vh;
  }
  & > :first-child {
    margin-top: auto !important;
    flex: auto;
    padding: 0;
    overflow: visible;
  }
  button.fullViewBtn {
    margin: 0;
    margin-top: 0.6em;
    font-size: 120%;
    text-decoration: underline;
  }
  &.fullViewOn {
    background-color: ${props => props.theme.colors.bg_color};
    border-left: 0px dashed black;
    border-color: ${props => props.theme.brand.primary};
    padding: 0;
    button.fullViewBtn {
      margin: 0;
      position: fixed;
      bottom: 30px;
      right: 30px;
      /*background-color: ${props => props.theme.colors.bg_color};*/
      padding: 0;
      display: flex;
    }
    padding-bottom: 0;
    flex: 250%;
  }
  & > div {
    display: flex;
    @media (min-width: 1000px) {
      overflow-y: auto;
    }
    flex-flow: column nowrap;
    height: 100%;
    width: 100%;
    align-items: stretch;
    & > :first-child {
      margin-top: auto !important;
    }
    ul.list-items {
      all: unset;
      counter-reset: compteListe1;
      li::after {
        counter-increment: compteListe1 1;
        content: "" counter(compteListe1, decimal-leading-zero) " ";
        padding-left: 1em;
      }
      li {
        flex-direction: row;
      }
    }
    ul.list-items li {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      &:nth-child(1n+4) {
        display: none;
      }
      & .image-wrapper {
        &, > div {
          z-index: -1;
          height: 100%;
          left: 0;
          position: absolute !important;
          top: 0;
          width: 100%;
          > div {
            filter: grayscale(1);
            position: static !important;
          }
        }
      }
    }
    &.fullViewOn .category {
      text-align: left;
      margin-bottom: 1em;
      padding-left: 1em;
    }
    &.fullViewOn > div:first-child.category {
      margin-top: 0;
      display: none;
    }
    &.fullViewOn ul.list-items {
      &:nth-last-child(2):after {
        padding-bottom: 1em;
        content: '';
      }
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: minmax(35vh, 1fr);
      grid-column-gap: 2em;
      grid-row-gap: 2em;
      margin-right: 1em;
      margin-top: 1em;
      &.simple {
        grid-template-columns: 1fr;
        grid-auto-rows: auto;
        grid-column-gap: 0;
        grid-row-gap: 0;
        padding-left: 1em;
      }
      justify-items: stretch;
      align-items: stretch;
      counter-reset: compteListe;
      li::before {
        counter-increment: compteListe 1;
        content: counter(compteListe, hiragana) " ";
        padding-right: 1em;
      }
      li::after {
        content: counter(compteListe, decimal-leading-zero) " ";
      }
      li {
        background-color: ${props => darken(0, props.theme.colors.bg_color)};
        justify-content: center;
        align-items: center;
        &:nth-child(1n+4) {
          display: flex;
        }
      }
      &.simple li {
        justify-content: flex-start;
        align-items: flex-start;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        &::before {
          padding-right: 1em;
        }
      }
      li:hover .image-wrapper:after {
        background-color: ${props => props.theme.colors.bg_color};
        content: '';
        position: absolute;
        top: 0;
        right:0;
        bottom: 0;
        left: 0;
        cursor: pointer;
        opacity: 0.5;
      }
      a.withImage {
        display: none;
      }
      li:hover a {
        display: block;
        text-align: center;
      }
    }
  }
  .category {
    font-weight: 500;
    margin-top: 1em;
  }
  a{
    &:hover:before {
      /*content: "↘ ";*/
    }
    &:not(:hover) {
      color: inherit;
    }
  }
`;

const Description = styled.p`
  margin: 0;
  max-width: 800px;
  min-width: 300px;
  font-size: 100%;
  line-height: 1.7em;
  margin-top: 0.5em;
`;

const HiddenContent = styled.div`
padding-top: 100vh;
display: flex;
justify-content: center;
align-items: center;
z-index: 999;
pointer-events: none;
& > * {
  margin-bottom: 0vh;
  display: flex;
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.bg_color};
  height: 20vh;
}
`;

const BackgroundImage = styled.div`
  position: fixed;
  top:0;
  bottom:0;
  right:0;
  left: 0;
  pointer-events: none;
  mix-blend-mode: soft-light;
  filter: grayscale(1) saturate(1);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
  .gatsby-image-wrapper > img {
    display: none;
  }
`;

const BackgroundImage2 = styled(BackgroundImage)`
  position: initial;
  width: 40vh;
  height: 40vh;
  max-width: 100%;
  max-height: 100%;
  margin-bottom: 1em;
  pointer-events: none;
  mix-blend-mode: normal;
  filter: grayscale(1);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  display: none;
  @media (max-width: 1000px) {
    display: none;
  }
  img {
    object-fit: cover;
  }
  .gatsby-image-wrapper > img {
    display: none;
  }
`;

const Index = ({ data, location }) => {
  const [language, toggleLanguage] = useToggleGlobalLanguage()
  const description = data.site.siteMetadata.authorCv.shortBio[language];
  const [showFullView, toggleShowFullView] = useToggle(true)
  const [globalImageFocus, setGlobalImageFocus] = useGlobal('globalImageFocus');
  return (
    <Layout pathname={location.pathname}>
      <Wrapper>
        <SketchComponentFixedBackground
          style={{ height: "100%", display: "none" }}
          sketch={backgroundSketch}
        />
        <div className={"content"} style={{ zIndex: 99 }}>
          <div>
            <Header withDesc={true} style={{maxWidth: "80vw"}} />
          </div>
          <div>
          {globalImageFocus &&
        <BackgroundImage2>
          <Img fluid={globalImageFocus} />
        </BackgroundImage2>
      }
            <button onClick={() => toggleLanguage()}>{language == "en" ?
            <>English <span style={{textDecoration: "line-through"}}>Français</span></> :
  <><span style={{textDecoration: "line-through"}}>English</span> Français</>} </button>
            {/* <Description>
              {description}
            </Description> */}
            <Contact style={{ fontSize: "100%" }}
              withIcons={false}
              withPhone={false}
              withEmail={false}
            />
          </div>
        </div>
        <Navigation className={`${showFullView ? "fullViewOn" : ""}`} style={{ zIndex: 99 }}>
          <div className={`${showFullView ? "fullViewOn" : ""}`}>
            <ProjectList fullView={showFullView} />
            <DigestList className={"simple"} fullView={showFullView} />
            <ExperimentList className={"simple"} fullView={showFullView} />
            <button
              className={`fullViewBtn`}
              onClick={() => toggleShowFullView()}>
              {showFullView ? "ooo" : "ooo"}
            </button>
          </div>
        </Navigation>
      </Wrapper>
      <HiddenContent>
      </HiddenContent>
      {/* {globalImageFocus &&
        <BackgroundImage>
          <Img fluid={globalImageFocus} />
        </BackgroundImage>
      } */}
    </Layout>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
    query {
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
    `}
    render={data => <Index data={data} {...props} />}
  />
)

Index.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        authorCv: PropTypes.shape({
          shortBio: PropTypes.shape({
            en: PropTypes.string.isRequired,
            fr: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}
