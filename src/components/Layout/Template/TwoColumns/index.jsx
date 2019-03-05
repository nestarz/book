import { darken } from "polished";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  counter-reset: list;
  h1,
  h2,
  h3,
  h4 {
    font-size: 100%;
    margin: 0;
    padding: 0;
    flex: 0;
    font-weight: normal;
  }
  h1,
  h2 {
    letter-spacing: calc(-23 / 1000 * 1.2em);
    break-before: page;
  }
  h1 {
    page-break-before: always;
    /* display: grid;
    grid-template-columns: minmax(2em, 0.1fr) 9.9fr; */
    &:before {
      /* counter-increment: list 1;
      color: ${props => props.theme.brand.primary};
      content: counter(list, decimal-leading-zero);
      font-family: "Libre Baskerville";
      font-size: 90%;
      display: flex;
      justify-content: flex-start;
      align-items: center; */
    }
    &:hover {
      transition: transform;
      &:before {
        transform: none;
        text-decoration: underline;
        text-decoration-style: dotted;
      }
    }
  }
  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    text-align: inherit;
  }
  button,
  a {
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    z-index: 100;
    &:hover {
      color: ${props => props.theme.brand.primary} !important;
    }
  }
  h1 {
    a {
      color: ${props => props.theme.colors.body_color} !important;
    }
  }
  header {
    margin-bottom: 1em;
    h1 {
      color: ${props => props.theme.brand.primary};
      .desc {
        color: ${props => props.theme.colors.body_color};
      }
    }
  }
  & > *:first-child {
    @media (max-width: 700px) {
      font-size: 70%;
    }
    min-width: 20vw;
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
    position: relative;
    h1 {
      @media (max-width: 700px) {
        grid-template-columns: minmax(0, 0.1fr) 9.9fr;
        &:before {
          content: " ";
        }
      }
    }
    &,
    .nav {
      > *:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
      }
    }
  }
  & > *:nth-child(2) {
    flex: 10;
    max-height: 100vh;
    overflow-x: scroll;
  }
  .body {
    > *:first-child {
      margin-top: 1em !important;
    }
    > *:last-child {
      margin-bottom: 1em !important;
    }
    flex: 1;
    max-width: 40rem;
    font-size: 100%;
    letter-spacing: -0.01em;
    margin: auto;
    padding-left: 1em;
    padding-right: 1em;
    page-break-before: always;
    & > div ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      li:last-child {
      }
    }
    & > div > ol,
    & > div > ul {
      display: grid;
      grid-template-columns: 1fr 1fr;
      @media (max-width: 700px) {
        grid-template-columns: 1fr;
      }
      overflow: hidden;
      word-break: break-word;
      li {
        margin: 0;
        margin-bottom: 0.4em;
        column-break-inside: avoid;
        & > p {
          margin: 0;
        }
        a {
          text-decoration: none;
          display: block;
          font-size: 100%;
        }
        a:hover {
          text-decoration: underline;
        }
        & > a + img {
          margin-top: 1.5em;
          margin-bottom: 1.5em;
        }
      }
    }
    & > div ul {
      grid-gap: 1em;
    }
    h1,
    h2 {
      margin: 1em 0;
    }
  }
`;

export default Wrapper;
