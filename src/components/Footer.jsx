import React from 'react';
import styled from 'react-emotion';
import { Spring, config } from 'react-spring';
import { TimingAnimation, Easing } from 'react-spring/dist/addons';

const Wrapper = styled.footer`
  margin: 5rem 0;
  padding: 1rem ${props => props.theme.spacer.horizontal};
  text-align: center;
  font-size: 100px;
  a {
    text-decoration: none;
    color: ${props => props.theme.brand.primary};
  }
`;

const Footer = () => (
  <Wrapper>
    <Spring
      impl={TimingAnimation} 
      config={{ duration: 5000, easing: Easing.linear }}
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}>
      {props => <div style={props}>✌️</div>}
    </Spring>
  </Wrapper>
);

export default Footer;
