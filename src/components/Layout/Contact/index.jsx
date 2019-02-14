import { graphql, Link, StaticQuery } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import { useToggleGlobalLanguage } from "hooks/useLanguage";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import PropTypes from "prop-types";
import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SocialMedia, Wrapper } from "./styles";

const Contact = ({
  data,
  withIcons = true,
  withPhone = true,
  withEmail = true,
  withCv = true,
  ...props
}) => {
  const [language, toggleLanguage] = useToggleGlobalLanguage();
  let phoneNumber,
    formtattedPhone = "",
    splittedEmail;
  const authorInfo = data.site.siteMetadata.authorInfo;
  if (withEmail) {
    splittedEmail = authorInfo.email.split("@");
  }
  if (withPhone) {
    phoneNumber = parsePhoneNumberFromString(authorInfo.phone, "FR");
    formtattedPhone =
      language == "fr"
        ? phoneNumber.formatNational()
        : phoneNumber.formatInternational();
  }
  return (
    <Wrapper {...props}>
      <SocialMedia>
        <a
          href={authorInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Behance"
        >
          {withIcons ? <FaGithub /> : "Github"}
        </a>
        <a
          href={authorInfo.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          {withIcons ? <FaInstagram /> : "Instagram"}
        </a>
        <a
          href={authorInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Behance"
        >
          {withIcons ? <FaLinkedin /> : "Linkedin"}
        </a>
        <a
          href={authorInfo.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Dribbble"
        >
          {withIcons ? <FaTwitter /> : "Twitter"}
        </a>
        {withCv && (
          <Link to="/about/cv" data-testid="cv-link">
            CV Contact
          </Link>
        )}
      </SocialMedia>
      {splittedEmail && (
        <OutboundLink
          className={"email"}
          href={"mailto:" + data.site.siteMetadata.authorInfo.email}
        >
          {splittedEmail[0].split(".").join("")}
          <span style={{ fontSize: "80%" }}>(@</span>
          {splittedEmail[1].split(".")[0]}
          <span style={{ fontSize: "80%" }}>)</span>.
          {splittedEmail[1].split(".")[1]}
        </OutboundLink>
      )}
      {formtattedPhone && <div className={"phone"}>{formtattedPhone}</div>}
    </Wrapper>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            authorInfo {
              phone
              email
              github
              instagram
              twitter
              linkedin
            }
          }
        }
      }
    `}
    render={data => <Contact data={data} {...props} />}
  />
);

Contact.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        authorInfo: PropTypes.shape({
          email: PropTypes.string.isRequired,
          phone: PropTypes.string.isRequired,
          github: PropTypes.string.isRequired,
          instagram: PropTypes.string.isRequired,
          linkedin: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};
