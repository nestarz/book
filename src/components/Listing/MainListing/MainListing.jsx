import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import { 
    Wrapper,
    Item
} from "./styles";

const MainListing = props => {
  const { projectEdges } = props;
  
  return (
    <Wrapper>
      {projectEdges.map(project => {
        return (
          <Item key={project.node.parent.name}>
            <Img fluid={project.node.frontmatter.cover.childImageSharp.fluid} />
            <h2>{project.node.frontmatter.title}</h2>
            <h3>{project.node.frontmatter.client}</h3>
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
