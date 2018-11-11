import styled from 'react-emotion';

export const Wrapper = styled.div`
padding: 30px;
display: flex;
flex-direction: column;
min-height: 100vh;
width: 100%;
`;
export const Item = styled.div``;

export const MotifWrapper = styled.div`
position: fixed;
top:0;
left:0;
right:0;
bottom:0;
pointer-events: none;
z-index:-1;
//filter: contrast(2) hue-rotate(0deg)
`;