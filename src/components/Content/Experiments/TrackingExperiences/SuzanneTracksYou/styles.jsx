import EmotionalFace from "components/Visual/EmotionalFace";
import Scene from "components/Visual/Three/Cube";
import styled from "styled-components";

export const StyledScene = styled(Scene)`
  width: 100%;
  max-height: 100%;
  height: 100%;
  object-fit: contain;
`;
export const StyledEmotionalFace = styled(EmotionalFace)`
  position: absolute;
  right: -2em;
  bottom: 0em;
  height: 10em;
  width: 10em;
  filter: invert(1);
`;

export const Canvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
