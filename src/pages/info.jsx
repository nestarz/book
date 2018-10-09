import React from 'react';
import Helmet from 'react-helmet';
import { Layout } from 'components';
import config from '../../config/website';
import theme from '../../config/theme';
import styled, { css } from 'react-emotion';


const MainInformation = styled.div`
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacer.horizontal};
  max-width: ${props => props.theme.container[props.type]};
  width: 100%;
  display: grid;
  padding: 0 4rem;
  grid-template-columns: 4fr 2fr 2fr;
  a {
    color: inherit; /* blue colors for links too */
    text-decoration: inherit; /* no underline */
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: ${props => props.theme.brand.primary};
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
`;


const About = () => (
  <Layout theme={theme.light}>
    <Helmet title={`About | ${config.siteTitle}`} />
    <MainInformation>
    <div>
      <h1>Elias Rhouzlane is a Ceramic and Object Designer student and a former Deep Learning Engineer.</h1>
      <h1>Currently studying Ceramics and Object Design at <a href="http://ltaa-augusterenoir-paris.com/">LTAA Auguste Renoir</a> under a DNMADE OC until 2021.</h1>
    </div>
    <div>
      <h1>Contact</h1>
      <a href={'mailto:' +config.email} Subject="Hello%20Elias%20!">elias.rhouzlane@gmail.com</a>
    </div>
    <div>
      <h1>Social</h1>
      <ul>
        <li><a href={config.linkedin}>LinkedIn</a></li>
        <li><a href={config.instagram}>Instagram</a></li>
        <li><a href={config.github}>Github</a></li>
        <li><a href={config.pinterest}>Pinterest</a></li>
      </ul>
    </div>
    </MainInformation>
  </Layout>
);

export default About;
