import { SketchComponentAbsoluteBackground } from "components/Visual/P5js";
import backgroundSketch from "components/Visual/P5js/projects/mainScreen/sketch4";
import React from "react";
import Body from "./Body";
import Header from "./Header";
import { Wrapper } from "./styles";

export const Letter = ({ frontmatter, body }) => {
  let content = (
    <div>
      <Header frontmatter={frontmatter} />
      <Body body={body} />
    </div>
  );
  return (
    <Wrapper>
      {content}
      <SketchComponentAbsoluteBackground sketch={backgroundSketch} />
      {content}
    </Wrapper>
  );
};

export default Letter;
