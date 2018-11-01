import React from 'react';
import { Link } from 'gatsby';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { css } from 'react-emotion';

import config from '../../../../config/website';
import { 
    Wrapper,
    Name,
    RightGroup,
    Nav,
    SocialMedia,
    active
} from "./styles";

const Navigation = (theme) => {
  return (
  <Wrapper>
    <Name>
    <svg viewBox="0 0 525 300">
            <path id="bigArc" d="M6,150C49.63,93,105.79,36.65,156.2,47.55,207.89,58.74,213,131.91,264,150c40.67,14.43,108.57-6.91,229-145" stroke="#059008" fill="transparent"/>
        <text>
            <textPath xlinkHref="#bigArc" startOffset="49%" text-anchor="middle">
              <Link to="/">{config.siteTitle}</Link> — {config.siteDescription}
            </textPath>
        </text>
    </svg>
    </Name>
    <RightGroup>
      <Nav>
        <Link
          to="/"
          activeClassName={css`
            ${active};
          `}
        >
          Work
        </Link>
        <Link
          to="/share"
          activeClassName={css`
            ${active};
          `}
        >
          Share
        </Link>
        <Link
          to="/sketch_test"
          activeClassName={css`
            ${active};
          `}
        >
          Fun
        </Link>
        <Link
          to="/info"
          activeClassName={css`
            ${active};
          `}
        >
          Info
        </Link>
      </Nav>
      <SocialMedia>
      <a href="https://github.com/nestarz" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://www.instagram.com/eliasrhouzlane" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com/in/elias-rhouzlane-56070197/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </SocialMedia>
    </RightGroup>
  </Wrapper>
)};

export default Navigation;
