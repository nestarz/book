import Typed from "components/Visual/Typed.js";
import { graphql, Link, StaticQuery } from "gatsby";
import { useToggleGlobalLanguage } from "hooks/useLanguage";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { Name, Wrapper } from "./styles";
import { toKana } from "wanakana";
import { unescape } from "underscore";
import JsLingua from "jslingua";
import Cursor from "external/react-typing-animation/src/Cursor.js";

var araTrans = JsLingua.nserv("trans", "ara");
araTrans.strans("buckwalter");
const Header = ({ data, className, withDesc, ...props }) => {
  const [editableHtml, setEditableHtml] = useState("");
  const [randomLanguage, setRandomLanguage] = useState(
    Math.random() > 0.5 ? 1 : 0
  );
  const contentEditableRef = useRef();
  useEffect(() => {
    contentEditableRef.current.focus();
  }, []);
  const [language, toggleLanguage] = useToggleGlobalLanguage();
  const siteConfig = data.site.siteMetadata.siteConfig;
  const authorInfo = data.site.siteMetadata.authorInfo.title[language];
  const description = data.site.siteMetadata.authorCv.shortBio[language];
  const iam = language == "fr" ? "Je suis" : "I am";
  const botIntro =
    language == "fr"
      ? "Mon assistant personnel est là pour vous aider. Dites-lui <i>bonjour ! _ </i> "
      : "You can talk to my bot here ! ^500 Say <i>Hello _ </i>";
  const strings = [
    language == "fr" ? "Bonjour !" : "Hi !",
    `${iam} ${siteConfig.siteTitle}`,
    ...(withDesc
      ? [
          `${iam} ${siteConfig.siteTitle}` +
            `, <span class="desc">${description}</span> ^1000 ${botIntro}`
        ]
      : [
          `${iam} ${siteConfig.siteTitle}` +
            `, <span class="desc">${authorInfo}</span>`
        ])
  ];
  const convertedLanguage = [
    {
      func: text =>
        araTrans.untrans(
          text
            .replace("e", "")
            .replace("à", "")
            .replace("é", "")
            .replace("c", "")
            .replace("M", "")
            .toLowerCase()
        ),
      en: "Arabic",
      fr: "Arabe"
    },
    {
      func: text => toKana(text),
      en: "Japanese",
      fr: "Japonais"
    }
  ];
  const answer =
    language == "fr"
      ? [
          "J'analyse... ^600",
          `^500 L'assistant est encore trop jeune pour parler ${
            convertedLanguage[randomLanguage][language]
          }... ^200 essayez en français ! ^9000 <i>Solitude...</i>`
        ]
      : [
          "Processing... ^600",
          `^500 My assistant is too young to speak ${
            convertedLanguage[randomLanguage][language]
          }, ^200 please speak English! ^9000 <i>Loneliness...</i>`
        ];
  return (
    <Wrapper data-testid="navigation" className={className} {...props}>
      <Name
        className={"name"}
        onClick={() =>
          contentEditableRef.current && contentEditableRef.current.focus()
        }
      >
        <Link to="/" data-testid="home-title-link">
          <Typed
            strings={strings}
            typeSpeed={10}
            showCursor={false}
            smartBackspace={true}
          />
          <ContentEditable
            className={"editable"}
            innerRef={contentEditableRef}
            html={convertedLanguage[randomLanguage].func(editableHtml)} // innerHTML of the editable div
            disabled={false} // use true to disable editing
            onChange={evt => {
              setEditableHtml(unescape(evt.target.value).replace("&nbsp;", ""));
            }} // handle innerHTML change
            tagName="span" // Use a custom HTML tag (uses a div by default)
          />
          <Cursor className={"cursor"} />
          {editableHtml && (
            <div className={"bot"}>
              <Typed
                strings={answer}
                typeSpeed={5}
                showCursor={false}
                smartBackspace={true}
              />
            </div>
          )}
        </Link>
      </Name>
    </Wrapper>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            authorCv {
              shortBio {
                fr
                en
              }
            }
            authorInfo {
              title {
                fr
                en
              }
              github
              instagram
              twitter
              linkedin
            }
            siteConfig {
              siteTitle
            }
          }
        }
      }
    `}
    render={data => <Header data={data} {...props} />}
  />
);

Header.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        authorInfo: PropTypes.shape({
          title: PropTypes.shape({
            en: PropTypes.string.isRequired,
            fr: PropTypes.string.isRequired
          }).isRequired
        }).isRequired,
        siteConfig: PropTypes.shape({
          siteTitle: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};
