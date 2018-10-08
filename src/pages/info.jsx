import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import { Header, Container, Layout } from 'components';
import config from '../../config/website';
import theme from '../../config/theme';

const About = () => (
  <Layout theme={theme.light}>
    <Helmet title={`About | ${config.siteTitle}`} />
    <Container type="info">
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
    </Container>
  </Layout>
);

export default About;
