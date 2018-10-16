import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacer.horizontal};
  max-width: ${props => props.theme.container[props.type]};
  width: 100%;
  ${props =>
    props.type === 'text' &&
    css`
      a {
        color: inherit; /* blue colors for links too */
        text-decoration: inherit; /* no underline */
        text-decoration: none;
        transition: all 0.3s ease-in-out;
        &:hover {
          color: #410099;
        }
      }
      div {
        padding-right: 2rem;
        font-size: 22px;
      }
      h1 {
        font-weight: 500;
        letter-spacing: calc(-23 / 1000 * 1em);
        position: relative;
      }
      p, li {
        line-height: 32px;
      }
    `}; 
`;

const Container = ({ children, type, className }) => (
  <Wrapper className={className} type={type}>
    {children}
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
