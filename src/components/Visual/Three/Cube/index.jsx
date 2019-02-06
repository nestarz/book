import React, { useRef, useEffect, useState } from 'react';
import { mat4 } from 'gl-matrix';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
OBJLoader(THREE);

const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const getRotationMatrix = (lookAt) => {
  const radiansX = scale(lookAt.x, 0, 1, -0.25 * Math.PI, 0.55 * Math.PI);
  const radiansY = scale(lookAt.y, 0, 1, -0.25 * Math.PI, 0.55 * Math.PI);
  const rotationXmat = mat4.fromRotation(mat4.create(), radiansX, [0, 0, -1]);
  const rotationYmat = mat4.fromRotation(mat4.create(), radiansY, [0, 1, 0]);
  return mat4.multiply(mat4.create(), rotationXmat, rotationYmat);
}

const Vis = ({ className, lookAt }) => {
  const mount = useRef(null)
  const [isAnimating, setAnimating] = useState(true)
  const controls = useRef(null)
  const meta = useRef(null)

  useEffect(() => {
    let width = mount.current.clientWidth
    let height = mount.current.clientHeight
    let frameId

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: false })
    var light = new THREE.PointLight("white", 1, 100);
    light.position.set(0, 0, 30);
    scene.add(light);

    var loader = new THREE.OBJLoader();
    loader.load(
      '/assets/3d/models/suzanne.obj',
      (mesh) => {
        const phongMaterial = new THREE.MeshPhongMaterial({ color: 0x555555, specular: 0xffffff, shininess: 50, shading: THREE.SmoothShading });
        mesh.material = phongMaterial;
        mesh.rotation.set(Math.PI * 1.5, 0, Math.PI / 2);
        scene.add(mesh)
      }
    );

    camera.position.z = 2.5
    renderer.setClearColor('red')
    renderer.setSize(width, height)

    const renderScene = () => {
      renderer.render(scene, camera)
    }

    const animate = () => {
      width = mount.current.clientWidth
      height = mount.current.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderScene()
      frameId = window.requestAnimationFrame(animate)
    }

    const start = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(animate)
      }
    }

    const stop = () => {
      cancelAnimationFrame(frameId)
      frameId = null
    }

    mount.current.appendChild(renderer.domElement)
    start()

    controls.current = { start, stop }
    meta.current = { renderer, scene, camera }

    return () => {
      stop()
      mount.current.removeChild(renderer.domElement)

      scene.remove.apply(scene, scene.children);
      //geometry.dispose()
      //material.dispose()
    }
  }, [])

  useEffect(() => {
    if (isAnimating) {
      controls.current.start()
    } else {
      controls.current.stop()
    }
  }, [isAnimating])

  useEffect(() => {
    const { width, height } = meta.current.renderer.getSize();
    meta.current.scene.traverse((node) => {
      if (node instanceof THREE.Mesh && lookAt) {
        var rotationMat = new THREE.Matrix4();
        rotationMat.set(...getRotationMatrix(lookAt));
        node.rotation.setFromRotationMatrix(rotationMat);
      }
    });
  }, [lookAt])

  return <div className={className} ref={mount} onClick={() => setAnimating(!isAnimating)} />
}

export default Vis;
