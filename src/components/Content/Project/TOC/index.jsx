import React from 'react';
import { Wrapper, Content } from './styles'
import { SketchComponentAbsoluteBackground } from 'components/Visual/P5js';
import backgroundSketch from 'components/Visual/P5js/projects/mainScreen/sketch1_0';
import SpringPosition from 'components/Layout/SpringPosition';
import { animated } from 'react-spring';

const TOC = ({ tableOfContents }) => <Wrapper>
  <SketchComponentAbsoluteBackground
    style={{
      zIndex: -1,
      filter: "blur(40px)",
      top: "0",
      transform: "scale(2, 2.35)"
    }}
    sketch={backgroundSketch}
    sketchProps={{ frameRate: 0.1, noLoop: true }}
  />
  <Content>
    <ol>
      <SpringPosition wrapper={animated.li}>
        {tableOfContents.items.map((heading, index) => {
          return (
            <>
              <h3>
                <a href={heading.url}>{heading.title}</a>
              </h3>
              <ul>
                {heading.items && heading.items.map((subheading, j) => {
                  return (
                    <li key={j}>
                      <h3>
                        <a href={subheading.url}>{subheading.title}</a>
                      </h3>
                    </li>
                  );
                })}
              </ul>
            </>
          );
        })}
      </SpringPosition>
    </ol>
  </Content>
</Wrapper>

export default TOC;
