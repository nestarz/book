import React from "react";
import { Content } from "./styles";
const TOC = ({ tableOfContents }) => (
    <Content>
      <ol>
        {tableOfContents.items.map((heading, index) => {
          return (
            <li key={index}>
              <h3 key={`h3-${index}`}>
                <a href={heading.url}>{heading.title}</a>
              </h3>
              <ul key={`ul-${index}`}>
                {heading.items &&
                  heading.items.map((subheading, j) => {
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
);

export default TOC;
