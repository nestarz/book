import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { withScreenSize } from '@vx/responsive';

import { Chords as Motif } from '../../Motifs';
import { AnimatedSurface } from '../../Shaders';
import theme from '../../../../config/theme';

import { 
    Wrapper,
    Content,
    ImageWrapper,
    OverlayLink,
    Item,
    MotifWrapper,
} from "./styles";

let MotifResponsive = withScreenSize(
  ({ screenWidth, screenHeight, ...rest }) => (
    <AnimatedSurface width={screenWidth} height={screenHeight} {...rest} />
  )
);

const MainListing = props => {
  const { projectEdges } = props;
  
  return (
    <Wrapper>
      {projectEdges.map(project => {
        const overlayStyle = {
          backgroundImage: 'radial-gradient(circle at bottom right, transparent 0, #1F67F6)'
        };
        return (
          <Item key={project.node.parent.name}>
          <Content>
            <ImageWrapper>
              <Img fluid={project.node.frontmatter.cover.childImageSharp.fluid} />
            </ImageWrapper>
            <OverlayLink to={project.node.parent.sourceInstanceName + "/" + project.node.parent.name} style={overlayStyle}>
            <header>
              <p>{project.node.frontmatter.client}</p>
              <h2>{project.node.frontmatter.title}</h2>
            </header>
            </OverlayLink>
          </Content>
        </Item>
        );
      })}
      <MotifWrapper>
        <MotifResponsive theme={theme.light}/>
      </MotifWrapper>
    </Wrapper>
  );  
}
export default MainListing;

MainListing.propTypes = {
  projectEdges: PropTypes.array.isRequired,
};
