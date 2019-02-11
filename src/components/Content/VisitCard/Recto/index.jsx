import Contact from 'components/Layout/Contact';
import NameHeader from 'components/Layout/Header/Name';
import { SketchComponentAbsoluteBackground } from 'components/Visual/P5js';
import React from 'react';
import { Wrapper } from '../styles';

const Recto = ({ bgSketch }) => {
  return (
    <Wrapper className={"recto"}>
      <SketchComponentAbsoluteBackground sketch={bgSketch} watchedVal={bgSketch} />
      <NameHeader style={{ mixBlendMode: "multiply" }} />
      <Contact withCv={false} style={{ fontSize: "80%" }} />
    </Wrapper>
  )
};

export default Recto;
