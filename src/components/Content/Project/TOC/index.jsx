import SpringPosition from 'components/Layout/SpringPosition';
import { SketchComponentAbsoluteBackground } from 'components/Visual/P5js';
import * as sketcheModules2 from 'components/Visual/P5js/projects/visit-card';
import React from 'react';
import { animated } from 'react-spring';
import { Content, Wrapper } from './styles';

const sketches = [...Object.values(sketcheModules2)];
const randomSelect = a => a[Math.floor(Math.random() * a.length)];
const sketchSelection = (sketch, sketchIndex) => sketch ? sketch :
((sketchIndex || sketchIndex == 0) ? sketches[sketchIndex % sketches.length] : randomSelect(sketches))


const TOC = ({ tableOfContents }) => <Wrapper>
  {/* <SketchComponentAbsoluteBackground
    style={{
      zIndex: -1,
      top: "0",
      transform: "scale(1, 1)"
    }}
    sketch={sketchSelection()}
    sketchProps={{ frameRate: 0.1, noLoop: true }}
  /> */}
  <Content>
    <ol>
      <li>
        {tableOfContents.items.map((heading, index) => {
          return (
            <React.Fragment key={index}>
              <h3 key={`h3-${index}`}>
                <a href={heading.url}>{heading.title}</a>
              </h3>
              <ul key={`ul-${index}`}>
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
            </React.Fragment>
          );
        })}
      </li>
    </ol>
  </Content>
</Wrapper>

export default TOC;
