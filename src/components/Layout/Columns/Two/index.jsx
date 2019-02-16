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
  }
  h1,
  h2 {
    letter-spacing: calc(-23 / 1000 * 1.2em);
    break-before: page;
    font-weight: 500;
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
    margin-bottom: 1em;
    h1 {
      color: ${props => props.theme.brand.primary};
      .desc {
        color: ${props => props.theme.colors.body_color};
      }
    }
  }
  & > *:first-child {
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
    padding-bottom: 0;
    position: relative;
  }
  & > *:nth-child(2) {
    flex: 4;
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
    h1,
    h2 {
      margin: 1em 0;
    }
    h1 {
      page-break-before: always;
      display: grid;
      grid-template-columns: minmax(2.4em, 0.1fr) 9.9fr;
      & > :first-child,
      &:before {
        font-weight: 400;
      }
      &:before {
        counter-increment: list 1;
        color: ${props => props.theme.brand.primary};
        content: counter(list, decimal-leading-zero);
      }
    }
  }
`;

export default Wrapper;
