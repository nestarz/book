import React from "react"
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import classNames from 'classnames/bind';

import { RotateOne as Scene3D } from '../../../Scenes3D';
import { ParentSize } from '@vx/responsive';
import ContainerDimensions from 'react-container-dimensions'

import { 
    Content,
    ImageWrapper,
    OverlayLink,
    ItemWrapper,
    DeepImg,
    TestWrapper,
    ItemInfo,
    Holder3D
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
    const { index, project } = this.props;
    const overlayStyle = {
      backgroundImage: 'radial-gradient(circle at center center, #5B9982)'
    };

    // use the classSet addon to concat an array of class names together
    var classes = classNames([
      //this.state.isHovering && 'hover',
      (this.state.currentCount % 5) && 'hover',
      this.state.isActive && 'active'
    ]);

    let infoBox;
    if (index > 2) {
      infoBox = (
        <ItemInfo>
          <h2>{project.node.excerpt}</h2>
        </ItemInfo>
      )
    }

    return (
      <>
      <TestWrapper>
      <header>
        <h2>{project.node.frontmatter.title}</h2>
        {/* <p>{project.node.frontmatter.client}</p> */}
      </header>
      <ItemWrapper 
        onClick={this.onClick.bind(this)}
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
        >
          <Content>
            <ImageWrapper>
                {/* <Img fluid={project.node.frontmatter.cover.childImageSharp.fluid}/> */}
                {/* <DeepImg 
                  src={project.node.frontmatter.cover.childImageDeepAi.fixed.src}
                  // className={classNames(classes)}
                  /> */}
            </ImageWrapper>
            <OverlayLink to={project.node.parent.sourceInstanceName + "/" + project.node.parent.name} style={overlayStyle}>
              {/* <section>
                  <p>{project.node.frontmatter.client}</p>
              </section> */}
              <Holder3D>
                <ContainerDimensions>
                  {parent => (
                    <Scene3D 
                      height={parent.height}
                      width={parent.width}
                      bg_color={"red"} 
                      main_color={"blue"}
                    />)
                  }
                </ContainerDimensions>
              </Holder3D>
            </OverlayLink>
          </Content>
      </ItemWrapper>   
      </TestWrapper>
      {infoBox}
      </>
    )
  }
}

export default Item;

Item.propTypes = {
  project: PropTypes.array.isRequired,
};
