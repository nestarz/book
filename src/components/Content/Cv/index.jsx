import { graphql, StaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Left from "./LeftSide";
import Right from "./RightSide";
import TwoColumns from "components/Layout/Template/TwoColumns";

const Wrapper = styled(TwoColumns)`
  ${props => props.addCSS}
  position: relative;
  background-color: ${props => props.theme.colors.bg_color};
  color: ${props => props.theme.colors.body_color};
  display: flex;
  justify-content: space-between;
  @media (max-width: 700px) {
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: space-around;
  }
`;
const CurriculumVitae = ({ data, withToggle = true, ...props }) => {
  return (
    <Wrapper {...props}>
      <Left data={data} withToggle={withToggle} />
      <Right data={data} />
    </Wrapper>
  );
};
export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            siteConfig {
              siteUrl
            }
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
);

CurriculumVitae.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        authorCv: PropTypes.shape({
          shortBio: PropTypes.shape({
            en: PropTypes.string.isRequired,
            fr: PropTypes.string.isRequired
          }).isRequired
        }).isRequired,
        authorInfo: PropTypes.shape({
          email: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired,
  lg: PropTypes.string
};
