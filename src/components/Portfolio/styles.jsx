import styled from "styled-components";

export const Info = styled.div`
background-color: white;
padding: 1vw;
border: 1px solid black;
font-size: 1vw;
z-index: 99999;
letter-spacing: -0.03vw;
max-height: none !important;
h1 {
    margin: 0;
    font-size: 2vw;
    margin-bottom:0.5vw;
    letter-spacing: -0.08vw;
}`;

export const Wrapper = styled.div`
position: relative;
counter-increment: mon-compteur;
background-color: white;
overflow: hidden;
display: grid;
grid-gap: 1vw;
grid-template-columns: repeat(5, 1fr);
grid-auto-rows: minmax(10vw, auto) minmax(14vw, auto);
counter-reset:div;
grid-auto-flow: dense;
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
& > div, & > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    max-height: 100%;
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
    margin:5vw auto;
    margin-bottom:0;
    width: 90vw;
    height: calc(90vw / 1.4141);
    box-shadow: 0px 0px 0.8vw black;
}
@media print {
    width: 420mm !important;
    height: 296.8mm !important;
    overflow: hidden !important;
}
`;
