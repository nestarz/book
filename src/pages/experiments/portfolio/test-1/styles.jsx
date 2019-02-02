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
`;

export const GlobalStyle = createGlobalStyle`
  ${LocalFonts}
`
export const Header = styled.div`
font-size: 1vw;
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
    font-size:3vw;
}
span {
  transform: scale(2,1);
}
@media (max-width: 1600px) {
    time:first-child {
        font-size: 3vw;
    }
    span {
        font-size: 3vw;
    }
}
`;
