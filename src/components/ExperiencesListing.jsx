import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'react-emotion';
import Img from 'gatsby-image';
import sample from 'lodash/sample';
import { overlay } from '../../config/theme';

const WrapperItem = styled.div`
border: 1px solid white;
padding: 1rem;
margin-left: -1px;
margin-top: -1px;
header {
  padding: 1.2rem 1rem;
  background-color : white;
  color: ${props => props.theme.colors.body_color};
  letter-spacing: calc(-3 / 1000 * 1em);
  font-weight: 500;
  font-size: calc(1.2 * .5rem);
  line-height: calc(2 * .5rem);
  div {
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
    font-size: 0.8rem;
    flex-wrap: wrap;
  }
  h2 {
    font-size: 1.3rem;
    line-height: 50px;
    margin-bottom: 0rem;
    margin-top: .5rem;
    font-weight: 500;
    letter-spacing: calc(-23 / 1000 * 1em);
  }
  p {
    font-size: 1rem;
    letter-spacing: calc(-6 / 1000 * 1em);
    font-weight: 400;
  }
}
`;

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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 0 5%;
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

const ExperiencesListing = ({ projectEdges }) => (
  <Wrapper>
    {projectEdges.map(project => {
      const overlayColor = sample(overlay);
      const overlayStyle = {
        backgroundImage: 'radial-gradient(circle at top center,transparent 0,rgba(17,17,17,.75))'
      };
      return (
        <WrapperItem>
            <Link to={project.node.sourceInstanceName + "/" + project.node.name} style={overlayStyle}>
            <header>
           <div>
            <span>{project.node.sourceInstanceName}</span>
          </div>
          <h2>{project.node.name}</h2>
        </header>
            </Link>
        </WrapperItem>
      );
    })}
  </Wrapper>
);

export default ExperiencesListing;

ExperiencesListing.propTypes = {
  projectEdges: PropTypes.array.isRequired,
};
