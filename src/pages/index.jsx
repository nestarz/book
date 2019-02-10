import Layout from 'components/Layout';
import Contact from 'components/Layout/Contact';
import Header from 'components/Layout/Header/Name';
import DigestList from 'components/Layout/List/Billets';
import ExperimentList from 'components/Layout/List/Experiments';
import ProjectList from 'components/Layout/List/Projects';
import Typed from 'components/Visual/Typed.js';
import { graphql, StaticQuery } from "gatsby";
import Img from 'gatsby-image';
import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import { darken } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import { useToggle } from "react-use";
import { useGlobal } from 'reactn';
import styled from 'styled-components';
import LineTo from 'react-lineto';


const Wrapper = styled.div`
*:nth-child(2n) {
}
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
  @media (max-width: 1000px) {
    flex-wrap: wrap;
    font-size: 2.6vmax;
  }
  &>div.content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    justify-content: space-between;
    padding: 1em;
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
  flex-flow: column nowrap;
  position: relative;
  flex: 73%;
  padding: 1em;
  text-align: right;
  @media (max-width: 1000px) {
    padding-top: 0;
    text-align: left;
  }
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
      bottom: 1em;
      right: 1em;
      /*background-color: ${props => props.theme.colors.bg_color};*/
      padding: 0;
      display: flex;
    }
    padding-bottom: 0;
    flex: 100%;
    @media (min-width: 1000px) {
      max-width: 50vw;
    }
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
      @media (max-width: 1000px) {
        justify-content: space-between;
        align-items: space-between;
      }
      &:nth-child(1n+4) {
        /*display: none;*/
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
      grid-auto-rows: minmax(40vh, 1fr);
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
    @media (max-width: 1000px) {
      &:first-child {
        margin-top: 0 !important;
      }
      text-align: left;
    }
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
&:after {
  background-image: url(data:image/png;base64,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);
  content: '';
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  mix-blend-mode: overlay;
  opacity: 1;
}
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
&:after {
  background: none;
}
  position: initial;
  width: 75vh;
  height: 60vh;
  max-width: 100%;
  max-height: 100%;
  margin-bottom: 0em;
  pointer-events: none;
  mix-blend-mode: normal;
  display: grid;
  grid-template-columns: 1fr 50%;
  grid-template-rows: 1fr 50%;
  @media (max-width: 1000px) {
    display: none;
  }
  img {
    object-fit: cover;
  }
  .gatsby-image-wrapper > img {
    display: none;
  }
  .gatsby-image-wrapper {
    grid-row: 2;
  }
  div.project-desc {
    grid-column: 2;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    flex-wrap: wrap;
    flex-direction: column;
    position: relative;
    &:before {
      content: '';
      background-color: #777;
      position: absolute;
      top:0;right:0;left:0;bottom:0;
      z-index:-1;
      filter: blur(4em);
      border-radius: 10em;
    }
    h1, h2 {
      font-size: 100%;
      margin: 0;
    }
    p {
      width: 100%;
      margin: 0;
    }
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
        {/* <SketchComponentFixedBackground
          style={{ height: "100%", display: "none" }}
          sketch={backgroundSketch}
        /> */}
        <div className={"content"} style={{ zIndex: 99 }}>
          <div>
            <Header withDesc={true} style={{ maxWidth: "80vw" }} />
          </div>
          <div>
            {globalImageFocus &&
              <BackgroundImage2>
                <div></div>
                <div className={"project-desc"}>
                <h1>{globalImageFocus.title}</h1>
                <h2>{globalImageFocus.birthtime}</h2>
                </div>
              </BackgroundImage2>
            }
            <button className={'B'} onClick={() => toggleLanguage()}>{language == "en" ?
              <>Version Française ici</> :
              <>English Version here</>} </button>
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
        {/* <LineTo from="A" to="B" delay={100} borderColor={"#3CD670"} borderStyle={"dashed"}/> */}
      </Wrapper>
      <HiddenContent>
      </HiddenContent>
      {!showFullView && globalImageFocus &&
        <BackgroundImage>
          <Img fluid={globalImageFocus.image} />
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
