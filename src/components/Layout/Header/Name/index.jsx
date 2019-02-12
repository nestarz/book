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
import { useVideo } from "react-use";

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
      ? "J'ai créé mon avatar virtuel pour vous aider ici, posez lui vos questions! "
      : "I created an avatar to help around, ask him questions! ";
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
          "> <i>bip</i> ^1000 <i>bip</i> ^1000 ... ^500 <i>bip</i> ^1000",
          "> Where am I ? ^1000",
          "> Who am I ?... ^1000",
          `> ^500 <i>L'avatar semble ne pas parler la langue ${
            convertedLanguage[randomLanguage][language]
          }... ^200 Il semble perdu... ^200 Il faut lui laisser un peu de temps...</i> ^1200`
        ]
      : [
          "> <i>bip</i> ^1000 <i>bip</i> ^1000 ... ^500 <i>bip</i> ^1000",
          "> Where am I ? ^1000",
          "> Who am I ?... ^1000",
          `> ^500 <i>The avatar seems to not speak ${
            convertedLanguage[randomLanguage][language]
          }, ^200 He seems lost... ^200 I need to fix him...</i> ^1200`
        ];
  const videoraw = useVideo(
    <video
      width={"100%"}
      height={"100%"}
      autoPlay
      loop
    >
      <source src="/assets/videos/dennett.mp4" type="video/mp4" />
    </video>
  );
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
            typeSpeed={5}
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
                typeSpeed={30}
                showCursor={false}
                smartBackspace={true}
                loop
              />
            </div>
          )}
        </Link>
      </Name>
      {editableHtml && <div className={"videoWrapper"}>{videoraw[0]}</div>}
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
