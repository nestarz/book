import styled from 'styled-components';

export const Wrapper = styled.div`
width: 85mm;
height: 55mm;
background-color: #fff;
color: #111;
a:not(.name a) {
  color: black !important;
}
.desc {
  color: black !important;
}
word-wrap: break-word;
padding: 5mm;
display: flex;
flex-direction: column;
justify-content: space-between;
position: relative;
font-size: 10pt;
&.verso {
    transform: rotate(180deg);
}
`;
