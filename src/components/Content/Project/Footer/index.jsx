import React from 'react';
import {ImageWrapper, InfoBlock, Wrapper, Frontmatter } from './styles'
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import PrintHeader from 'components/Layout/Header/Print'

const formatter = buildFormatter(frenchStrings)
const Header = ({ birthtime, birthtimeTimeStamp, mtime, frontmatter, excerpt }) => {
  return <Wrapper>
    <Frontmatter>
      <ImageWrapper>
      <InfoBlock>
      <div>modifié <TimeAgo formatter={formatter}  date={birthtimeTimeStamp}/></div>
          </InfoBlock>
    </ImageWrapper>
    <InfoBlock>
    <div>Auteur</div>
    <div>Elias Rhouzlane</div>
          </InfoBlock>
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
