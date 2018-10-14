import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'react-emotion';
import Img from 'gatsby-image';
import sample from 'lodash/sample';
import { overlay } from '../../config/theme';

const Item = styled.div`
  position: relative;
  min-width: 300px;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

const Wrapper = styled.div`
  display: grid;
  padding: 0rem 2rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 1rem;
  width: 100%;
  grid-template-columns: minmax(auto, 300px);
  grid-template-rows: 40vh 40vh;
  grid-template-areas:
  "p1  p1  p1  p2  p2"
  "p3  p3  p4  p4  p5";
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
  a {
    color: #fff;
    height: 100%;
    left: 0;
    opacity: 0;
    padding-bottom: calc(2 * calc(2 * .5rem));
    padding-left: 22px;
    padding-right: 22px;
    padding-top: calc(2 * .5rem);
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
  header {
    margin: 0rem 0rem;
    //background-color : ${props => props.theme.colors.bg_color};
    color: ${props => props.theme.colors.bg_color};
    pointer-events: none;
    display: block;
    h2 {
      font-size: 44px;
      line-height: 50px;
      margin-bottom: 1rem;
      font-weight: 500;
      letter-spacing: calc(-23 / 1000 * 1em);
    }
    p {
      font-size: 22px;
      letter-spacing: calc(-6 / 1000 * 1em);
      font-weight: 400;
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
  //background-color: ${props => props.theme.colors.bg_color};
  //box-shadow: inset 0 0 300px ${props => props.theme.colors.body_color};
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
  filter: blur(0px);
`

const ProjectListing = ({ projectEdges }) => (
  <Wrapper>
    {projectEdges.map(project => {
      const overlayColor = sample(overlay);
      const overlayStyle = {
        backgroundImage: 'radial-gradient(circle at top center,transparent 0,rgba(17,17,17,.75))'
      };
      return (
        <Item key={project.node.fields.slug}>
          <Content>
            <ImageWrapper>
              <Img fluid={project.node.frontmatter.cover.childImageSharp.fluid} />
            </ImageWrapper>
            <OverlayLink to={project.node.fields.slug} style={overlayStyle}>
            <header>
              <p>{project.node.frontmatter.client}</p>
              <h2>{project.node.frontmatter.title}</h2>
            </header>
            </OverlayLink>
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
