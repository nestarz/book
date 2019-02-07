import Layout from 'components/Layout';
import Contact from 'components/Layout/Contact';
import Header from 'components/Layout/Header/Name';
import ExperimentList from 'components/Layout/List/BasicExperimentList';
import ProjectList from 'components/Layout/List/BasicProjectList';
import { SketchComponentFixedBackground } from 'components/Visual/P5js';
import backgroundSketch from 'components/Visual/P5js/projects/mainScreen/sketch1';
import { graphql, StaticQuery } from "gatsby";
import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  color: ${props => props.theme.colors.body_color};
  justify-content: space-between;
  flex-direction: row;
  align-content: space-between;
  padding: 30px;
  font-size: 1.6vmin;
  @media (max-width: 1000px) {
    flex-wrap: wrap;
    font-size: 1.3vmax;
  }
  &>div {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    justify-content: space-between;
  }
  button {
    all: inherit;
    margin-top: 1em;
    font-size: 180%;
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 45%;
  max-width: 600px;
  text-align: right;
  font-size: 180%;
  @media (max-width: 1000px) {
    font-size: 180%;
    text-align: left;
  }
  .category {
    font-weight: 500;
    margin-top: 1em;
  }
  a{
    &:hover:before {
      content: "↘ ";
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
  font-size: 180%;
  line-height: 1.7em;
  margin-top: 0.5em;
`;

const Index = ({ data, location }) => {
  const [language, toggleLanguage] = useToggleGlobalLanguage()
  const description = data.site.siteMetadata.authorCv.shortBio[language];
  return (
    <Layout pathname={location.pathname}>
      <Wrapper>
        <SketchComponentFixedBackground
          style={{height: "99%"}}
          sketch={backgroundSketch}
        />
        <div style={{zIndex: 99}}>
          <div>
            <Header style={{ fontSize: "400%" }} />
            <Contact style={{ fontSize: "200%" }}
              withIcons={false}
              withPhone={false}
              withEmail={false}
            />
          </div>
          <div>
            <button onClick={() => toggleLanguage()}>En/Fr</button>
            <Description>
              {description}
            </Description>
          </div>
        </div>
        <Navigation style={{zIndex: 99}}>
          <ProjectList />
          <ExperimentList />
        </Navigation>
      </Wrapper>
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
