import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  h1,
  h2,
  h3,
  h4 {
    all: unset;
    margin: 0;
  }
  h1 {
    @media (min-width: 700px) {
      font-size: 200%;
    }
    color: ${props => props.theme.brand.primary};
    .desc {
      color: ${props => props.theme.colors.body_color};
    }
    @media print {
      text-align: center;
      color: ${props => props.theme.brand.primary};
      transform: scale(1, 4);
    }
    margin-bottom: 0.5rem;
    font-weight: 500;
    letter-spacing: calc(-23 / 1000 * 1.2em);
    break-before: page;
  }
  & > *:first-child {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    overflow-y: scroll;
    justify-content: space-between;
    padding: 1em;
    padding-right: 0;
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
    flex: 50%;
    max-height: 100vh;
    overflow-y: scroll;
    .body {
      max-width: 40rem;
      font-size: 100%;
      letter-spacing: -0.01em;
      margin-right: auto;
      padding-left: 1em;
      padding-right: 1em;
      display: flex;
      flex-direction: column;
      page-break-before: always;
    }
    & > *:first-child {
      margin-top: 1em;
    }
  }
`;

export default Wrapper;
