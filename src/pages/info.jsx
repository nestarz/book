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
  display: flex;
  flex-wrap: wrap;
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
    margin-right: 0rem;
    font-size: 22px;
  }
  & > div {
    max-width: 600px;
    margin-right: 5rem;
  }
  div:last-child {
    margin-right: 0;
  }
  h1 {
    font-weight: 500;
    letter-spacing: calc(-23 / 1000 * 1em);
    position: relative;
  }
  @media (max-width: 600px) {
    h1 {
      font-size: 5.7vw !important;
    }
    div {
    margin-bottom: 20px;
    padding: 0;
  }
  & > div {
    max-width: 600px;
    margin-right: 0rem;
  }
  padding: 0 20px;
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

const WorkExperience = styled.div`
margin: 0 auto;
padding: 5rem ${props => props.theme.spacer.horizontal};
max-width: ${props => props.theme.container[props.type]};
width: 100%;
display: grid;
grid-auto-flow: dense;
grid-template-columns: repeat(auto-fit, minmax(360px, auto));
justify-content: center;
grid-gap: 2rem;
h1 {
  font-weight: 500;
  letter-spacing: calc(-23 / 1000 * 1em);
  position: relative;
}
div {
  font-size: 22px;
}
`

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
    <WorkExperience>
      <h1>Études</h1>
      <div className="">
        <h3>
          September 2018 — Present
        </h3>
        <div>
          DNMADE Objet(s) et système(s) d'objet(s) céramiques
        </div>
        <br/>
        <div>
          LTAA Auguste Renoir
        </div>
        <div>
          Paris, France
        </div>
      </div>
      <div className="">
      <h3>
          September 2015 — August 2017
        </h3>
        <div>
          Master Informatique Spécialité IMA (Image, vision par ordinateur, informatique graphique)
        </div>
        <br/>
        <div>
          Sorbonne Universités × Télécom ParisTech
        </div>
        <div>
          Paris, France
        </div>
      </div>
      <div className="">
      <h3>
          September 2012 — August 2015
        </h3>
        <div>
          Licence Mathématiques et Informatique Appliquées aux Sciences Humaines et Sociales, Parcours Sciences Cognitives
        </div>
        <br/>
        <div>
          Université de Bordeaux
        </div>
        <div>
          Bordeaux, France
        </div>
      </div>
    </WorkExperience>
    <WorkExperience>
      <h1>Work Expérience</h1>
      <div className="">
        <h3>
          April 2018 — September 2018
        </h3>
        <div>
          Automation in interior architecture based on various data (users, trades, retail, open-source). Work in machine and deep learning using framework like Tensorflow or pyTorch, in 3D content generation from 2D with Blender and OpenCV and in Datamining with BeautifulSoup and Scrapy. Assigned production with Docker and cloud services.
        </div>
        <br/>
        <div>
          Hubstairs
        </div>
        <div>
          Paris, France
        </div>
      </div>
      <div className="">
        <h3>
          January 2018 — April 2018
        </h3>
        <div>
          Bartender, prepare and serve hot, cold, simple or mixed drinks (cocktails). Washes the glasses, supplies the fridge, separates the recorded drainages from other non-recoverable waste. Also cleans the bar facilities and equipment. Responsible for supply and inventory management (drinks, glassware, small equipment ...).
        </div>
        <br/>
        <div>
          Indiana Café
        </div>
        <div>
          Paris, France
        </div>
      </div>
      <div className="">
        <h3>
          February 2017 — August 2017
        </h3>
        <div>
        Internship in Data Science and Deep Learning for Computer Vision at Rakuten where my mission is to classify, segment and localize garments in natural images for fashion image-based recommendation using state-of-the-art Deep Learning techniques.
        </div>
        <br/>
        <div>
          Rakuten Institute of Technology
        </div>
        <div>
          Paris, France
        </div>
      </div>
      <div className="">
        <h3>
          January 2016 — July 2016
        </h3>
        <div>
          Computer Vision Internship where I developed a real-time method using multiple cameras to simultaneously view and track a swarm of robots from multiple angles and at high resolutions using visual cues.
        </div>
        <br/>
        <div>
          National Institute for Robotics and Intelligent Systems (ISIR) 
        </div>
        <div>
          Paris, France
        </div>
      </div>
    </WorkExperience>
  </Layout>
);

export default About;
