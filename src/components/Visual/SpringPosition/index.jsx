import useWindowMousePosition from "hooks/useWindowMousePosition";
import React, { useEffect } from "react";
import { animated, useSpring } from "react-spring";

const calc = (x, y) => [
  x - 0.5,
  y - 0.5
];
const trans4 = (x, y, i) =>
  `translate3d(${x * 5}%,${y * 5}%,0)`;

Object.defineProperty(Array.prototype, "flat", {
  value: function(depth = 1) {
    return this.reduce(function(flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) && depth - 1
          ? toFlatten.flat(depth - 1)
          : toFlatten
      );
    }, []);
  }
});

const Nav = ({ children, wrapper, style }) => {
  const mouse = useWindowMousePosition();
  const [springProps, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 200, tension: 1000, friction: 140 }
  }));
  useEffect(() => {
    set({ xy: calc(Math.random(), Math.random()) });
  }, [mouse]);
  const SpecificDiv = wrapper ? wrapper : animated.div;
  const flatChildren = Array.isArray(children) ? children.flat() : [children];
  return (
    <>
      {flatChildren.map((child, i) => (
        <SpecificDiv
          key={i}
          style={{
            ...style,
            ...springProps,
            transform: springProps.xy.interpolate((x, y) =>
              trans4(x, y, i / flatChildren.length)
            )
          }}
        >
          {child}
        </SpecificDiv>
      ))}
    </>
  );
};

export default Nav;
