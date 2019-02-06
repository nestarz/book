import styled, { createGlobalStyle } from "styled-components";
import { LocalFonts } from 'styles/fonts';

export const PaginationWrapper = styled.div`
font-size: 0.8vw;
display: flex;
width: 100%;
margin: 0 auto;
flex: 1;
align-items: center;
ul {
  list-style-type: none;
  margin: 0;
  padding:0;
}
@media print {
  width: 42cm;
  height: 24cm;
  ul.page-numbers {
    display: none;
  }
  li {
    page-break-after: always;
  }
}
@media not print {
  ul.pagination-content > li {
    margin-bottom: 3em;
  }
  ul.page-numbers {
    color: #aaa;
    padding: 20px;
    font-size: 16px;
    li {
      cursor: pointer;
      padding: 1vw;
      &.active {
        font-weight: 600;
        color: black;
      }
    }
  }
}
`;

export const GlobalStyle = createGlobalStyle`
  ${LocalFonts}
`
export const Header = styled.div`
font-size: 0.5em;
align-self: center;
margin: 0;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
@media print {
    display: none;
}
time:first-child {
    font-family: Tesserae;
    font-size:2em;
}
span {
  transform: scale(2,1);
}
@media (max-width: 1600px) {
    time:first-child {
        font-size: 1.5em;
    }
    span {
        font-size: 1em;
    }
}
`;
