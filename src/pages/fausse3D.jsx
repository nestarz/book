import React from 'react';
import styled, { keyframes, css } from 'react-emotion';
import face1 from "./fausse3Dimgs/3Dfaces_1.png";
import face2 from "./fausse3Dimgs/3Dfaces_2.png";
import face3 from "./fausse3Dimgs/3Dfaces_0_1.png";

const Experiment = styled.div`
left:0;
position: absolute;
bottom: 0;
right: 0;
top: 0;
overflow: hidden;
`;

const expandHeight = keyframes`
0%{transform: rotateY(50deg) rotateX(50deg) scale(1);}
50%{transform: rotateY(15deg) rotateX(25deg) scale(3);}
100%{transform: rotateY(0deg) rotateX(0deg) scale(2);}
`

const outerAnim = css`
transform: rotateY(50deg);
height:100%; width: 100%;
animation: ${expandHeight} 44s infinite;
`;

const Face = styled.div`
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

const Face1 = styled(Face)`
${outerAnim};
mix-blend-mode: screen; 
background: url(${face1}) no-repeat center center fixed; 
`;
const Face2 = styled(Face)`
mix-blend-mode: color-burn; 
background: url(${face1}) no-repeat center center fixed; 
`;
const Face3 = styled(Face)`
${outerAnim};
mix-blend-mode: multiply; 
background: url(${face2}) no-repeat center center fixed; 
`;
const Face4 = styled(Face)`
mix-blend-mode: color-dodge; 
background: url(${face1}) no-repeat center center fixed; 
`;
const Face5 = styled(Face)`
mix-blend-mode: color-dodge; 
background: url(${face1}) no-repeat center center fixed; 
animation: ${expandHeight} 3s;
`;
const Text = styled.div`
font-size: 40px; 
font-family: resistanceregular; 
color: white; transform: 
scale(1, 4);
position: absolute;
padding: 0 120px;
top: 50%;
left: 50%;
mix-blend-mode: exclusion;
`;
const Index = () => {
  return (
    <Experiment>
      <Face1/>
      <Face2/>
      <Face3/>
      <Face4/>
      <Face5/>
      <Text>Fausse3D</Text>
    </Experiment>
  )
};

export default Index;