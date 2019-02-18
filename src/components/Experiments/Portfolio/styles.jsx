import styled from "styled-components";

export const Info = styled.div`
  background-color: white;
  position: relative;
  font-size: 1em;
  z-index: 99999;
  letter-spacing: -0.05em;
  max-height: none !important;
  overflow: visible !important;
  h1 {
    margin: 0;
    margin-bottom: 0.5vmin;
  }
`;

export const Wrapper = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  & > div:first-child {
    width: 100%;
    text-align: center;
    margin-top: -1em;
    cursor: pointer;
    margin-bottom: 0.5em;
    text-decoration: underline;
    @media print {
      display: none;
    }
  }
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
  }
  h1 {
    display: grid;
    grid-template-columns: minmax(2.4em, 0.1fr) 9.9fr;
    &:before {
      counter-increment: list 1;
      color: ${props => props.theme.brand.primary};
      content: counter(list, decimal-leading-zero);
    }
  }
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
  .viewport .content {
    @media not print {
      --width: 73vw;
    }
    @media print {
      --width: 41.95cm;
    }
    width: var(--width);
    height: calc(var(--width) / 1.4141);
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Content = styled.div`
  color: black;
  position: relative;
  counter-increment: mon-compteur;
  background-color: white;
  overflow: hidden;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-flow: dense;
  counter-reset: div;
  padding: 1.5em;
  min-height: 0; /* NEW */
  min-width: 0; /* NEW; needed for Firefox */
  p {
    line-height: inherit;
    font-size: inherit;
    letter-spacing: inherit;
  }
  & > * {
    overflow: hidden; /* NEW */
    min-width: 0; /* NEW; needed for Firefox */
  }
  & > *:nth-child(6n + 4),
  & > *:nth-child(6n + 1) {
    grid-column: auto / span 2;
    grid-row: auto / span 2;
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
  @media not print {
    border: 1px solid ${props => props.theme.brand.primary};
  }
`;
