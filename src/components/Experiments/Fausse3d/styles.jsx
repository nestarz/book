import styled, { css, keyframes } from 'styled-components';

export const Experiment = styled.div`
left:0;
position: absolute;
bottom: 0;
right: 0;
top: 0;
overflow: hidden;
background-color: #0400ff;
border: 10vw solid black;
`;
export const expandHeight = keyframes`
0%{transform: rotateY(50deg) rotateX(50deg) scale(1);}
50%{transform: rotateY(15deg) rotateX(25deg) scale(3);}
100%{transform: rotateY(0deg) rotateX(0deg) scale(2);}
`
export const outerAnim = css`
transform: rotateY(50deg);
height:100%; width: 100%;
animation: ${expandHeight} 44s infinite;
`;
export const Face = styled.div`
background-size: cover;
position: absolute;
top:0;
left:0;
right:0;
bottom: 0;
mix-blend-mode: difference;
background-color: red;
opacity: 1;
overflow: hidden;
animation: ${expandHeight} 34s infinite;

`;
export const Face1 = styled(Face)`
${outerAnim};
mix-blend-mode: screen;
background: url(${props => props.bg}) no-repeat center center fixed;
`;
export const Face2 = styled(Face)`
mix-blend-mode: color-burn;
background: url(${props => props.bg}) no-repeat center center fixed;
`;
export const Face3 = styled(Face)`
${outerAnim};
mix-blend-mode: multiply;
background: url(${props => props.bg}) no-repeat center center fixed;
`;
export const Face4 = styled(Face)`
mix-blend-mode: color-dodge;
background: url(${props => props.bg}) no-repeat center center fixed;
`;
export const Face5 = styled(Face)`
mix-blend-mode: color-dodge;
background: url(${props => props.bg}) no-repeat center center fixed;
animation: ${expandHeight} 3s;
`;
export const Text = styled.div`
font-size: 2vw;
font-family: serif;
color: white;
position: absolute;
padding: 0 120px;
top: 50%;
left: 50%;
mix-blend-mode: exclusion;
animation: ${expandHeight} 34s infinite;
z-index: 100;
text-decoration-line: line-through;
    text-decoration-color: blue;
    text-decoration-style: wavy;
    &:before {
      content: '';
      background-color: blue;
      position: absolute;
      right: 0;
      bottom:0;
      left: 0;
      top:0;
      z-index: -1;
    }
`;
