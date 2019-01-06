import React from 'react';
import { Link } from 'gatsby';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { css } from 'styled-components';
import { animated, Spring, config } from 'react-spring'

import siteConfig from '../../../config/website';
import {
  Wrapper,
  Name,
  RightGroup,
  Nav,
  SocialMedia
} from "./styles";

const Navigation = ({ children, type, className, theme }) => {
  return (
    <Wrapper className={className}>
      <Spring
        config={config.slow}
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
      >
        {props => (
          <Name style={props}>
            <Link to="/">{siteConfig.siteTitle},</Link>
            <span>{siteConfig.siteDescription}</span>
          </Name>
        )}
      </Spring>
      <Spring config={config.slow} delay={500} from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {props => (
          <RightGroup style={props}>
            <SocialMedia>
              <a href="https://github.com/nestarz" target="_blank" rel="noopener noreferrer">
                GitHub
        </a>
              <a href="https://www.instagram.com/eliasrhouzlane" target="_blank" rel="noopener noreferrer">
                Instagram
        </a>
              <a href="https://linkedin.com/in/elias-rhouzlane-56070197/" target="_blank" rel="noopener noreferrer">
                LinkedIn
        </a>
              <Link
                to="/cv"
              >Contact/CV
        </Link>
            </SocialMedia>
          </RightGroup>
        )}
      </Spring>

    </Wrapper>
  )
};

export default Navigation;
