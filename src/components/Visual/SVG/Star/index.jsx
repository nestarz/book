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
    path {
      fill: ${props => props.theme.brand.primary};
    }
    width: 10em;
    height: 10em;
    /* animation-name: spin;
    animation-duration: 90s;
    animation-iteration-count: infinite;
    animation-timing-function: linear; */
  }
`;
const Star = ({ className }) => {
  return (
    <SvgHolder className={className}>
      Prev.
    </SvgHolder>
  );
};

export default Star;
