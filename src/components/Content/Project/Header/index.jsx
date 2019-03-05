import Typed from "components/Visual/Typed.js";
import React from "react";
import Img from "gatsby-image";

const Header = ({
  birthtime,
  birthtimeTimeStamp,
  mtime,
  frontmatter,
  excerpt
}) => {
  const strings = [
    `${frontmatter.title}`,
    `${frontmatter.title}` +
      `, <span class="desc">${
        frontmatter.subtitle ? frontmatter.subtitle : excerpt
      }</span>`
  ];
  return (
    <header>
      <span>
        <h1>{frontmatter.title}</h1>
        <span class="desc">
          {frontmatter.subtitle ? frontmatter.subtitle : excerpt}
        </span>
      </span>
    </header>
  );
};

export default Header;
