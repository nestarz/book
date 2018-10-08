import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'react-emotion';
import Img from 'gatsby-image';
import sample from 'lodash/sample';
import { overlay } from '../../config/theme';

const Item = styled.div`
  position: relative;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

const Wrapper = styled.div`
  display: grid;
  padding: 0 2rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 1rem;
  width: 100%;
  grid-template-columns: minmax(auto, 300px);
  grid-template-rows: 45vh 45vh;
  grid-template-areas:
  "p1  p1  p1  p2  p2"
  "p3  p3  p4  p5  p6";
  width: 100%;
  & ${Item}:nth-child(1)  { grid-area: p1; }
  & ${Item}:nth-child(2)  { grid-area: p2; }
  & ${Item}:nth-child(3)  { grid-area: p3; }
  & ${Item}:nth-child(4)  { grid-area: p4; }
  & ${Item}:nth-child(5)  { grid-area: p5; }
`;

const Content = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  header {
    display: none;
  }
  a {
    color: #fff;
    height: 100%;
    left: 0;
    opacity: 0;
    padding: 2rem;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
    transition: all 0.3s ease-in-out;
    text-decoration: none;

    &:hover {
      color: #fff;
      opacity: 1;
      text-decoration: none;
    }
  }
  a:hover + header {
    margin: -4rem 0rem;
    padding: 2rem;
    background-color: white;
    pointer-events: none;
    display: block;
    h2 {
      margin-bottom: 1rem;
    }
    p {
      font-size: 150%;
    }
  }
`;

const ImageWrapper = styled.div`
  > div {
    height: 100%;
    left: 0;
    position: absolute !important;
    top: 0;
    width: 100%;
    z-index: -1;
    > div {
      position: static !important;
    }
  }
`;

const OverlayLink = styled(Link)`
  //background-color: ${props => props.theme.brand.primary};
  //box-shadow: inset 0 0 100px #000;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
  mix-blend-mode: color-dodge;
  filter: blur(50px);
`

const ProjectListing = ({ projectEdges }) => (
  <Wrapper>
    {projectEdges.map(project => {
      const overlayColor = sample(overlay);
      const overlayStyle = {
        backgroundImage: 'radial-gradient(circle at center top, purple 20px, black)'
      };
      return (
        <Item key={project.node.fields.slug}>
          <Content>
            <ImageWrapper>
              <Img fluid={project.node.frontmatter.cover.childImageSharp.fluid} />
            </ImageWrapper>
            <OverlayLink to={project.node.fields.slug} style={overlayStyle}/>
            <header>
              <h2>{project.node.frontmatter.title}</h2>
              <p>{project.node.frontmatter.client}</p>
            </header>
          </Content>
        </Item>
      );
    })}
  </Wrapper>
);

export default ProjectListing;

ProjectListing.propTypes = {
  projectEdges: PropTypes.array.isRequired,
};
