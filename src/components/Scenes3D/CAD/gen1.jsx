import React, { Component } from 'react';
import * as THREE from 'three';

var STLLoader = require('three-stl-loader')(THREE)

class CADExample extends Component{
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      width:0,
      height:0
    };
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  componentDidMount(){
    const { bg_color, main_color } = this.props;

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);  
    document.addEventListener('mousemove', this.handleMouseMove);
    console.log(this.props);
    const width = this.props.width 
    const height = this.props.height
    this.start()

    
    var { CAG, CSG } = require('@jscad/csg');
    //const jscad = require('@jscad/openjscad')
    // and just run it, providing csg/cag data
    let cube1 = CSG.cube({
      r: 10,
      fn: 20
    })
    //const outputData = jscad.generateOutput('stlb', cube1)
    console.log(cube1);

  }
componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
    window.removeEventListener('resize', this.updateWindowDimensions);
    document.removeEventListener('mousemove', this.handleMouseMove);
  }
handleMouseMove = (e) => {
  this.setState({ x: e.screenX/this.state.width, y: e.screenY/this.state.height });
}
start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
stop = () => {
    cancelAnimationFrame(this.frameId)
  }
animate = () => {
}
render(){
    return(
      <div
        style={{ width: this.width + 'px', height: this.height + 'px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}
export default CADExample