import React from 'react';
import { Bar } from '@vx/shape';
import {
  PatternLines,
  PatternCircles,
  PatternWaves
} from '@vx/pattern';

export default ({
  width,
  height,
  theme,
}) => {
  const xMax = width;
  const yMax = height;
  const pWidth = xMax / 4;
  const pHeight = yMax / 2;
  if (width < 10) return null;
  return (
    <svg width={width} height={height}>
      <PatternCircles
        id='dhLines'
        height={20}
        width={20}
        stroke={theme.brand.primary}
        strokeWidth={1}
        orientation={['horizontal']}
      />
      <Bar
        fill={`url(#dhLines)`}
        height={yMax}
        width={xMax}
        x={0}
        y={yMax/6}
        rx={0}
      />
    </svg>
  );
}
