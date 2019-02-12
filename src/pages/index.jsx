import Layout from "components/Layout";
import Contact from "components/Layout/Contact";
import Header from "components/Layout/Header/Name";
import DigestList from "components/Layout/List/Billets";
import ExperimentList from "components/Layout/List/Experiments";
import ProjectList from "components/Layout/List/Projects";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";
import { useToggleGlobalLanguage } from "hooks/useLanguage";
import PropTypes from "prop-types";
import React from "react";
import { useToggle } from "react-use";
import { useGlobal } from "reactn";
import styled from "styled-components";
/*import LineTo from 'react-lineto';*/

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  button {
    all: unset;
  }
  @media (min-width: 1000px) {
    max-height: 100vh;
  }
  @media (max-width: 1000px) {
    flex-direction: column;
    font-size: 2.6vmax;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 1000px) {
    flex: 1;
  }
  padding: 1em;
  @media (max-width: 1000px) {
    padding-bottom: 0;
  }
`;

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  @media (min-width: ${props => props.theme.breakpoints.s}) {
    font-size: 160%;
  }
`;

const Focus = styled.footer`
  position: fixed;
  height: 50vmin;
  width: 50vmin;
  top: 30%;
  right: 0;
  left: 20%;
  bottom: 0;
  display: flex;
  flex: 1;
  z-index: -1;
  .svgHolder {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    svg {
      .st0 {
        fill: ${props => props.theme.colors.bg_color};
      }
      width: 3em;
      height: 3em;
      animation-name: spin;
      animation-duration: 100s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }
  .gatsby-image-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    width: 100%;
  }
  img {
    object-fit: cover;
  }
  &:before {
    background-image: url(${props => props.theme.noisy_uri});
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    mix-blend-mode: overlay;
    z-index: 2;
  }
  &:after {
    background: radial-gradient(
      transparent 12%,
      ${props => props.theme.colors.bg_color} 44%
    );
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    content: "";
    z-index: 3;
  }
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  padding-top: 1em;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 1em;
  @media (max-width: 1000px) {
    padding: 0 1em;
    margin-top: 1em;
  }
  @media (min-width: 1000px) {
    max-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
  button {
    text-decoration: underline;
    font-size: 120%;
  }
  .category {
    font-weight: 500;
    margin-top: 1em;
    @media (max-width: 1000px) {
      align-self: flex-start;
    }
  }
  &.full,
  &.simple {
    ul,
    li {
      all: unset;
    }
    ul {
      counter-reset: list;
      width: 100%;
    }
    li {
      text-align: right;
      display: flex;
      justify-content: flex-end;
      @media (max-width: 1000px) {
        justify-content: space-between;
        align-items: space-between;
        text-align: left;
      }
      &:after {
        counter-increment: list 1;
        content: counter(list, hiragana) " " counter(list, decimal-leading-zero);
        padding-left: 0.5em;
        word-spacing: 1em;
        @media (max-width: 1000px) {
          text-align: right;
        }
      }
      a {
        color: inherit;
        &:hover {
          color: ${props => props.theme.brand.primary};
        }
      }
    }
    &.full {
      padding: 0em;
      ul:not(.withImages) li,
      .category,
      button {
        padding: 0 1em;
      }
      .category:first-child {
        display: none;
      }
      @media (min-width: 1000px) {
        & > :nth-child(n + 2) {
          display: none;
        }
      }
      button {
        display: block !important;
        padding-right: 0.8em;
        padding-bottom: 0.825em;
        flex: 20%;
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 999;
      }
      ul.withImages {
        width: 100%;
        overflow: scroll;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: minmax(40vh, 1fr);
        grid-column-gap: 0.1em;
        grid-row-gap: 0.1em;
        position: relative;
        li {
          display: flex;
          flex: 1;
          justify-content: center;
          align-items: center;
          a {
            display: none;
          }
          &:hover img {
            filter: invert(1) contrast(0.6);
          }
          &:hover a {
            display: block;
          }
          & > div {
            .image-wrapper {
              &:after {
                background-image: url(${props => props.theme.noisy_uri});
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                mix-blend-mode: overlay;
                opacity: 0.6;
              }
              z-index: -1;
              position: absolute;
              top: 0;
              right: 0;
              left: 0;
              bottom: 0;
              & > div {
                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: 1fr;
                height: 100%;
                width: 100%;
                img {
                  object-fit: cover;
                }
              }
            }
          }
        }
        .simple {
          grid-template-columns: 1fr;
        }
      }
    }
  }
`;

const Index = ({ data, location }) => {
  const [language, toggleLanguage] = useToggleGlobalLanguage();
  const description = data.site.siteMetadata.authorCv.shortBio[language];
  const [showFullView, toggleShowFullView] = useToggle(false);
  const [globalImageFocus, setGlobalImageFocus] = useGlobal("globalImageFocus");
  return (
    <Layout pathname={location.pathname}>
      <Focus>
        {!showFullView && globalImageFocus && (
          <Img fluid={globalImageFocus.image} />
        )}
        <div className={"svgHolder"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="457.5 335.6000061035156 140 137.79998779296875"
            xmlSpace="preserve"
            preserveAspectRatio="xMidYMid meet"
          >
            <polygon
              className="st0"
              points="527.5,374.5 539.7,335.6 537.8,376.3 562.5,343.9 546.8,381.5 581.1,359.5 553.5,389.5 593.3,380.6   557,399.3 597.5,404.5 557,409.7 593.3,428.4 553.5,419.5 581.1,449.5 546.8,427.5 562.5,465.1 537.8,432.7 539.7,473.4   527.5,434.5 515.3,473.4 517.2,432.7 492.5,465.1 508.2,427.5 473.9,449.5 501.5,419.5 461.7,428.4 498,409.7 457.5,404.5   498,399.3 461.7,380.6 501.5,389.5 473.9,359.5 508.2,381.5 492.5,343.9 517.2,376.3 515.3,335.6 "
            />
          </svg>
        </div>
      </Focus>
      <Wrapper>
        <Main>
          <HeaderWrapper>
            <Header withDesc={true} style={{ maxWidth: "80vw" }} />
          </HeaderWrapper>
          <Footer>
            <button onClick={() => toggleLanguage()}>
              {language == "en" ? "Français" : "English"}
            </button>
            <Contact withIcons={false} withPhone={false} withEmail={false} />
          </Footer>
        </Main>
        <Nav className={showFullView ? "full" : "simple"}>
          <ProjectList className={"withImages"} fullView={showFullView} />
          <DigestList fullView={showFullView} />
          <ExperimentList fullView={showFullView} />
          <button onClick={() => toggleShowFullView()}>ooo</button>
        </Nav>
      </Wrapper>
    </Layout>
  );
};

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
);

Index.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        authorCv: PropTypes.shape({
          shortBio: PropTypes.shape({
            en: PropTypes.string.isRequired,
            fr: PropTypes.string.isRequired
          }).isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired,
  location: PropTypes.object.isRequired
};
