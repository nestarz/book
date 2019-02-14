import { darken } from "polished";
import styled from "styled-components";
import griffith from "./berserk-photo-berserk-1009622.jpg";
const Wrapper = styled.div`
  &:before {
    content: '†';
    background-image: url(${griffith});
    position: fixed;
    top:0;
    right: 0;
    left: 0;
    bottom:0;
    filter: saturate(21) invert(1) contrast(21);
    opacity: 0.1;
    pointer-events: none;
  }
  &:after {
    content: '🐉';
    font-size: 1400%;
    position: absolute;
    left: 80%;
    filter: grayscale(1) contrast(5) saturate(0);
  }
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  h1,
  h2,
  h3,
  h4 {
    font-size: 100%;
    margin: 0;
    padding: 0;
    flex: 0;
  }
  button {
    all: unset;
    cursor: pointer;
  }
  button,
  a {
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    z-index: 100;
    &:hover {
      color: ${props => props.theme.brand.primary} !important;
    }
  }
  header {
    font-weight: 500;
    &:after {
    content: '🐉';
    font-size: 1400%;
    filter: grayscale(1) contrast(5) saturate(0);
      position: absolute;
  }
    h1 {
      @media (min-width: 700px) {
        font-size: 10 0%;
      }
        transform: scale(1.2,0.9);
        margin-right: 2em;
    display: block;
    transform-origin: left;
      color: ${props => props.theme.brand.primary};
      .desc {
        color: ${props => props.theme.colors.body_color};
        font-weight: 500;
        transform: scale(1.2,0.9);
        margin-right: 2em;
    display: block;
    transform-origin: left;
      }
    }
    margin-bottom: 1em;
  }
  counter-reset: list;
  h1 {
    @media print {
      text-align: center;
      color: ${props => props.theme.brand.primary};
      transform: scale(1, 4);
    }
    letter-spacing: calc(-23 / 1000 * 1.2em);
    break-before: page;
    display: block;
  }
  & > *:first-child {
    min-width: 20vw;
    margin-bottom: 0px;
    /*background-color: ${props => darken(0.02, props.theme.colors.bg_color)};*/
    flex: 1;
    @media (max-width: 700px) {
      flex: 1.5;
    }
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    margin-right: 1em;
    overflow-y: scroll;
    justify-content: space-between;
    padding: 1em;
    padding-bottom: 0;
    position: relative;
    &:hover:after {
      content: "";
      writing-mode: vertical-rl;
      margin-bottom: 1em;
      font-size: 38vmin;
      text-orientation: mixed;
      line-height: 30vmin;
      position: absolute;
      top: -0.1em;
      bottom: 0;
      right: 0;
      left: 0;
    }
  }
  & > *:nth-child(2) {
    h1, h2 {
      font-weight: 500;
        transform: scale(1.2,0.9);
        margin-right: 2em;
    display: block;
    transform-origin: left;
    }
    h1 {
      page-break-before: always;
      display: grid;
      grid-template-columns: minmax(2.4em, 0.1fr) 9.9fr;
      font-weight: 500;
      & > :first-child {
        font-weight: 400;
      }
      &:before {
        font-weight: 400;
        counter-increment: list 1;
        content: counter(list, decimal-leading-zero);
      }
      a {
        font-weight: 500 !important;
      }
    }
    flex: 4;
        max-height: 100vh;
    overflow-x: scroll;
    .body {
      flex: 1;
      max-width: 40rem;
      font-size: 100%;
      letter-spacing: -0.01em;
      margin: auto;
      margin-left: 0;
      padding-left: 1em;
      padding-right: 1em;
      page-break-before: always;
    }
    & > *:first-child {
      margin-top: 1em;
    }
    & > *:last-child {
      margin-bottom: 1em;
    }
  }
`;

export default Wrapper;
