import React from "react";
import styled from "styled-components";

const SvgHolder = styled.div`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  svg {
    .st0 {
      fill: ${props => props.theme.brand.primary};
    }
    width: 3em;
    height: 3em;
    animation-name: spin;
    animation-duration: 90s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
`;
const Star = ({ className }) => {
  return (
    <SvgHolder className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        viewBox="457.5 335.6000061035156 140 137.79998779296875"
        xmlSpace="preserve"
        preserveAspectRatio="xMidYMid meet"
      >
        <polygon
          className="st0"
          points="527.5,374.5 539.7,335.6 537.8,376.3 562.5,343.9 546.8,381.5 581.1,359.5 553.5,389.5 593.3,380.6   557,399.3 597.5,404.5 557,409.7 593.3,428.4 553.5,419.5 581.1,449.5 546.8,427.5 562.5,465.1 537.8,432.7 539.7,473.4   527.5,434.5 515.3,473.4 517.2,432.7 492.5,465.1 508.2,427.5 473.9,449.5 501.5,419.5 461.7,428.4 498,409.7 457.5,404.5   498,399.3 461.7,380.6 501.5,389.5 473.9,359.5 508.2,381.5 492.5,343.9 517.2,376.3 515.3,335.6 "
        />
      </svg>
    </SvgHolder>
  );
};

export default Star;
