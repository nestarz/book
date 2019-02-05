import styled from "styled-components";
import { randomTesseraeString } from 'styles/fonts';

export const Info = styled.div`
background-color: white;
position: relative;
padding: 1vw;
border: 1px solid black;
font-size: 1em;
z-index: 99999;
letter-spacing: -0.03vw;
max-height: none !important;
h1 {
    margin: 0;
    font-size: 190%;
    margin-bottom:0.5vmin;
}
&:after {
    content: "${randomTesseraeString(1)}"; /**/
    color: #3CD670;
    position: absolute;
    bottom: -1vw;
    right: -1vw;
    font-family: "Tesserae";
    font-size: 2em;
    mix-blend-mode: screen;
}`;

export const Wrapper = styled.div`
max-width: 80vw;
margin: auto;
/*https://medium.com/@marveloo/by-replacing-grid-width-inline-grid-and-adding-height-100-to-its-child-elements-now-its-possible-c801fec4abe6*/
/*https://codepen.io/cssence/pen/BJMwwN*/
.svg::before {
	content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3C/svg%3E");
  display: block;
  line-height: 0; /* needed for certain browsers */
}
.padding::before {
  content: "";
  display: block;
  padding-top: calc(280 / 420 * 100%);
}
.position {
  position: relative;
}
.position .content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.grid {
  display: grid;
}
.grid::before,
.grid .content {
  grid-area: 1 / 1 / 2 / 2;
}

`;

export const Content = styled.div`
position: relative;
counter-increment: mon-compteur;
background-color: white;
overflow: hidden;
display: grid;
grid-gap: 1em;
grid-template-columns: repeat(5, 1fr);
grid-auto-flow: dense;
counter-reset:div;
padding:2vw;
p {
    line-height: inherit;
    font-size: inherit;
    letter-spacing: inherit;
}
& > *:nth-child(6n + 4),
& > *:nth-child(6n + 1) {
    grid-column: auto /span 2;
    grid-row: auto /span 2;
}
ol {
    margin: 1vw;
    padding: 0vw;
}
img {
    max-height: 22.5vw;
    margin-top: 0;
    margin-right: 3vw;
    &.dessin {
        max-height: none;
        transform: scale(1.4);
        position: absolute;
        z-index: -1;
        filter: blur(1px) contrast(100);
    }
}
& > div {
  overflow: hidden;
  min-width: 0;
  max-height: 100%;
  & div, & span {
    max-height: 100%;
  }
  & > img {
    overflow: hidden;
    min-width: 0;
    width: 100%;
  }
}
&:after {
    content: "Elias Rhouzlane. Page " counter(mon-compteur);
    transform: scale(1.5, 1);
    position: absolute;
    bottom: 0;
    left: 10vw;
    font-size: 1vw;
    padding: 0 1vw;
}
@media not print {
  box-shadow: 0px 0px 20px rgba(0,0,0,0.1);
}
`;
