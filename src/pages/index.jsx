import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'react-emotion';
//import { SketchComponent, Sketch1 } from '../components/P5js';
import theme from '../../config/theme';
import website from '../../config/website';
import LayoutWrapper from '../components/LayoutWrapper';
import Navigation from '../components/Navigation';
import { RotateOne as Scene3D } from '../components/Scenes3D';
import ContainerDimensions from 'react-container-dimensions'

import { SketchComponent } from 'components/P5js';
import sketch1 from 'components/P5js/projects/mainScreen/sketch1';

const Holder3D = styled.div`
position: fixed;
top:0;
left:0;
right:0;
bottom:0;
pointer-events: none;
mix-blend-mode: multiply;
`;

// const StyledSketch = styled(SketchComponent)`
//   position: fixed;
//   top: 0;
//   bottom: 0;
//   pointer-events: none;
//   z-index: 1000;
//   mix-blend-mode: screen;
// `;

const IndexWrapper = styled.div`
flex: 1;
display: flex;
color: ${props => props.theme.colors.body_color};
justify-content: space-between;
flex-direction: row;
align-content: space-between;
flex-direction: row;
@media (max-width: ${props => props.theme.breakpoints.m}) {
  flex-direction: row-reverse;
}
  h2 {
    font-size: 200%;
    font-weight: normal;
    margin: 0;
    margin-top: 20px;
  }
  h3 {
    font-size: 200%;
    font-weight: normal;
    margin: 0;
    a {
      &:hover {
        color: ${props => props.theme.brand.primary};
        &:before {
          content: "↘ ";
        }
      }
      color: inherit;
    }
  }
  nav {
    padding-bottom: 0em;
  }
  ul { list-style-type: none; margin: 0 }
  li {
    font-size: 200%;
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
    font-size: 200%;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: 0.01em;
    text-align: left;
    line-height: 1.7em;
    margin: 0em;
    padding-top: 3em;
    color: ${props => props.theme.colors.body_color};
  }
`;

const Index = ({
  data: {
    allMdx: { edges: projectEdges },
  },
}) => {
  var selectedPages = [
    {
      name: "floral",
      title: "Floral Experiment"
    },
    {
      name: "fausse3D",
      title: "Fausse 3D"
    }
  ]
  return (
    <div style={{overflow: "hidden"}}>
      <LayoutWrapper navType={"front"} layoutType={"main"} theme={theme.light} style={{padding: "30px"}}>
      <Holder3D>
        <ContainerDimensions>
          {parent => (
            // <Scene3D 
            //   height={parent.height}
            //   width={parent.width}
            //   main_color={theme.light.brand.primary} 
            //   bg_color={theme.light.colors.bg_color}
            // />
            <SketchComponent
            sketch={ sketch1 }
            width={parent.width}
            height={parent.height}
            sketchProps={{ value: 10 }}
            />
            )
          }
        </ContainerDimensions>
      </Holder3D>
      <Navigation navType={"front"} theme={theme.light}/>
        <IndexWrapper>
          <InfoSection>
            <header></header>
            <section></section>
            <p>{website.bio}</p>
          </InfoSection>
          <div className="container">
            <h2>Experiments</h2>
            {selectedPages.map((page, index) => {
              return (
                <h3>
                  <Link
                    to={"/"+page.name}
                  >
                    {page.title}
                  </Link>
                </h3>
              );
            })}            
            <h2>Projects</h2>
            {projectEdges.map((project, index) => {
              return (
                <h3>
                  <Link
                    to={project.node.parent.sourceInstanceName + "/" + project.node.parent.name}
                  >
                    {project.node.frontmatter.title}
                  </Link>
                </h3>
              );
            })}
          </div>
        </IndexWrapper>
      </LayoutWrapper>
      {/* <StyledSketch
        sketch={Sketch1}
        width={'100%'}
        height={'100vh'}
        sketchProps={{ value: 10 }}
      /> */}
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
    allMdx(
      filter: { fields: { sourceName: { eq: "projects" } } },
      sort: { fields: [frontmatter___date], 
      order: DESC }
      ) {
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