import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
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
  @media (min-width: ${props => props.theme.breakpoints.m}) {
    display: grid;
    grid-template-columns: 20vw 1fr; /* 250px + "largeur restante" */
  }
`;

const InfoSection = styled.div`
  color: #111;
  text-align: justify;
  position: relative;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    display: none;
  }
  header, 
  section {
    background: radial-gradient(circle at 100%, ${theme.light.brand.primary}, ${theme.light.brand.primary} 50%, transparent 15%, transparent 75%);
    width: 100%;
    height: 100%;
    z-index: -1;
    top:-80px;
    position: absolute;
    filter: blur(10px);
  }
  a {
    color: #aaa;
  }
  p {
    padding: 10px 0;
  }
`;

const Index = ({
  data: {
    allMdx: { edges: projectEdges },
  },
}) => {
  return (
    <div>
    <LayoutWrapper navType={"front"} layoutType={"main"} theme={theme.light}>
      <IndexWrapper>
        <InfoSection>
					<p>I'm an artist and designer exploring the interaction of objects, people, art and technology using form and code with a mix of analog and digital materials.</p> 
					<p>Want me to create something for you? Wonderful&nbsp;— <a href="/contact/">let's talk.</a></p>
					<p>Find out more <a href="/about/">about me.</a></p>
					<p>Explore my work: <a href="/filter:data">data</a> / <a href="/filter:electronic">electronic</a> / <a href="/filter:web">web</a> / <a href="/filter:paper">paper</a> / <a href="/filter:plastic">plastic</a> / <a href="/filter:pixels">pixels</a> / <a href="/filter:iot">iot</a> / <a href="/filter:interface">interface</a> / <a href="/filter:time">time</a> / <a href="/filter:memories">memories</a> / <a href="/">everything</a></p>
					<p>Explore my <a href="/blog/">process blog.</a></p>
					{/* <p><a href="/events/">Talk</a> in Namur / <a href="https://www.kikk.be/2018/en/home">KIKK Festival</a> / Nov 1 2018–Nov 4 2018  </p>
					<p><a href="/events/">Talk</a> in Belfast / <a href="https://pixelpioneers.co">Pixel Pioneers</a> / Nov 23 2018  </p>
					<p><a href="/events/">Talk</a> in Nottingham / <a href="https://newadventuresconf.com/2019/">New Adventures</a> / Jan 23 2019–Jan 25 2019  </p> */}
          <header></header>
          <section></section>
        </InfoSection>
        <Listing listingType={"main"} projectEdges={projectEdges} />
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