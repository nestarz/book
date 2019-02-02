import React from 'react';
import { Wrapper, Content } from './styles'
import { SketchComponentAbsoluteBackground } from 'components/Visual/P5js';
import backgroundSketch from 'components/Visual/P5js/projects/mainScreen/sketch1_0';

const TOC = ({ tableOfContents }) => <Wrapper>
  <SketchComponentAbsoluteBackground
    style={{
      zIndex: -1,
      filter: "blur(50px)",
      top: "-10%",
      transform: "scale(1, 1.2)"
    }}
    sketch={backgroundSketch} />
  <Content>
    <ol>
      {tableOfContents.items.map((heading, index) => {
        return (
          <li key={index}>
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
          </li>
        );
      })}
    </ol>
  </Content>
</Wrapper>

export default TOC;
