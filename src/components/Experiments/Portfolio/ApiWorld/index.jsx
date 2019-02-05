import * as nlp from "compromise";
import Clock from 'external/react-live-clock/src/Component';
import { graphql, StaticQuery } from "gatsby";
import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import React, { useEffect } from 'react';
import styled from "styled-components";
import { randomTesseraeString } from 'styles/fonts';
import { PageA3_Paysage } from 'styles/print';
import PortfolioWrapper from '../';
import { Info } from '../styles';

const LocalWrapper = styled(PortfolioWrapper)`
    grid-auto-rows: auto;`;

const Tweet = styled(Info)`
    border-right: 0.1em dashed #3CD670;
    font-size: 1.2em;
    padding: 0.5em;

.userName, .created_at {
    font-size: 80%;
}
.userName {
    margin-top: 5%;
}
.created_at {
    text-align: left;
}
span.nl-Noun.nl-Acronym.nl-Singular,
span.nl-ClauseEnd.nl-Noun.nl-Singular {
    display: none;
}
span.nl-Url, span.nl-Ceramics {
    text-decoration: line-through;
    text-decoration-color: blue;
    text-decoration-line: line-through;
    text-decoration-style: wavy;
}
`;

const CustomInfo = styled(Info)`
    grid-column: 3 /span 1 !important;
    grid-row: 2 /span 3 !important;
    mix-blend-mode: darken;
`;

const mindmap = {
  "fr": <>
    <h1>Carte mentale de céramiste</h1>
    Volonté de rélfexion de nouvelles typologies de création de la céramique.
    En détournant les processus dictés de l'imprimante 3D, en associant la forme et l'usage à des données numériques, en imaginant des typologies d'objets par générations paramétriques aléatoires et enfin en pensant de nouvelles intéractions dans la création avec des instruments a priori non liés à la céramique traditionnelle, du piano à la caméra et jusqu'aux interfaces cervaux machines.
    </>,
  "en": <>
    <h1>An Application Programming Interface world</h1>
    Developers must often build new applications that pull together multiple back-end services delivered via APIs. Here we hijack a Twitter API to use last Ceramics tweets, we process them using some Natural Language Processing to analyze them <strong>live</strong> ! For example in this unique board you only see, we can extract the unseen and tell that Ceramics is trendy in Japan.
    </>
}

const ApiWorld = ({ data }) => {
  const [language, toggleLanguage] = useToggleGlobalLanguage()
  useEffect(() => {setTimeout(() => {
    window.dispatchEvent(new Event('resize'))
  }, 200)}, [])
  return (
    <LocalWrapper>
      <PageA3_Paysage />
      {data.allTweet ? data.allTweet.edges.slice(0, 10).map(
        (v, i) => {
          var doc = nlp(v.node.full_text)
          doc.match('ceramic').tag('Ceramics')
          doc.match('ceramics').tag('Ceramics')
          //doc.replace('#Person', 'Anonyme')
          //doc.replace('design', 'shit')
          const text = doc.sentences().out('html')
          return <Tweet css={`&:after{content: "${randomTesseraeString(1)}";}`}>
            <span dangerouslySetInnerHTML={{ __html: text.replace(/&nbsp;/g, '') }}></span>
            <div className={"userName"}>@{v.node.user.name}</div>
            <div className={"created_at"}>
              <Clock format={'MMMM Do YYYY, h:mm:ss a'} interval={1000} ticking={true} timezone={'Europe/Paris'} date={v.node.created_at} />
            </div>
          </Tweet>
        })
        : null}
      <CustomInfo>
        {mindmap[language]}
      </CustomInfo>
    </LocalWrapper>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
        query {
            allTweet {
                edges {
                    node {
                        created_at
                        full_text
                        user {
                            name
                        }
                    }
                }
            }
        }
      `}
    render={data => <ApiWorld data={data} {...props} />}
  />
)
