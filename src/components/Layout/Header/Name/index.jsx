import { graphql, Link, StaticQuery } from "gatsby";
import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import PropTypes from "prop-types";
import React from "react";
import { Name, Wrapper } from './styles';
import Typed from 'react-typed';

const Header = ({ data, className, ...props }) => {
  const [language, toggleLanguage] = useToggleGlobalLanguage()
  const siteConfig = data.site.siteMetadata.siteConfig
  const authorInfo = data.site.siteMetadata.authorInfo.title[language]
  const description = data.site.siteMetadata.authorCv.shortBio[language];
  return (
    <Wrapper data-testid="navigation" className={className} {...props}>
      <Name className={"name"}>
        <Link to="/" data-testid="home-title-link">
        <Typed
                    strings={[siteConfig.siteTitle + ","]}
                    typeSpeed={40}
                    showCursor={false}
                />
          {props.withDesc ? <span className={"desc"}>
          <Typed
                    strings={["^2000 " + description]}
                    typeSpeed={40}
                />
                </span>:           <Typed
                    strings={["^1000 " +  authorInfo]}
                    typeSpeed={40}
  /> }
        </Link>
      </Name>
    </Wrapper>
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
          authorInfo {
            title {
              fr
              en
            }
            github
            instagram
            twitter
            linkedin
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
)

Header.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        authorInfo : PropTypes.shape({
          title: PropTypes.shape({
            en: PropTypes.string.isRequired,
            fr: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
        siteConfig: PropTypes.shape({
          siteTitle: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}
