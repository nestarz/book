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
      <h1>
        <Typed
          strings={strings}
          typeSpeed={10}
          showCursor={true}
          smartBackspace={true}
        />
      </h1>
    </header>
  );
};

export default Header;
