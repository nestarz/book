import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import Typed from 'typed.js';

const TypedWrapper = styled.span`
    .typed-cursor{
        opacity: 1;
        animation: typedjsBlink 0.7s infinite;
        -webkit-animation: typedjsBlink 0.7s infinite;
        animation: typedjsBlink 0.7s infinite;
    }
    @keyframes typedjsBlink{
        50% { opacity: 0.0; }
    }
    @-webkit-keyframes typedjsBlink{
        0% { opacity: 1; }
        50% { opacity: 0.0;}
        100% { opacity: 1; }
    }
    .typed-fade-out{
        opacity: 0;
        transition: opacity .25s;
        -webkit-animation: 0;
        animation: 0;
    }
`;

const ReactTyped = ({ className, style, ...options }) => {
  const spanRef = useRef();
  const [typed, setTyped] = useState()
  useEffect(() => {
    setTyped(new Typed(spanRef.current, options))
    return function cleanup() {
      if (typed) typed.destroy();
    }
  }, [])
  useEffect(() => {
    if (typed &&
      typed.strings.join &&
      options.strings.join &&
      (typed.strings.join() != options.strings.join())) {
      typed.strings = options.strings;
      typed.reset();
    }
  }, [options.strings])
  return <TypedWrapper
    ref={spanRef}
    className={className}
    style={style}
  />
}

export default ReactTyped;
