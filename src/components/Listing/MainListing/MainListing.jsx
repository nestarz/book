import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import theme from '../../../../config/theme';

import { 
    Wrapper,
    Content,
    ImageWrapper,
    OverlayLink,
    Item,
} from "./styles";

const MainListing = props => {
  const { projectEdges } = props;
  
  return (
    <Wrapper>
      {projectEdges.map(project => {
        const overlayStyle = {
          backgroundImage: 'radial-gradient(circle at center center, transparent 0, #B8DAB4)'
        };
        console.log(project.node.frontmatter.cover.childImageDeepAi);
        return (
          <Item key={project.node.parent.name}>
          <Content>
            <ImageWrapper>
              {/* <Img fluid={project.node.frontmatter.cover.childImageSharp.fluid} /> */}
              <img src={project.node.frontmatter.cover.childImageDeepAi.fixed.src}/>
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
    </Wrapper>
  );  
}
export default MainListing;

MainListing.propTypes = {
  projectEdges: PropTypes.array.isRequired,
};
