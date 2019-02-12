import React from "react";
import { Frontmatter, InfoBlock, Wrapper } from "./styles";

const Header = ({ birthtime, frontmatter }) => {
  return (
    <Wrapper>
      <Frontmatter>
        <>
          {frontmatter.date && (
            <InfoBlock>
              <div>Date</div>
              <div>{frontmatter.date ? frontmatter.date : birthtime}</div>
            </InfoBlock>
          )}
        </>
      </Frontmatter>
    </Wrapper>
  );
};

export default Header;
