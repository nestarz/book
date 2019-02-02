import React from 'react';
import Header from './Header'
import TOC from './TOC'
import Body from './Body'
import styled from 'styled-components';

const Wrapper = styled.div`
`;
export const Project = ({ excerpt, birthtime, birthtimeTimeStamp, mtime, frontmatter, tableOfContents, body }) => {
  return (
    <>
      <Wrapper>
        <Header
          frontmatter={frontmatter}
          birthtime={birthtime}
          birthtimeTimeStamp={birthtimeTimeStamp}
          mtime={mtime}

          excerpt={excerpt}
          />
        {tableOfContents &&
          tableOfContents.items &&
          <TOC tableOfContents={tableOfContents} />
        }
      </Wrapper>
      <Body body={body} />
    </>
  )
}

export default Project;
