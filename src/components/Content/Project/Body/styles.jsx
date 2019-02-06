import styled from 'styled-components';

export const Wrapper = styled.section`
max-width: 40rem;
font-size: 120%;
letter-spacing: -0.01em;

margin: auto;
@media not print {
  padding: 0px 30px 60px 30px ;
}
display: flex;
flex-direction: column;
page-break-before: always;

& > div > ol,
& > div > ul {
  column-fill: balance;
  column-count: 2;
  column-gap: 10pt;
  orphans: 3;
  widows: 3;
}
img {
  margin: auto;
  display: table-cell;
  max-width: 100%;
}

.gatsby-resp-image-wrapper {
  margin-bottom: 20px !important;
  -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
  page-break-inside: avoid; /* Firefox */
  break-inside: avoid; /* IE 10+ */
  break-inside: avoid-column; /* W3C */
  display: inline-block;
}

.fullWidth {
  @media not print {
    width: 100vw;
    height: 100vh;
    margin: auto;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }
  @media print {
    max-width: 100% !important;
    width: 100vw !important;
    height: 100vw !important;
    padding: 0 !important;
    margin: 0 !important;
    position: initial !important;
  }
  & > div {
      height: inherit !important;
      width: inherit !important;
  }
}

& > div div {
  page-break-inside: avoid;
}
& > div > h1 {
  display: block;
  page-break-before: always;
}

& > div ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  li {
    margin: 0;
    margin-bottom: 0.0em;
    column-break-inside : avoid;
    a {
      text-decoration: none;
      display: block;
      font-size: 120%;
      }
    a:hover {
      text-decoration: underline;
    }
    & > a + img {
      margin-top: 1.5em;
      margin-bottom: 1.5em;
    }
  }
  li:last-child {
  }
}
`;
