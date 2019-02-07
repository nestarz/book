import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { SketchComponentAbsoluteBackground } from 'components/Visual/P5js';
import backgroundSketch from 'components/Visual/P5js/projects/mainScreen/sketch2';
import Right from './RightSide'
import Left from './LeftSide'

const Wrapper = styled.div`
  ${props => props.addCSS}
  h1, h2 {
    font-weight: 500;
    letter-spacing: calc(-0.013em);
  }
  padding: 2em;
  position: relative;
  background-color: white;
  color: ${props => props.theme.colors.black};
  max-width: 60rem;
  margin: auto;
  display: flex;
  @media (max-width: 700px) {
    flex-wrap: wrap;
  }
  h1, h2, h3 {
    position: relative;
    font-size: 100%;
  }
  & > div:last-child {
    margin-left: 1em;
  }
  button {
    all: unset;
  }
`;
const CurriculumVitae = ({ data, withToggle = true, ...props }) => {
  return (
    <Wrapper {...props}>
      <SketchComponentAbsoluteBackground sketch={backgroundSketch} />
      <Left data={data} withToggle={withToggle} />
      <Right data={data} />
    </Wrapper>
  )
}
export default props => (
  <StaticQuery
    query={graphql`
    query {
      site {
        siteMetadata {
          authorInfo {
            email
          }
          authorCv {
            shortBio {
              fr
              en
            }
            languages {
              title {
                fr
                en
              }
              list {
                name {
                  fr
                  en
                }
                score {
                  fr
                  en
                }
              }
            }
            skills {
              title {
                fr
                en
              }
              list {
                title {
                  fr
                  en
                }
                list {
                  name {
                    fr
                    en
                    all # Only if fr/en isn't useful
                  }
                }
              }
            }
            publications {
              title {
                fr
                en
              }
              url
            }
            records {
              title {
                fr
                en
              }
              list {
                from
                to
                title {
                  fr
                  en
                }
                etablishment
                location
                description {
                  fr
                  en
                }
              }
            }
          }
        }
      }
    }
    `}
    render={data => <CurriculumVitae data={data} {...props} />}
  />
)

CurriculumVitae.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        authorCv: PropTypes.shape({
          shortBio: PropTypes.shape({
            en: PropTypes.string.isRequired,
            fr: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
        authorInfo: PropTypes.shape({
          email: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  lg: PropTypes.string,
}
