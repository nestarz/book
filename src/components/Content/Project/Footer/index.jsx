import React from 'react';
import { Frontmatter, ImageWrapper, InfoBlock, Wrapper } from './styles';

const Header = ({ birthtime, birthtimeTimeStamp, mtime, frontmatter, excerpt }) => {
  return <Wrapper>
    <Frontmatter>
      <>
        {frontmatter.date &&
          <InfoBlock>
            <div>Date</div>
            <div>{frontmatter.date ? frontmatter.date : birthtime}</div>
          </InfoBlock>
        }
      </>
    </Frontmatter>
  </Wrapper>
}

export default Header;
