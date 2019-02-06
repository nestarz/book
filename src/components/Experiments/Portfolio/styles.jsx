import styled from "styled-components";
import { randomTesseraeString } from 'styles/fonts';

export const Info = styled.div`
background-color: white;
position: relative;
padding: 1em;
font-size: 1em;
z-index: 99999;
letter-spacing: -0.03vw;
max-height: none !important;
overflow: visible !important;
h1 {
    margin: 0;
    font-size: 190%;
    margin-bottom:0.5vmin;
}
&:after {
    content: "${randomTesseraeString(1)}"; /**/
    color: #3CD670;
    position: absolute;
    bottom: -0.5em;
    right: -0.5em;
    font-family: "Tesserae";
    font-size: 8em;
    mix-blend-mode: screen;
}`;

export const Wrapper = styled.div`
margin: auto;
/*https://medium.com/@marveloo/by-replacing-grid-width-inline-grid-and-adding-height-100-to-its-child-elements-now-its-possible-c801fec4abe6*/
/*https://codepen.io/cssence/pen/BJMwwN*/
.svg::before {
	content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 420 280'%3E%3C/svg%3E");
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
  display: inline-grid;
}
.grid::before,
.grid .content {
  grid-area: 1 / 1 / 2 / 2;
  height: 100%;
}

.viewport,
.viewport .content
{
  --width: 70vw;
  width: var(--width);
  height: calc(var(--width) / 1.4141);
  margin-left: auto;
  margin-right: auto;
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
padding:2em;
min-height: 0;  /* NEW */
min-width: 0;   /* NEW; needed for Firefox */
p {
    line-height: inherit;
    font-size: inherit;
    letter-spacing: inherit;
}
& > * {
  overflow: hidden;  /* NEW */
  min-width: 0;      /* NEW; needed for Firefox */
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
    margin-top: 0;
    &.dessin {
        max-height: none;
        transform: scale(1.4);
        position: absolute;
        z-index: -1;
        filter: blur(1px) contrast(100);
    }
}
& > div {
  min-width: 0;
  max-height: 100%;
  overflow: hidden;
  & div {
    max-height: 100%;
  }
  & > img {
    overflow: hidden;
    min-width: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
&:after {
    content: "" counter(mon-compteur);
    position: absolute;
    bottom: 0em;
    right: 0em;
    font-size: 5em;
    padding: 0 1em;
    font-weight: 100;
}
&:before {
    content: "Elias Rhouzlane.";
    position: absolute;
    bottom: 0em;
    left: 1em;
    font-size: 1em;
    padding: 0 1em;
    font-weight: 100;
}
@media not print {
  box-shadow: 0px 0px 20px rgba(0,0,0,0.1);
}
`;
