import VisitCard from 'components/Content/VisitCard';
import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import React from 'react';
import Webcam from "react-webcam";
import styled from "styled-components";
import { convertToTesserae } from 'styles/fonts';
import { PageA3_Paysage } from 'styles/print';
import PortfolioWrapper from '../';

const StyledVisitCard = styled(VisitCard)`
.verso, .recto {
    mix-blend-mode: darken;
    overflow: hidden;
    width: 100%;
    height: 100%;
    padding: 3.89% 3.89%;
}
.verso {
    display: none;
}
.name {
    font-size: 1.5vw;
}
.cv_contact {
    font-size: 1vw;
    a {
        margin-right: 1vw;
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
border: 1px solid black;
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
&:after,
&:before {
    background-color: #3CD670;
    position: absolute;
    bottom: 0;
    left: -10vw;
    top: 0;
    right: -10vw;
    word-break: break-word;
    content: '';
    mix-blend-mode: exclusion;
    font-size: 3vw;
    text-align:center;
    line-height: 1vw;
    z-index: 1;
}
&:after {
    /*mix-blend-mode: color;/*lighten;*/
    z-index: 2;
    mix-blend-mode: multiply;
    content: '${props => props.content}';
    line-height: 2.25vw;
    word-break: break-word;
    font-family: "Tesserae";
    padding: 0;
    margin: 0;
    line-height: 0.5;
    background-color: white;
    word-break: break-word;
    font-family: "Tesserae";
    color: #3CD670;
    letter-spacing: 13.1px;
    padding: 0;
    margin: 0;
}
`;

const LocalWrapper = styled(PortfolioWrapper)`
`;


const Index = () => {
  const [language, toggleLanguage] = useToggleGlobalLanguage()
    const randomChars = () => Array.from({length: 40}, () => Math.random()).join(' ');
    const xGlyphs = convertToTesserae(randomChars(), "0123456789.");
    const yGlyphs = convertToTesserae(randomChars(), "0123456789.");
    return (
        <LocalWrapper>
            <PageA3_Paysage />
            <StyledVisitCard mode={Math.floor(Math.random() * 4)} />
            <VideoHolder content={`${xGlyphs} ${yGlyphs}`}>
                <Webcam width={"100%"} />
            </VideoHolder>
        </LocalWrapper>
    )
};

export default Index;

Index.propTypes = {};