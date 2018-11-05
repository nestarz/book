import React from 'react';
import PropTypes from 'prop-types';
import Item from "./Item";

import { 
  Wrapper
} from "./styles";

const MainListing = props => {
  const { projectEdges } = props;
  
  return (
    <Wrapper>
      {projectEdges.map((project, index) => {
        return (
          <Item index={index} project={project} key={project.node.parent.name} />
        );
      })}
    </Wrapper>
  );  
}
export default MainListing;

MainListing.propTypes = {
  projectEdges: PropTypes.array.isRequired,
};
