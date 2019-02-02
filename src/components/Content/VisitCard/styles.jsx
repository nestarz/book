import styled from 'styled-components';

export const Wrapper = styled.div`
width: 85mm;
height: 55mm;
background-color: #fff;
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

const NameHeader = styled.div`
mix-blend-mode: multiply;
color: ${props => props.theme.brand.primary};
max-width: 60%;
font-weight: 500;
`;

const Contact = styled.div`
font-size: 8pt;
`;

const SketchContainer = styled.div`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
mix-blend-mode: multiply;
pointer-events: none;
`;

const SocialMedia = styled.div`
  display: flex;
  flex: 1;
  width: 47%;
  margin-bottom: 1%;
  a {
      color: #111;
      margin-right: 5pt;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding: 0 0rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    order: 3;
  }
`
