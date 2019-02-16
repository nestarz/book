import { graphql, Link, StaticQuery } from "gatsby";
import { useToggleGlobalLanguage } from "hooks/useLanguage";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.header`
  position: relative;
  &:after {
    content: '';
    font-size: 1400%;
    position: absolute;
    filter: grayscale(1) contrast(5) saturate(0);

  }
  h1 {
    margin: 0;
  }
  .videoDennett {
    z-index: -1;
    position: absolute;
    left: 0;
    right: 1em;
    bottom: 0;
    top: 100%;
  }
  .name a > span:first-child{
    transform: scale(1.4,1);
    display: block;
    transform-origin: left;
  }
`;

const Header = ({
  data: {
    site: { siteMetadata }
  },
  className,
  withDesc,
  withoutDragon,
  ...props
}) => {
  const [language, toggleLanguage] = useToggleGlobalLanguage();
  return (
    <Wrapper withoutDragon={withoutDragon} className={className} {...props}>
      <h1 className={"name"}>
        <Link to="/">
          <span>{siteMetadata.siteConfig.siteTitle}, </span>
          <span className={"desc"}>
            {siteMetadata.authorInfo.title[language]}
          </span>
        </Link>
      </h1>
    </Wrapper>
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
            authorInfo {
              title {
                fr
                en
              }
            }
            siteConfig {
              siteTitle
            }
          }
        }
      }
    `}
    render={data => <Header data={data} {...props} />}
  />
);

Header.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        authorInfo: PropTypes.shape({
          title: PropTypes.shape({
            en: PropTypes.string.isRequired,
            fr: PropTypes.string.isRequired
          }).isRequired
        }).isRequired,
        siteConfig: PropTypes.shape({
          siteTitle: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};
