import FitText from '@kennethormandy/react-fittext'
import styled from "styled-components";
import { randomTesseraeString } from 'styles/fonts';
import PortfolioWrapper from '../';

export const LocalWrapper = styled(PortfolioWrapper)`
.content {
  grid-auto-rows: 10vw 8vw;
}`;

export const TweetsTextfit = styled(FitText)`
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

export const CustomInfo = styled(TweetsTextfit)`
grid-column: 2 /span 2 !important;
grid-row: 2 /span 2 !important;
&:after {
    content: "${randomTesseraeString(1)}";
}
border: 1px solid;
`;
