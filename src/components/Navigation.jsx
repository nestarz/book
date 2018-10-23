import React from 'react';
import { Link } from 'gatsby';
import { FaInstagram, FaLinkedin, FaPinterest, FaGithub, FaUnderline } from 'react-icons/fa';
import styled, { css } from 'react-emotion';
import config from '../../config/website';
import { ThreeScene, HamburgerMenu } from '../components';


const Wrapper = styled.header`
  align-items: baseline;
  display: flex;
  flex: 1 0 auto;
  flex-wrap: wrap;
  justify-content: space-around; /* ADJUSTMENT */
  @media (min-width: ${props => props.theme.breakpoints.m}) {
    justify-content: space-between; /* ADJUSTMENT */
    flex-wrap: nowrap;
  }
  padding: 3.5rem 0 4.7rem 0;
  letter-spacing: calc(-6 / 1000 * 1em);
  a {
    color: ${props => props.theme.colors.body_color};
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: ${props => props.theme.brand.primary};
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding: 1rem 0 3rem 0;
    flex-wrap: wrap;
  }
`;

const active = styled.css`
  color: ${props => props.theme.brand.primary} !important;
  position: relative;
  &:after {
    background-color: ${props => props.theme.brand.primary};
    border-radius: 10px;
    bottom: -10px;
    content: '';
    height: 5px;
    left: calc(50% - 10px);
    position: absolute;
    width: 20px;
    z-index:-1000;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  font-size: 22px;
  a:not(:first-child) {
    margin-left: 1rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding: 0 1rem;
  }
`;

const Name = styled.div`
flex-basis: auto; /* default value */
text-align: center;
  padding: 0 ${props => props.theme.spacer.horizontal};
  font-size: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  a {
    font-family: ${`${config.headerFontFamily}, sans-serif`};
    &:hover,
    &:focus {
      text-decoration: none;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    flex: 1 0 100%;
    margin-bottom: 0.75rem;
  }
`;

const SocialMedia = styled.div`
  display: flex;
  flex: 0;
  justify-content: flex-end;
  padding: 0 ${props => props.theme.spacer.horizontal};
  a {
    font-size: 1.25rem;
    line-height: 20px;
  }
  a:not(:first-child) {
    margin-left: 1rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding: 0 1rem;
  }
`;

const RightGroup = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 20px;
`

const Navigation = (theme) => (
  <Wrapper>
    {/* <HamburgerMenu/> */}
    <Name>
    <ThreeScene width={window.innerWidth} height={window.innerHeight} theme={theme} />
    <div><Link to="/">{config.siteTitle}</Link> — {config.siteDescription}</div>
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
          to="/experiences"
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
);

export default Navigation;
