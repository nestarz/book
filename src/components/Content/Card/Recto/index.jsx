import Contact from "components/Content/Contact";
import NameHeader from "components/Content/Name";
import { SketchComponentAbsoluteBackground } from "components/Visual/P5js";
import React from "react";
import { Wrapper } from "../styles";

const Recto = ({ bgSketch }) => {
  return (
    <Wrapper className={"recto"}>
      <SketchComponentAbsoluteBackground
        sketch={bgSketch}
        watchedVal={bgSketch}
      />
      <NameHeader style={{ mixBlendMode: "multiply" }} />
      <Contact withCv={false} style={{ fontSize: "80%" }} />
    </Wrapper>
  );
};

export default Recto;
