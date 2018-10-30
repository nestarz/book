import React from "react"
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import classNames from 'classnames/bind';


import { 
    Content,
    ImageWrapper,
    OverlayLink,
    Wrapper,
    DeepImg
} from "./styles";

class Item extends React.Component {
  constructor () {
    super()
    this.state = {
      isHovering: false,
      isActive: false
    };
  }

  // GOOD: set this.state.isHovering to true on mouse over
  handleMouseOver () {
    this.setState({ isHovering: true });
  }

  // GOOD: set this.state.isHovering to false on mouse leave
  handleMouseOut () {
    this.setState({ isHovering: false });
  }

  // GOOD: toggle this.state.isActive on click
  handleClick () {
    var active = !this.state.isActive;
    this.setState({ isActive: active });
  }

  render() {
    const { project } = this.props;
    const overlayStyle = {
      backgroundImage: 'radial-gradient(circle at center center, transparent 0, #B8DAB4)'
    };
    console.log(project.node.frontmatter.cover.childImageDeepAi);

    // use the classSet addon to concat an array of class names together
    var classes = classNames([
      this.state.isHovering && 'hover',
      this.state.isActive && 'active'
    ]);

    return (
      <Wrapper 
        onClick={this.handleClick.bind(this)}
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}
        >
          <Content>
          <ImageWrapper>
              <Img fluid={project.node.frontmatter.cover.childImageSharp.fluid}/>
              <DeepImg 
                src={project.node.frontmatter.cover.childImageDeepAi.fixed.src}
                className={classNames(classes)}
                />
          </ImageWrapper>
          <OverlayLink to={project.node.parent.sourceInstanceName + "/" + project.node.parent.name} style={overlayStyle}>
          <header>
              <p>{project.node.frontmatter.client}</p>
              <h2>{project.node.frontmatter.title}</h2>
          </header>
          </OverlayLink>
          </Content>
      </Wrapper>    
    )
  }
}

export default Item;

Item.propTypes = {
  project: PropTypes.array.isRequired,
};
