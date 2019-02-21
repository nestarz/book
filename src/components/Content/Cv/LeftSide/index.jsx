import Contact from "components/Content/Contact";
import NameHeader from "components/Content/Name";
import { useToggleGlobalLanguage } from "hooks/useLanguage";
import QRCode from "qrcode.react";
import React from "react";
import styled, { withTheme } from "styled-components";

const QRCodeWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  margin-left: -0.25em;
`;
const AchivementBlock = styled.div`
  width: 100%;
  & > .achivement-ul {
    width: 100%;
    @media (max-width: 700px) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: space-between;
      div.achivement-li {
        padding: 0 0.4em;
      }
      h1 {
        flex: 1%;
      }
    }
  }
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
  .email {
    font-size: 90%;
  }
  @media (max-width: 700px) {
    flex: 100%;
    flex-wrap: wrap;
    .email {
      font-size: 100%;
    }
  }
  @media (min-width: 1300px) {
    .email {
      font-size: 100%;
    }
  }
  & > div:first-child > header:last-child {
    & > * {
      margin-top: 0.25em;
    }
    margin: 1em 0;
  }
`;

const LeftCv = ({ data, withToggle = true, ...props }) => {
  const [language, toggleLanguage] = useToggleGlobalLanguage();
  const siteUrl = data.site.siteMetadata.siteConfig.siteUrl;
  return (
    <Wrapper>
      <div>
        <NameHeader style={{ fontSize: "100%" }} />
        <Contact
          withCv={false}
          withIcons={false}
          style={{ fontSize: "100%" }}
        />
      </div>
      {withToggle && (
        <button onClick={() => toggleLanguage()}>
          {language == "fr" ? "Version Française" : "English Version"}
        </button>
      )}
      <AchivementBlock>
        <h1>{data.site.siteMetadata.authorCv.languages.title[language]}</h1>
        <div className={"achivement-ul"}>
          {data.site.siteMetadata.authorCv.languages.list.map(
            (languageObj, i) => (
              <div className={"achivement-li"} key={i}>
                {languageObj.name[language]} ({languageObj.score[language]})
              </div>
            )
          )}
        </div>
      </AchivementBlock>
      <AchivementBlock>
        <h1>{data.site.siteMetadata.authorCv.skills.title[language]}</h1>
        <div className={"achivement-ul"}>
          {data.site.siteMetadata.authorCv.skills.list.map(
            (skillCategory, i) => (
              <AchivementBlock key={i}>
                <h1>{skillCategory.title[language]}</h1>
                <div className={"achivement-ul"}>
                  {skillCategory.list.map((skill, j) => (
                    <div className={"achivement-li"} key={j}>
                      {skill.name[language]
                        ? skill.name[language]
                        : skill.name["all"]}
                    </div>
                  ))}
                </div>
              </AchivementBlock>
            )
          )}
        </div>
      </AchivementBlock>
      <QRCodeWrapper>
        <QRCode
          value={siteUrl}
          size={59}
          bgColor={props.theme.colors.bg_color}
          fgColor={props.theme.colors.body_color}
          level={"H"}
          includeMargin={true}
          renderAs={"svg"}
        />
      </QRCodeWrapper>
    </Wrapper>
  );
};

export default withTheme(LeftCv);
