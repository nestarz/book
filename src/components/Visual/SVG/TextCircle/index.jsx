import React from "react";
import styled from "styled-components";
import Typing from "external/react-typing-animation/src/Typing";

const SvgHolder = styled.div`
  svg.stamp {
    position: fixed;
    right: 2em;
    bottom: 2em;
    stroke: #000000;
    fill: ${props => props.theme.colors.body_color};
  }
`;
const TextCircle = ({ children, className }) => {
  return (
    <SvgHolder className={className}>
      <svg
        className={"stamp"}
        xmlns="http://www.w3.org/2000/svg"
        height="154px"
        width="154px"
      >
        <path
          id="myTextPath"
          d="M 64,0 A 64,64 0 0 1 -64,0 A 64,64 0 0 1 64,0"
          transform="translate(80,80)"
          fill="none"
          stroke="transparent"
          stroke-width="25"
        />
        <text stroke-width="0">
          <textPath xlinkHref="#myTextPath">
            <tspan dy="5">
              <Typing speed={100} element={""} cursorElement={"tspan"}>
                {children} <Typing.Cursor />
              </Typing>
            </tspan>
          </textPath>
        </text>
      </svg>
    </SvgHolder>
  );
};

export default TextCircle;
