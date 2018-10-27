import React from 'react';
import styled from 'react-emotion';
import { Spring, config } from 'react-spring';
import { TimingAnimation, Easing } from 'react-spring/dist/addons';

const Wrapper = styled.footer`
  margin: 3rem 0;
  padding: 1rem ${props => props.theme.spacer.horizontal};
  text-align: center;
  font-size: 40px;
  a {
    text-decoration: none;
    color: ${props => props.theme.colors.body_color};
  }
`;

const Footer = () => (
  <Wrapper>
    {/* <Spring
      impl={TimingAnimation} 
      config={{ duration: 5000, easing: Easing.linear }}
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}>
      {props => <div style={props}><a href="mailto:elias.rhouzlane@gmail.com">✌️</a></div>}
    </Spring> */}
  </Wrapper>
);

export default Footer;
