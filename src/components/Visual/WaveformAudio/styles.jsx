import styled from "styled-components";

export const VjsPlayer = styled.div`
  column-span: all;
  position: relative;
  right: 0;
  margin: 0px;
  height: calc(150px + 30px);
  .video-js.vjs-16-9 {
    padding-top: 150px;
  }

  .video-js .vjs-control-bar {
    background-color: transparent;
  }
  .video-js {
    background-color: transparent;
    color: ${props => props.theme.colors.body_color};
  }
`;
