import Typed from 'components/Visual/Typed.js';
import { graphql, Link, StaticQuery } from "gatsby";
import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import PropTypes from "prop-types";
import React from "react";
import { Name, Wrapper } from './styles';

const Header = ({ data, className, withDesc, ...props }) => {
  const [language, toggleLanguage] = useToggleGlobalLanguage()
  const siteConfig = data.site.siteMetadata.siteConfig
  const authorInfo = data.site.siteMetadata.authorInfo.title[language]
  const description = data.site.siteMetadata.authorCv.shortBio[language];
  const iam = language == "fr" ? "Je suis" : "I am";
  const strings = [
    (language == "fr" ? "Bonjour !" : "Hi !"),
    `${iam} ${siteConfig.siteTitle}`,
    ...(withDesc ? [
      `${iam} ${siteConfig.siteTitle}` + `, <span class="desc">${description}</span>`
    ] : [
        `${iam} ${siteConfig.siteTitle}` + `, <span class="desc">${authorInfo}</span>`,
      ])
  ];
  return (
    <Wrapper data-testid="navigation" className={className} {...props}>
      <Name className={"name"}>
        <Link to="/" data-testid="home-title-link">
          <Typed
            strings={strings}
            typeSpeed={10}
            showCursor={true}
            smartBackspace={true}
          />
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
        authorInfo: PropTypes.shape({
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
