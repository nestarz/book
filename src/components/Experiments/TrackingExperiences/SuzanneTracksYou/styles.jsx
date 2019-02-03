import EmotionalFace from "components/Visual/EmotionalFace";
import Scene from "components/Visual/Three/Cube";
import styled from 'styled-components';

export const StyledScene = styled(Scene)`
width: 100%;
max-height: 100%;
height: 100%;
object-fit: contain;
`;
export const StyledEmotionalFace = styled(EmotionalFace)`
position: absolute;
right: 1vw;
bottom: 5vw;
height: 10vw;
width: 10vw;
`;
