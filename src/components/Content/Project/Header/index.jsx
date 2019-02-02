import React from 'react';
import {ImageWrapper, InfoBlock, Wrapper, Frontmatter } from './styles'
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(frenchStrings)
const Header = ({ birthtime, birthtimeTimeStamp, mtime, frontmatter, excerpt }) => {
  return <Wrapper>
    <Frontmatter>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.subtitle ? frontmatter.subtitle : excerpt}</p>
      <ImageWrapper>
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
      </>
    </Frontmatter>
  </Wrapper>
}

export default Header;
