import NameHeader from 'components/Layout/Header/Name';
import { SketchComponentAbsoluteBackground } from 'components/Visual/P5js';
import backgroundSketch from 'components/Visual/P5js/projects/mainScreen/sketch3';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import React from 'react';
import styled from 'styled-components';

const AchivementBlock = styled.div`
  div.achivement-ul {
    font-size: 100%;
    list-style-type: none;
    margin: 1em 0;
    padding: 0;
    div.achivement-li {
        margin: 0;
        padding: 0;
    }
}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
      <div className={"achivement-ul"}>{data.site.siteMetadata.authorCv.languages.list.map((languageObj, i) =>
        <div className={"achivement-li"} key={i}>{languageObj.name[language]} ({languageObj.score[language]})</div>
      )}</div>
    </AchivementBlock>
    <AchivementBlock>
      <h1>{data.site.siteMetadata.authorCv.skills.title[language]}</h1>
      <div className={"achivement-ul"}>{data.site.siteMetadata.authorCv.skills.list.map((skillCategory, i) =>
        <AchivementBlock key={i}>
          <h1>{skillCategory.title[language]}</h1>
          <div className={"achivement-ul"}>{skillCategory.list.map((skill, j) =>
            <div className={"achivement-li"} key={j}>{skill.name[language] ? skill.name[language] : skill.name["all"]}</div>
          )}</div>
        </AchivementBlock>
      )}</div>
    </AchivementBlock>
  </Wrapper>
}

export default LeftCv;
