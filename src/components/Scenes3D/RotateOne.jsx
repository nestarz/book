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

class ThreeScene extends Component{
  componentDidMount(){
    console.log(this.props.height, this.props.width);
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
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    //ADD CUBE
    const geometry = new THREE.BoxGeometry(1,1,1)
    // //console.log(this.props.theme.theme.colors.bg_color);
    //var material = new THREE.MeshNormalMaterial()
    const material = new THREE.MeshBasicMaterial({ color: this.props.main_color })
    this.cube = new THREE.Mesh(geometry, material)
    this.cube.position.z -= 5
    this.cube.rotation.y -= 10
    //this.scene.add(this.cube)

    // //ADD TEAPOT
    this.loader = new STLLoader();
    this.loader.load('assets/models/teapot.stl', (geometry) => {
      var material = new THREE.MeshNormalMaterial({})
      //var material = new THREE.MeshBasicMaterial({ color: "#202121" });
      var mesh = new THREE.Mesh(geometry, material)
      mesh.rotation.set( Math.PI * 1.5, 0, 0 );
      mesh.position.z -= 3;
      mesh.position.y -= 4;
      this.cube = mesh;
      this.scene.add(this.cube);
    });

    // PostProcess Effects
    this.composer = new EffectComposer(this.renderer);
		const chromaticAberrationEffect = new ChromaticAberrationEffect();
		const glitchEffect = new GlitchEffect({
			//perturbationMap: assets.get("perturbation-map"),
      chromaticAberrationOffset: chromaticAberrationEffect.offset,
      ratio: 1
		});
		const noiseEffect = new NoiseEffect({
			blendFunction: BlendFunction.COLOR_DODGE
		});
		noiseEffect.blendMode.opacity.value = 1;
    const bloomEffect = new BloomEffect({
			blendFunction: BlendFunction.LIGHTEN
    })
    bloomEffect.blendMode.opacity.value = 1;
    const pixelEffect = new PixelationEffect(3)
    pixelEffect.blendMode.opacity.value = 1;
    const glitchPass = new EffectPass(
      this.camera, 
      //chromaticAberrationEffect, 
      glitchEffect, 
      noiseEffect, 
      bloomEffect,
      //pixelEffect
      );
    glitchPass.renderToScreen = true;
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(new BlurPass({
      kernelSize: KernelSize.HUGE
    }));
    this.composer.addPass(glitchPass);
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
   this.cube.rotation.x += 0.0001
   this.cube.rotation.z += Math.random() * 0.01
   this.renderScene()
   let animateF = this.animate;
   setTimeout( function() {
    this.frameId = window.requestAnimationFrame(animateF)
   }, 1 );
 }
renderScene = () => {
  this.renderer.render(this.scene, this.camera);
  this.composer.render(this.clock.getDelta());
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