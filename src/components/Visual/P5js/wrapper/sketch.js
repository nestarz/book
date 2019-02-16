import useComponentSize from "@rehooks/component-size";
import { useToggleGlobalLanguage } from "hooks/useLanguage";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { RemountOnResize } from "./remount";
import SketchComponentRaw from "./raw";

const SketchComponentFixed = props => {
  if (typeof window === "undefined") {
    return <div />;
  }
  return (
    <RemountOnResize
      /* Since canvas interferes with CSS layouting,
      we unmount and remount it on resize events */
      watchedVal={props.watchedVal}
    >
      <SketchComponentRaw
        sketch={props.sketch}
        sketchProps={props.sketchProps}
        noCanvas={props.noCanvas}
        width={props.width}
        height={props.height}
        style={props.style}
        className={props.className}
      />
    </RemountOnResize>
  );
}
  

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
export const SketchOff = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.grey};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const SketchComponent = props => {
  const [language, toggleLanguage] = useToggleGlobalLanguage();
  var { className, style, ...otherProps } = props;
  const wrapperRef = useRef(null);
  const wrapperSize = useComponentSize(wrapperRef);
  const defaultVisible =
    typeof props.visible == "undefined" ? true : props.visible;
  const [visible, setVisible] = useState(defaultVisible);
  if (visible) {
    return (
      <Wrapper style={style} className={className} ref={wrapperRef}>
        <SketchComponentFixed
          width={wrapperSize.width}
          height={wrapperSize.height}
          {...otherProps}
        />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper style={style} className={className} ref={wrapperRef}>
        <SketchOff onClick={() => setVisible(true)}>
          <div>{language == "fr" ? "Cliquer pour voir" : "Click to see"}</div>
        </SketchOff>
      </Wrapper>
    );
  }
};
export const SketchComponentBackground = styled(SketchComponent)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;
export const SketchComponentAbsoluteBackground = styled(
  SketchComponentBackground
)``;
export const SketchComponentFixedBackground = styled(SketchComponentBackground)`
  position: fixed;
`;
