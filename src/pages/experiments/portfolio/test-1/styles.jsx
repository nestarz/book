import styled, { createGlobalStyle } from "styled-components";
import { LocalFonts } from 'styles/fonts';

export const PaginationWrapper = styled.div`
ul { list-style-type: none; }
display: flex;
width: 100%;
max-width: 1400px;
margin: 0 auto;
flex: 1;
align-items: center;
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
font-size: 1vw;
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
