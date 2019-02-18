import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { initializeFFTs } from "./utils";
import { withTheme } from "styled-components";

const Vis = ({ style, className, bufferSize, features, analyzer, theme }) => {
  const mount = useRef(null);
  const featuresRef = useRef(features);
  const analyzerRef = useRef(analyzer);
  const themeRef = useRef(theme);
  const controls = useRef(null);

  useEffect(() => {
    let width = mount.current.clientWidth;
    let height = mount.current.clientHeight;
    let frameId;

    var aspectRatio = 16 / 10;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(40, aspectRatio, 0.1, 1000);

    var material = new THREE.LineBasicMaterial({
      color: theme.brand.primary
    });
    var yellowMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff
    });
    var ffts = initializeFFTs(20, bufferSize);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setClearColor(theme.bg_color);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);
    camera.position.z = 5;

    // Unchanging variables
    const length = 1;
    const hex = 0xffff00;
    const dir = new THREE.Vector3(0, 1, 0);
    const rightDir = new THREE.Vector3(1, 0, 0);
    const origin = new THREE.Vector3(1, -6, -15);

    // Variables we update
    let centroidArrow = new THREE.ArrowHelper(dir, origin, length, hex);
    let rolloffArrow = new THREE.ArrowHelper(dir, origin, length, 0x0000ff);
    let rmsArrow = new THREE.ArrowHelper(rightDir, origin, length, 0xff00ff);
    let lines = new THREE.Group(); // Lets create a seperate group for our lines
    // let loudnessLines = new THREE.Group();
    scene.add(centroidArrow);
    scene.add(rolloffArrow);
    scene.add(rmsArrow);

    // Render Spectrogram
    for (let i = 0; i < ffts.length; i++) {
      if (ffts[i]) {
        let geometry = new THREE.BufferGeometry(); // May be a way to reuse this

        let positions = new Float32Array(ffts[i].length * 3);

        geometry.addAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );
        geometry.setDrawRange(0, ffts[i].length);

        let line = new THREE.Line(geometry, material);
        lines.add(line);

        positions = line.geometry.attributes.position.array;
      }
    }

    let bufferLineGeometry = new THREE.BufferGeometry();
    let bufferLine = new THREE.Line(bufferLineGeometry, material);
    {
      let positions = new Float32Array(bufferSize * 3);
      bufferLineGeometry.addAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      bufferLineGeometry.setDrawRange(0, bufferSize);

      positions = bufferLine.geometry.attributes.position.array;
    }
    scene.add(bufferLine);
    scene.add(lines);

    const renderScene = () => {
      const theme = themeRef.current;
      renderer.setClearColor(theme.colors.bg_color);
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      width = mount.current.clientWidth;
      height = mount.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderScene();
    };

    const animate = () => {
      const features = featuresRef.current;
      const analyzer = analyzerRef.current;
      if (features) {
        ffts.pop();
        ffts.unshift(features.amplitudeSpectrum);
        const windowedSignalBuffer = analyzer._m.signal;

        for (let i = 0; i < ffts.length; i++) {
          var positions = lines.children[i].geometry.attributes.position.array;
          var index = 0;

          for (var j = 0; j < ffts[i].length * 3; j++) {
            positions[index++] = 10.7 + 8 * Math.log10(j / ffts[i].length);
            positions[index++] = -5 + 2 * ffts[i][j];
            positions[index++] = -15 - i;
          }

          lines.children[i].geometry.attributes.position.needsUpdate = true;
        }

        // Render Spectral Centroid Arrow
        if (features.spectralCentroid) {
          // SpectralCentroid is an awesome variable name
          // We're really just updating the x axis
          centroidArrow.position.set(
            10.7 + 8 * Math.log10(features.spectralCentroid / (bufferSize / 2)),
            -6,
            -15
          );
        }

        // Render Spectral Rolloff Arrow
        if (features.spectralRolloff) {
          // We're really just updating the x axis
          var rolloff = features.spectralRolloff / 22050;
          rolloffArrow.position.set(10.7 + 8 * Math.log10(rolloff), -6, -15);
        }
        // Render RMS Arrow
        if (features.rms) {
          // We're really just updating the y axis
          rmsArrow.position.set(-11, -5 + 10 * features.rms, -15);
        }

        if (windowedSignalBuffer) {
          // Render Signal Buffer
          let positions = bufferLine.geometry.attributes.position.array;
          let index = 0;
          for (var i = 0; i < bufferSize; i++) {
            positions[index++] = -11 + (22 * i) / bufferSize;
            positions[index++] = 4 + windowedSignalBuffer[i] * 5;
            positions[index++] = -25;
          }
          bufferLine.geometry.attributes.position.needsUpdate = true;
        }
      }
      renderScene();
      frameId = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = null;
    };

    mount.current.appendChild(renderer.domElement);
    window.addEventListener("resize", handleResize);
    start();

    controls.current = { start, stop };

    return () => {
      stop();
      window.removeEventListener("resize", handleResize);
      mount.current.removeChild(renderer.domElement);

      // scene.remove(cube);
      // geometry.dispose();
      // material.dispose();
    };
  }, []);

  useEffect(() => {
    featuresRef.current = features;
    analyzerRef.current = analyzer;
  }, [features, analyzer])

  useEffect(() => {
    themeRef.current = theme;
  }, [theme])

  return (
    <div
      style={{height: "100%", width: "100%", ...style}}
      className={className}
      ref={mount}
    />
  );
};

export default withTheme(Vis);
