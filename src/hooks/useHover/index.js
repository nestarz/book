'use strict';
let { useState, useEffect } = require('react');

function useHover(ref) {
  const [ isHovered, setHover ] = useState(false)

  function handleMouseEnter () {
    setHover(true)
  }

  function handleMouseLeave () {
    setHover(false)
  }

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.addEventListener('mouseenter', handleMouseEnter)
      ref.current.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (ref && ref.current) {
        ref.current.removeEventListener('mouseenter', handleMouseEnter)
        ref.current.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  })

  return isHovered
}

module.exports = useHover;
