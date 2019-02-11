import React from 'react';
import { ImageWrapper, InfoBlock, Wrapper, Frontmatter } from './styles'
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import styled from 'styled-components';
import PrintHeader from 'components/Layout/Header/Print'
import Typed from 'components/Visual/Typed.js';

const StyledPrintHeader = styled(PrintHeader)`
@media (max-width: 600px) {
  justify-content: center;
  h1 {
    margin-top: 0.1em;
  }
}
h1, p {
  text-align: center;
}
`;
const formatter = buildFormatter(frenchStrings)
const Header = ({ birthtime, birthtimeTimeStamp, mtime, frontmatter, excerpt }) => {
  const strings = [
    `${frontmatter.title}`,
    `${frontmatter.title}` + `, <span class="desc">${frontmatter.subtitle ? frontmatter.subtitle : excerpt}</span>`,
  ];
  return <Wrapper>
    <Frontmatter>
      <h1>
        <Typed
          strings={strings}
          typeSpeed={10}
          showCursor={true}
          smartBackspace={true}
        /></h1>
      {/* <ImageWrapper>
      <InfoBlock>
      <div>{birthtime}</div>
      <div>modifié <TimeAgo formatter={formatter}  date={birthtimeTimeStamp}/></div>
          </InfoBlock>
    </ImageWrapper>
      <>
        {frontmatter.client &&
          <InfoBlock>
            <div>Où</div>
            <div>{frontmatter.client}</div>
          </InfoBlock>
        }
        {frontmatter.date &&
          <InfoBlock>
            <div>Date</div>
            <div>{frontmatter.date ? frontmatter.date : birthtime}</div>
          </InfoBlock>
        }
        {frontmatter.service &&
          <InfoBlock>
            <div>Pour</div>
            <div>{frontmatter.service}</div>
          </InfoBlock>
        }
      </> */}
    </Frontmatter>
  </Wrapper>
}

export default Header;
