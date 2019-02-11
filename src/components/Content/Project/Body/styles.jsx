import styled from 'styled-components';

export const Wrapper = styled.section`
max-width: 40rem;
font-size: 100%;
letter-spacing: -0.01em;

margin: auto;
@media not print {
  padding:0px 1em 1em 1em;
}
display: flex;
flex-direction: column;
page-break-before: always;

& > div div {
  page-break-inside: avoid;
}
& > div {
  counter-reset: list;
  & > h1 {
    &:not(:first-child) {
      margin-top: 2em;
    }
    display: block;
    page-break-before: always;
    &:before {
      counter-increment: list 1;
      content: counter(list, hiragana) " " counter(list, decimal-leading-zero);
      word-spacing: 1em;
      padding-right: 1em;
    }
  }
}
p {
  line-height: 1.3;
}
& > div ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  li:last-child {
  }
}
& > div > ol,
& > div > ul {
  column-fill: balance;
  column-count: 2;
  @media (max-width: 700px) {
    column-count: 1;
    column-gap: 0;
  }
  column-gap: 2em;
  orphans: 3;
  widows: 3;
  overflow: hidden;
  word-break: break-word;
  li {
    margin: 0;
    margin-bottom: 0.4em;
    column-break-inside : avoid;
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
  column-gap: 1em;
}
& > div ol {
  padding: 0;
  list-style-position: inside;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(6em, 1fr);
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
  grid-gap: 0;
  li {
    margin: 0;
  }
  @media (max-width: 700px) {
    grid-auto-rows: 1fr;
    grid-gap: 0.15em;
  }
  @media (min-width: 700px) {
    & > * {
      border-bottom: 1px solid ${props => props.theme.colors.body_color};
      padding: 1em;
    }
    & > *:last-child, & > *:nth-last-child(2):nth-child(odd) {
      border-bottom: none;
    }
    & > *:nth-child(odd) {
      border-right: 1px solid ${props => props.theme.colors.body_color};
    }
  }
}
img {
  margin: auto;
  display: table-cell;
  max-width: 100%;
}

counter-reset: compteFigcaption;
figcaption,
figcaption.gatsby-resp-image-figcaption {
  &:before {
    counter-increment: compteFigcaption 1;
    content: counter(compteFigcaption) ". ";
  }
  font-style: italic;
}

.gatsby-resp-image-wrapper {
  margin-bottom: 20px !important;
  -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
  page-break-inside: avoid; /* Firefox */
  break-inside: avoid; /* IE 10+ */
  break-inside: avoid-column; /* W3C */
  display: inline-block;
  margin: auto;
}
  & > div {
      height: inherit !important;
      width: inherit !important;
  }
}
`;
