import React from 'react';
import NameHeader from 'components/Layout/Header/Name'
import Contact from 'components/Layout/Contact'
import { SketchComponentAbsoluteBackground } from 'components/Visual/P5js';
import { Wrapper } from '../styles'

const Recto = ({ bgSketch }) => {
  return (
    <Wrapper className={"recto"}>
      <SketchComponentAbsoluteBackground sketch={bgSketch} watchedVal={bgSketch} />
      <NameHeader style={{mixBlendMode: "multiply"}}/>
      <Contact withCv={false} style={{fontSize: "80%"}}/>
    </Wrapper>
  )
};

export default Recto;
