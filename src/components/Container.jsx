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
      p {
        font-size: 1.25rem;
        letter-spacing: -0.003em;
        line-height: 1.58;
        --baseline-multiplier: 0.179;
        --x-height-multiplier: 0.35;
      }
    ` || props.type === 'info' &&
    css`
      display: grid;
      padding: 0 4rem;
      grid-template-columns: 4fr 2fr 2fr;
      a {
        color: inherit; /* blue colors for links too */
        text-decoration: inherit; /* no underline */
        text-decoration: none;
        transition: all 0.3s ease-in-out;
        &:hover {
          color: red;
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
      ul {
        list-style: none;
        margin-left: 0rem;
      }
      p, li {
        line-height: 32px;
        margin-bottom: 0;
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
