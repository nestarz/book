import React, { Component } from 'react';
import * as THREE from 'three';
var STLLoader = require('three-stl-loader')(THREE)

class ThreeScene extends Component{
  componentDidMount(){
    const width = this.props.width 
    const height = this.props.height
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
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    //ADD CUBE
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: this.props.theme.colors.bg_color })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)

    // //ADD TEAPOT
    this.loader = new STLLoader();
    this.loader.load('assets/models/teapot.stl', (geometry) => {
      var material = new THREE.MeshNormalMaterial()
      var material = new THREE.MeshBasicMaterial({ color: this.props.theme.brand.primary });
      var mesh = new THREE.Mesh(geometry, material)
      mesh.rotation.set( Math.PI * 1.5, 0, 0 );
      mesh.position.z -= 20;
      this.cube = mesh;
      this.scene.add(this.cube);
    });

this.start()
  }
componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
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
   this.cube.rotation.x += 0.005
   this.cube.rotation.y += 0.005
   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }
renderScene = () => {
  this.renderer.render(this.scene, this.camera)
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