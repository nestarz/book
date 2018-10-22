import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 4rem ${props => props.theme.spacer.horizontal};
  background-color: ${props => props.theme.colors.body_color};
  color: ${props => props.theme.colors.bg_color};
  width: 100%;
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding: 2rem 1rem;
  }
  ${props =>
    props.type === 'text' &&
    css`
      a {
        color: inherit; /* blue colors for links too */
        text-decoration: inherit; /* no underline */
        text-decoration: none;
        transition: all 0.3s ease-in-out;
        &:hover {
          color: ${props.theme.brand.primary};
        }
      }
      h1, h2, h3, h4 {
        font-weight: 500;
        letter-spacing: calc(-23 / 1000 * 1em);
      }
      div {
        @media (min-width: ${props.theme.breakpoints.s}) {
          font-size: 22px;
        }
        font-size: 16px;
      }
      h1 {
        font-weight: 500;
        letter-spacing: calc(-23 / 1000 * 1em);
        position: relative;
      }
      p, li {
        line-height: 32px;
      }
      li {
        line-height: 28px;
      }
      ul { list-style: none;}

      li { position: relative;}
      
      li:before {
          position: absolute;  
          vertical-align: middle;
          display: inline-block;
          content: "";
          margin-left: -9px;
      }
    `}; 
`;

const SecondWrapper = styled.div`
  max-width: ${props => props.theme.container[props.type]};
  margin: auto;
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    max-width: none;
  }
`
const Container = ({ children, type, className }) => (
  <Wrapper className={className} type={type}>
    <SecondWrapper type={type}>
      {children}
    </SecondWrapper>
  </Wrapper>
);

export default Container;

Container.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['base', 'text']),
  className: PropTypes.string,
};

Container.defaultProps = {
  type: 'base',
  className: null,
};
