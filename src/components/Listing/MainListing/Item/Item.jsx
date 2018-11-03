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
  constructor (props) {
    super(props)
    this.state = {
      isHovering: false,
      isActive: false,
      currentCount: Math.trunc(Math.random() * 100)
    };
  }

  onMouseOver () {
    this.setState({ isHovering: true });
  }

  onMouseOut () {
    this.setState({ isHovering: false });
  }

  onClick () {
    var active = !this.state.isActive;
    this.setState({ isActive: active });
  }

  timer() {
    this.setState({
      currentCount: this.state.currentCount - 1
    })
    if(this.state.currentCount < 1) { 
      this.state.currentCount = 10;
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), 2000);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  render() {
    const { project } = this.props;
    const overlayStyle = {
      backgroundImage: 'radial-gradient(circle at center center, #5B9982)'
    };

    // use the classSet addon to concat an array of class names together
    var classes = classNames([
      //this.state.isHovering && 'hover',
      (this.state.currentCount % 5) && 'hover',
      this.state.isActive && 'active'
    ]);

    return (
      <Wrapper 
        onClick={this.onClick.bind(this)}
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
        >
          <Content>
          <ImageWrapper>
              <header>
              <h2>{project.node.frontmatter.title}</h2>
              </header>
              <Img fluid={project.node.frontmatter.cover.childImageSharp.fluid}/>
              {/* <DeepImg 
                src={project.node.frontmatter.cover.childImageDeepAi.fixed.src}
                className={classNames(classes)}
                /> */}
          </ImageWrapper>
          <OverlayLink to={project.node.parent.sourceInstanceName + "/" + project.node.parent.name} style={overlayStyle}>
          <header>
              <p>{project.node.frontmatter.client}</p>
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
