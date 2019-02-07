import React, { useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import useWindowMousePosition from 'hooks/useWindowMousePosition';

const calc = (x, y) => [x / window.innerWidth - 0.5, y / window.innerHeight - 0.5]
const trans4 = (x, y, i) => `translate3d(${x*5}%,${(y*i)*5}%,0) rotate(${(x+(i-0.5))*0.5}deg)`
Object.defineProperty(Array.prototype, 'flat', {
  value: function(depth = 1) {
    return this.reduce(function (flat, toFlatten) {
      return flat.concat((Array.isArray(toFlatten) && (depth-1)) ? toFlatten.flat(depth-1) : toFlatten);
    }, []);
  }
});

const Nav = ({children, wrapper}) => {
  const mouse = useWindowMousePosition()
  const [springProps, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 100, tension: 550, friction: 140 },
    from : {opacity: 0},
    opacity: 1
  }))
  useEffect(() => {
    set({ xy: calc(mouse.x, mouse.y) })
  }, [mouse])
  const SpecificDiv = wrapper ? wrapper : animated.div;
  const flatChildren = children.flat();
  return (
    <>
      {flatChildren.map((child, i) => (
        <SpecificDiv key={i} style={{ ...springProps, transform: springProps.xy.interpolate((x,y) => trans4(x, y, i/flatChildren.length)) }}>
          {child}
        </SpecificDiv>
      ))}
    </>
  )
}

export default Nav;
