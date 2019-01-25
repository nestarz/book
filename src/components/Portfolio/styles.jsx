import styled from "styled-components";

export const Info = styled.div`
background-color: white;
padding: 1vw;
border: 1px solid black;
max-width: 27vw;
font-size: 1vw;
h1 {
    margin: 0;
    font-size: 2vw;
}`;

export const Wrapper = styled.div`
position: relative;
counter-increment: mon-compteur;
background-color: white;
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
overflow: hidden;
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
&:after {
    content: "Elias Rhouzlane. Page " counter(mon-compteur);
    background-color: #efff00;
    transform: scale(1.5, 1);
    position: absolute;
    bottom: 0;
    left: 10vw;
    font-size: 1vw;
    padding: 0 1vw;
    mix-blend-mode: luminosity;
}
@media not print {
    margin:5vw auto;
    margin-bottom:0;
    width: 90vw;
    height: calc(90vw / 1.4141);
    box-shadow: 0px 0px 0.8vw black;
}
@media print {
    width: 100vw;
    height: 297mm;
    overflow: hidden;
}
`;
