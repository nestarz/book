import NameHeader from 'components/Layout/Header/Name';
import { SketchComponentAbsoluteBackground } from 'components/Visual/P5js';
import backgroundSketch from 'components/Visual/P5js/projects/mainScreen/sketch3';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import React from 'react';
import styled from 'styled-components';

const AchivementBlock = styled.div`
  ul {
    font-size: 100%;
    list-style-type: none;
    margin: 1em 0;
    padding: 0;
    li {
        margin: 0;
        padding: 0;
    }
}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LeftCv = ({ data, withToggle = true }) => {
  const [language, toggleLanguage] = useToggleGlobalLanguage()
  return <Wrapper>
    <SketchComponentAbsoluteBackground sketch={backgroundSketch} />
    <div>
      <NameHeader style={{ fontSize: "170%" }} />
      <OutboundLink className={"email"} href={"mailto:" + data.site.siteMetadata.authorInfo.email}>
        {data.site.siteMetadata.authorInfo.email}
      </OutboundLink>
    </div>
    {withToggle && <button onClick={() => toggleLanguage()}>En/Fr ({language})</button>}
    <AchivementBlock>
      <h1>{data.site.siteMetadata.authorCv.languages.title[language]}</h1>
      <ul>{data.site.siteMetadata.authorCv.languages.list.map((languageObj, i) =>
        <li key={i}>{languageObj.name[language]} ({languageObj.score[language]})</li>
      )}</ul>
    </AchivementBlock>
    <AchivementBlock>
      <h1>{data.site.siteMetadata.authorCv.skills.title[language]}</h1>
      <ul>{data.site.siteMetadata.authorCv.skills.list.map((skillCategory, i) =>
        <AchivementBlock key={i}>
          <h1>{skillCategory.title[language]}</h1>
          <ul>{skillCategory.list.map((skill, j) =>
            <li key={j}>{skill.name[language] ? skill.name[language] : skill.name["all"]}</li>
          )}</ul>
        </AchivementBlock>
      )}</ul>
    </AchivementBlock>
  </Wrapper>
}

export default LeftCv;
