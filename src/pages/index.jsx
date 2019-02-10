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
import Typed from 'components/Visual/Typed.js';


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
&:after {
  background-image:
  radial-gradient(ellipse at left, transparent, ${props => props.theme.colors.bg_color}),
  radial-gradient(closest-side, #777 -170%, ${props => props.theme.colors.bg_color});
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 1;
  content: '';
  pointer-events: none;
  mix-blend-mode: overlay;
}
&:before {
  /*
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='30' viewBox='0 0 1000 120'%3E%3Cg fill='none' stroke='${props => props.theme.colors.bg_color}' stroke-width='8.1' %3E%3Cpath d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3C/g%3E%3C/svg%3E");
  */
  /*
  background-image: url(data:image/png;base64,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);
  */
  position: absolute;
  top: 0;
  content: '';
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 1;
  pointer-events: none;
}
  display: flex;
  max-width: 800px;
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
      grid-column-gap: 0.1em;
      grid-row-gap: 0.1em;
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
      &:not(.simple) li .image-wrapper {
        filter: brightness(1.2) contrast(0.8);
        &:after {
          background-image: url(data:image/png;base64,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);
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          mix-blend-mode: overlay;
          opacity: 0.6;
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
  const [showFullView, toggleShowFullView] = useToggle(false)
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
            <Header withDesc={true} style={{ maxWidth: "80vw" }} />
          </div>
          <div>
            {globalImageFocus &&
              <BackgroundImage2>
                <Img fluid={globalImageFocus} />
              </BackgroundImage2>
            }
            <button onClick={() => toggleLanguage()}>{language == "en" ?
              <>English <span style={{ textDecoration: "line-through" }}>Français</span></> :
              <><span style={{ textDecoration: "line-through" }}>English</span> Français</>} </button>
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
              <Typed
                strings={["ooo"]}
                typeSpeed={40}
                showCursor={false}
                smartBackspace={true}
              />
            </button>
          </div>
        </Navigation>
      </Wrapper>
      <HiddenContent>
      </HiddenContent>
      {!showFullView && globalImageFocus &&
        <BackgroundImage>
          <Img fluid={globalImageFocus} />
        </BackgroundImage>
      }
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
