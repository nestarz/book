import React from "react";
import styled from "styled-components";

const VideoWrapper = styled.div`
  position: relative;
  border-radius: 50%;
  margin-top: 0.5em;
  &:before {
    content: "";
    display: block;
    padding-top: calc(1 / 1 * 100%);
  }
  .videoContent {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    video {
      max-width: 100%;
      border-radius: 50%;
      filter: grayscale(1);
    }
    &:before {
      background-image: url(${props => props.theme.noisy_uri});
      border-radius: 50%;
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      mix-blend-mode: overlay;
      z-index: 2;
    }
    &:after {
      border-radius: 50%;
      background: radial-gradient(
        transparent -3%,
        ${props => props.theme.colors.bg_color} 50%
      );
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      content: "";
      z-index: 3;
      transform: scale(1.05);
    }
  }
`;

const Media = ({ children, ...props }) => {
  return (
    <VideoWrapper {...props}>
      <div class={"videoContent"}>{children}</div>
    </VideoWrapper>
  );
};

export default Media;
