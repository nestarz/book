import { darken } from "polished";
import styled from "styled-components";

const Wrapper = styled.div`
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
    h1 {
      @media (min-width: 700px) {
        font-size: 100%;
      }
      color: ${props => props.theme.brand.primary};
      .desc {
        color: ${props => props.theme.colors.body_color};
        font-weight: 500;
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
    margin-bottom: 0px;
    /*background-color: ${props => darken(0.02, props.theme.colors.bg_color)};*/
    flex: 1;
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
  & > *:last-child {
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
    flex: 50%;
    max-height: 100vh;
    overflow-y: scroll;
    .body {
      flex: 1;
      max-width: 40rem;
      font-size: 100%;
      letter-spacing: -0.01em;
      margin: auto;
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
