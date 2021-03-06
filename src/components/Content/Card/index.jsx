import * as sketcheModules from "components/Visual/P5js/projects/visit-card";
import React from "react";
import Recto from "./Recto";
import Verso from "./Verso";

const sketches = Object.values(sketcheModules);
const randomSelect = a => a[Math.floor(Math.random() * a.length)];
const sketchSelection = (sketch, sketchIndex) =>
  sketch
    ? sketch
    : sketchIndex || sketchIndex == 0
    ? sketches[sketchIndex % sketches.length]
    : randomSelect(sketches);

const Index = ({ className, style, sketch = null, sketchIndex = null }) => {
  const selectedSketch = sketchSelection(sketch, sketchIndex);
  return (
    <div className={className} style={style}>
      <Recto bgSketch={selectedSketch} />
      <Verso bgSketch={selectedSketch} />
    </div>
  );
};

export default Index;
