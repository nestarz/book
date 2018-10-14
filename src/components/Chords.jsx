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
      <PatternLines
        id='vLines'
        height={200}
        width={200}
        stroke={theme.brand.secondary}
        strokeWidth={1}
      />
      <PatternLines
        id='hLines'
        height={200}
        width={200}
        stroke={theme.brand.secondary}
        strokeWidth={1}
        orientation={['horizontal']}
      />
      <PatternLines
        id='dLines'
        height={200}
        width={200}
        stroke={theme.brand.secondary}
        strokeWidth={1}
        orientation={['diagonal']}
      />
      <PatternLines
        id='dhLines'
        height={200}
        width={200}
        stroke={theme.brand.secondary}
        strokeWidth={1}
        orientation={['vertical', 'horizontal']}
      />
      <PatternCircles
        id='Circles'
        height={200}
        width={200}
        fill={theme.brand.secondary}
      />
      <PatternCircles
        id='cCircles'
        height={10}
        width={10}
        fill={theme.brand.secondary}
        complement
      />
      <PatternWaves
        id='Waves'
        height={200}
        width={200}
        fill="transparent"
        stroke={theme.brand.secondary}
        strokeWidth={1}
        complement
      />
      <PatternWaves
        id='bWaves'
        height={12}
        width={12}
        fill="transparent"
        stroke={theme.brand.secondary}
        strokeWidth={1}
        complement
      />
      <Bar
        fill={`url(#vLines)`}
        height={pHeight}
        width={pWidth}
        x={0}
        y={0}
        rx={0}
      />
      <Bar
        fill={`url(#hLines)`}
        height={pHeight}
        width={pWidth}
        x={pWidth}
        y={0}
        rx={0}
      />
      <Bar
        fill={`url(#dLines)`}
        height={pHeight}
        width={pWidth}
        x={pWidth * 2}
        y={0}
        rx={0}
      />
      <Bar
        fill={`url(#dhLines)`}
        height={pHeight}
        width={pWidth}
        x={pWidth * 3}
        y={0}
        rx={0}
      />
      <Bar
        fill={`url(#Circles)`}
        height={pHeight}
        width={pWidth}
        x={0}
        y={pHeight}
        rx={0}
      />
      <Bar
        fill={`url(#cCircles)`}
        height={pHeight}
        width={pWidth}
        x={pWidth}
        y={pHeight}
        rx={0}
      />
      <Bar
        fill={`url(#Waves)`}
        height={pHeight}
        width={pWidth}
        x={pWidth * 2}
        y={pHeight}
        rx={0}
      />
      <Bar
        fill={`url(#bWaves)`}
        height={pHeight}
        width={pWidth}
        x={pWidth * 3}
        y={pHeight}
        rx={0}
      />
    </svg>
  );
}
