import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'react-emotion';
import { SketchComponent, Sketch1 } from '../components/P5js';
import theme from '../../config/theme';
import LayoutWrapper from '../components/LayoutWrapper';
import Listing from '../components/Listing';

const StyledSketch = styled(SketchComponent)`
  position: fixed;
  top: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1000;
  mix-blend-mode: screen;
`;

const IndexWrapper = styled.div`
flex: 1;
display: flex;
justify-content: space-between;
flex-direction: row;
align-content: space-between;
  h2 {
    font-size: 1.4em;
    font-weight: normal;
  }
  nav {
    padding-bottom: 0em;
  }
  ul { list-style-type: none; margin: 0 }
  li {
    font-size: 1.4em;
    margin: 0;
    a {
      color: inherit;
      text-decoration: none;
    }
  }
  .cvli {
    display: grid;
    grid-template-columns: 1fr 150px;
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    max-width: 600px;
    text-align: right;
  }
`;

const InfoSection = styled.div`
  padding: 0rem;
  padding-bottom: 0em;
  justify-content: flex-end;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  position: relative;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    display: none;
  }
  header, 
  section {
    //background: radial-gradient(circle at 100%, ${theme.light.brand.primary}, ${theme.light.brand.primary} 50%, transparent 15%, transparent 75%);
    width: 100%;
    height: 100%;
    z-index: -1;
    top:-80px;
    position: absolute;
    //filter: blur(10px);
  }
  a {
    color: #aaa;
  }
  p {
    font-size: 2.4em;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: 0.01em;
    text-align: left;
    line-height: 1.7em;
    margin: 0em;
    padding-top: 3em;
  }
`;

const Index = ({
  data: {
    allMdx: { edges: projectEdges },
  },
}) => {
  let school = [
    // {
    //   from: "2018",
    //   to: "",
    //   title: "DNMADE Objet(s) et système(s) d'objet(s) céramiques",
    //   etablishment: "LTAA Auguste Renoir",
    //   location: "Paris, France"
    // },
    // {
    //   from: "2015",
    //   to: "2017",
    //   title: "Master Informatique Spécialité IMA (Image, vision par ordinateur, informatique graphique)",
    //   etablishment: "Sorbonne Universités × Télécom ParisTech",
    //   location: "Paris, France"
    // },
    // {
    //   from: "2012",
    //   to: "2015",
    //   title: "Licence Mathématiques et Informatique Appliquées aux Sciences Humaines et Sociales, Parcours Sciences Cognitives",
    //   etablishment: "Université de Bordeaux",
    //   location: "Bordeaux, France"

    // }
  ]
  let work = [
    // {
    //   from: "2018",
    //   to: "",
    //   title: "Freelance",
    //   etablishment: "",
    //   location: "Paris, France"
    // },
    // {
    //   from: "2018",
    //   to: "",
    //   title: "Hubstairs",
    //   etablishment: "Hubstairs",
    //   location: "Paris, France"
    // },
    // {
    //   from: "2017",
    //   to: "",
    //   title: "Rakuten",
    //   etablishment: "Rakuten",
    //   location: "Paris, France"
    // }
  ]
  return (
    <div>
      <LayoutWrapper navType={"front"} layoutType={"main"} theme={theme.light}>
        <IndexWrapper>
          <InfoSection>
            <p>
              Currently studying Ceramics and Object Design at LTAA Auguste Renoir exploring the interaction of objects, people, art and technology using form and code with a mix of analog and digital materials.
            </p>
            {/* <p>I'm an artist and designer exploring the interaction of objects, people, art and technology using form and code with a mix of analog and digital materials.</p> 
            <p>Want me to create something for you? Wonderful&nbsp;— <a href="/contact/">let's talk.</a></p>
            <p>Find out more <a href="/about/">about me.</a></p>
            <p>Explore my work: <a href="/filter:data">data</a> / <a href="/filter:electronic">electronic</a> / <a href="/filter:web">web</a> / <a href="/filter:paper">paper</a> / <a href="/filter:plastic">plastic</a> / <a href="/filter:pixels">pixels</a> / <a href="/filter:iot">iot</a> / <a href="/filter:interface">interface</a> / <a href="/filter:time">time</a> / <a href="/filter:memories">memories</a> / <a href="/">everything</a></p>
            <p>Explore my <a href="/blog/">process blog.</a></p> */}
            {/* <p><a href="/events/">Talk</a> in Namur / <a href="https://www.kikk.be/2018/en/home">KIKK Festival</a> / Nov 1 2018–Nov 4 2018  </p>
            <p><a href="/events/">Talk</a> in Belfast / <a href="https://pixelpioneers.co">Pixel Pioneers</a> / Nov 23 2018  </p>
            <p><a href="/events/">Talk</a> in Nottingham / <a href="https://newadventuresconf.com/2019/">New Adventures</a> / Jan 23 2019–Jan 25 2019  </p> */}
            <header></header>
            <section></section>
          </InfoSection>
          <div className="container">
            <nav>
              <h2>
                Projects
          </h2>
              <ul>
                {projectEdges.map((project, index) => {
                  // return (
                  //   <li><Link to={project.node.parent.sourceInstanceName + "/" + project.node.parent.name}>{project.node.frontmatter.title}</Link></li>
                  // );
                })}
              </ul>
            </nav>
            <nav>
              <h2>
                Work
          </h2>
              <ul>
                {
                  work.map((project, index) => {
                    return (
                      <li className="cvli"><span>{project.from} {project.to ? "à" : ""} {project.to}</span> <span>{project.title}</span></li>
                    );
                  })
                }
              </ul>
            </nav>
            <nav>
              <h2 style={{ padding: 0, margin: 0 }}>
                School
          </h2>
              <ul>
                {
                  school.map((project, index) => {
                    return (
                      <li className="cvli"><span>{project.title}</span> <span>{project.from} {project.to ? "à" : ""} {project.to}</span></li>
                    );
                  })
                }
              </ul>
            </nav>
          </div>
        </IndexWrapper>
      </LayoutWrapper>
      <StyledSketch
        sketch={Sketch1}
        width={'100%'}
        height={'100vh'}
        sketchProps={{ value: 10 }}
      />
    </div>
  )
};

export default Index;

Index.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query IndexQuery {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          parent {
            ... on File {
              sourceInstanceName
              name
            }
          }
          excerpt(pruneLength: 200)
          frontmatter {
            service
            date(formatString: "DD MMMM YYYY", locale: "en")
            client
            title
            cover {
              childImageDeepAi {
                id
                fixed {
                  src
                }
              }
              childImageSharp {
                fluid(
                    quality: 80
                ){
                    ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;