import VisitCard from 'components/Content/VisitCard';
import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import React from 'react';
import Webcam from "react-webcam";
import styled from "styled-components";
import { convertToTesserae } from 'styles/fonts';
import { PageA3_Paysage } from 'styles/print';
import PortfolioWrapper from '../';

const StyledVisitCard = styled(VisitCard)`
grid-column: auto /span 4 !important;
.verso, .recto {
    mix-blend-mode: normal;
    overflow: hidden;
    width: 100%;
    height: 100%;
    padding: 3.89% 3.89%;
    font-size: 1.5em;
}
.verso {
    display: none;
}
.name {
    font-size: 1.5em;
    width: 70%;
}
.cv_contact {
    font-size: 1em;
    a {
        margin-right: 1em;
    }
}
`;

const VideoHolder = styled.div`
position: relative;
object-fit: cover;
width: 100%;
height: 100%;
overflow: hidden;
filter: saturate(1.6);
grid-column: 5;
grid-row: auto /span 2;
video {
    /*transform: rotate(90deg);*/
    object-fit: cover;
    width: 100%;
    height: 100%;
    overflow: hidden;
    filter: grayscale(1) contrast(3);
}
`;

const LocalWrapper = styled(PortfolioWrapper)`
&:after,
&:before {
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0em;
    top: 0;
    right: 0em;
    word-break: break-word;
    content: '';
    mix-blend-mode: saturate;
    font-size: 3vw;
    text-align:center;
    line-height: 1vw;
    z-index: 0;
    pointer-events: none;
}
&:after {
    /*mix-blend-mode: color;/*lighten;*/
    z-index: 2;
    mix-blend-mode: soft-light;
    content: '${props => props.content}';
    line-height: 2.25vw;
    word-break: break-word;
    font-family: "Tesserae";
    padding: 0;
    margin: 0;
    line-height: 0.5;
    background-color: #3CD670;
    word-break: break-word;
    font-family: "Tesserae";
    color: white;
    letter-spacing: 0.3em;
    padding: 0;
    margin: 0;
}
`;


const Index = () => {
  const [language, toggleLanguage] = useToggleGlobalLanguage()
    const randomChars = () => Array.from({length: 40}, () => Math.random()).join(' ');
    const xGlyphs = convertToTesserae(randomChars(), "0123456789.");
    const yGlyphs = convertToTesserae(randomChars(), "0123456789.");
    return (
        <LocalWrapper content={`${xGlyphs} ${yGlyphs}`}>
            <PageA3_Paysage />
            <StyledVisitCard mode={Math.floor(Math.random() * 4)} />
            <VideoHolder>
                <Webcam width={"100%"} />
            </VideoHolder>
        </LocalWrapper>
    )
};

export default Index;

Index.propTypes = {};
