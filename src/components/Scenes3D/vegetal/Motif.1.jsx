//http://blog.felixbreuer.net/2014/08/05/using-threejs-to-create-vector-graphics-from-3d-visualizations.html
import React, { Component } from 'react';
import * as THREE from 'three';
import {
	BlendFunction,
	ChromaticAberrationEffect,
	EffectPass,
  GlitchMode,
  EffectComposer,
  RenderPass,
	GlitchEffect,
	NoiseEffect,
  SMAAEffect,
  PixelationEffect,
  BloomEffect,
  BlurPass,
  KernelSize
} from "postprocessing";

var STLLoader = require('three-stl-loader')(THREE)

// const jscad = require('@jscad/openjscad')
// const csg = require('csg').CSG
// const input = csg.cube([1, 1, 1]) // one of many ways to create a CSG object
 
// const outputData = jscad.generateOutput('stlb', input)
 
// // hurray ,we can now write an stl file from our raw CSG objects
// console.log(outputData)

// Standard Normal variate using Box-Muller transform.
function randn_bm() {
  var u = 0, v = 0;
  while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

class ThreeScene extends Component{
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
    //ADD CLOCK
    this.clock = new THREE.Clock();
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 2
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
    let color = new THREE.Color(bg_color).getHex();
    this.renderer.setClearColor(color, 1)
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    //ADD CUBE
    //const geometry = new THREE.BoxGeometry(1,1,1)
    const geometry = new THREE.CylinderGeometry( 5, 5, 10, 10 );
    // //console.log(this.props.theme.theme.colors.bg_color);
    //var material = new THREE.MeshNormalMaterial()
    const material = new THREE.MeshBasicMaterial({ color: main_color })
    this.cube = new THREE.Mesh(geometry, material)
    this.cube.position.z = -15
    this.cube.position.x += 0;
    //this.cube.position.y += 1;
    this.cube.rotation.z -= 10;
    this.savedVertices = this.cube.geometry.vertices.map(a => ({...a}));
    this.scene.add(this.cube)

    this.start()
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
   this.cube.rotation.x += 0.00001
   this.cube.rotation.z += Math.random() * 0.01
   //this.cube.position.z = this.state.x - 100;
  //  //let indexVt = Math.floor(Math.random() * this.cube.geometry.vertices.length);
  //  for (let index = 0; index < this.savedVertices.length; index++) {
  //   this.cube.geometry.vertices[index].y = this.savedVertices[index].y;
  //  }
  //  if (Math.random() > 0.5) {
  //   let indexVt = Math.floor((Math.sin(this.cube.rotation.x * 10000) + 1)*.5 * this.cube.geometry.vertices.length);
  //   this.cube.geometry.vertices[indexVt].y = this.savedVertices[indexVt].y + (-1 + randn_bm() * 2) * Math.random() * 0.5;
  //   this.cube.geometry.verticesNeedUpdate = true;
  // }

   this.cube.rotation.y = Math.PI * Math.sin((-this.state.y + this.state.x)/2);
   this.cube.rotation.z = Math.PI * Math.sin(this.state.x);
   this.renderScene()
   let animateF = this.animate;
   setTimeout( function() {
    this.frameId = window.requestAnimationFrame(animateF)
   }, 1 );
 }
renderScene = () => {
  this.renderer.render(this.scene, this.camera);
  //this.composer.render(this.clock.getDelta());
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
export default ThreeScene