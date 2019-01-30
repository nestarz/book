import React, { useRef, useState, useEffect } from 'react';
import styled, { css } from "styled-components";
import { PageA3_Paysage } from '../../../styles/print';
import { Wrapper, Info } from '../styles';
import { randomTesseraeString } from '../../../styles/fonts';
import { StaticQuery, graphql } from "gatsby"
import * as nlp from "compromise";
import { Textfit } from 'react-textfit';
import Clock from 'components/react-live-clock/src/Component';

const LocalWrapper = styled(Wrapper)`
grid-auto-rows: 10vw 8vw;
`;

const CustomInfo = styled(Info)`
grid-column: 2 /span 2 !important;
grid-row: 2 /span 2 !important;
&:after {
    content: "${randomTesseraeString(1)}";
}
`;
const TweetsTextfit = styled(Textfit)`
background-color: white;
position: relative;
padding: 1vw;
z-index: 99999;
letter-spacing: -0.03vw;
max-height: none !important;
h1 {
    margin: 0;
    font-size: 2vw;
    margin-bottom:0.5vw;
    letter-spacing: -0.08vw;
}
&:after {
    content: "${randomTesseraeString(1)}"; /**/
    color: #3CD670;
    position: absolute;
    bottom: -1vw;
    right: -1vw;
    font-family: "Tesserae";
    font-size: 5vw;
    mix-blend-mode: screen;
}
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
span.nl-Url {
    text-decoration: line-through;
    text-decoration-color: blue;
    text-decoration-line: line-through;
    text-decoration-style: wavy;
}
span.nl-HashTag:before {
    content: '-' !important;
}
span.nl-Ceramics {
    font-size: 210%;
    color: white;
    position: relative;
    z-index:1;
    line-height: 0;
    border: 100% solid #0006ff;
}
span.nl-Ceramics:before {
    font-size: 210%;
    background-color: black;
    transform: rotate(5deg);
    color: white;
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    content: '';
    z-index:-1;
}
`;

const mindmap = {
    "fr": <>
        <h1>Carte mentale de céramiste</h1>
        Volonté de rélfexion de nouvelles typologies de création de la céramique.
        En détournant les processus dictés de l'imprimante 3D, en associant la forme et l'usage à des données numériques, en imaginant des typologies d'objets par générations paramétriques aléatoires et enfin en pensant de nouvelles intéractions dans la création avec des instruments a priori non liés à la céramique traditionnelle, du piano à la caméra et jusqu'aux interfaces cervaux machines.
    </>,
    "en": <>
        <h1>Ceramist Mind Map</h1>
        Willingness to refer new types of ceramic creation.
        By diverting the dictated processes of the 3D printer, by combining form and use with digital data, by imagining typologies of objects by random parametric generations and finally by thinking of new interactions in the creation with instruments a priori not related to traditional ceramics, from the piano to the camera and to the machine brain interfaces.
    </>
}

const ApiWorld = ({ data, lg = "fr" }) => {
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
                    return <TweetsTextfit css={`&:after{content: "${randomTesseraeString(1)}";}`} key={i} mode="multi">
                        <span dangerouslySetInnerHTML={{ __html: text.replace(/&nbsp;/g, '') }}></span>
                        <div className={"userName"}>@{v.node.user.name}</div>
                        <div className={"created_at"}>
                            <Clock format={'MMMM Do YYYY, h:mm:ss:SS a'} interval={100} ticking={true} timezone={'Europe/Paris'} date={v.node.created_at}/>
                        </div>
                    </TweetsTextfit>
                })
                : null}
            <CustomInfo>
                {mindmap[lg]}
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