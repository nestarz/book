import React from 'react';
import styled from 'react-emotion';

const Wrapper = styled.footer`
  margin: 5rem 0;
  padding: 1rem ${props => props.theme.spacer.horizontal};
  text-align: center;
  a {
    text-decoration: none;
    color: ${props => props.theme.brand.primary};
  }
`;

const Footer = () => (
  <Wrapper>
  </Wrapper>
);

export default Footer;
