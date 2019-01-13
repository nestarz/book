import styled from 'styled-components';

export const CVPrint = styled.div`
width: 100%;
display: flex;
justify-content: space-around;
border-bottom: 1px solid black;
padding: 30px;
font-size: 2vw;
@media print
{   
  display: none;
}
button,a {
	background: none;
	color: inherit;
	border: none;
    padding: 0;
    text-decoration: underline;
    font: inherit;
	cursor: pointer;
	outline: inherit;
}
`;
export const Holder3D = styled.div`
position: absolute;
top:0;
left:0;
right:0;
bottom:0;
pointer-events: none;
mix-blend-mode: multiply;
`;

export const IndexWrapper = styled.div`
position: relative;
background-color: white;
color: ${props => props.theme.colors.black};
display: flex;
h1, h2, h3 {
  position: relative;
  font-size: 100%;
}
@media print
{  
  justify-content: space-between;
}
& > div {
  margin-right: 1%;
  @media print
  {  
    margin-right: 5mm;
  }
}
& > div:last-child {
  margin-right: 0;
}
p {
  font-size: 100%;
}
.bio {
  margin-top: 0;
  font-size: 100%;
}
.left {
  position: relative;
  display: flex;
  flex-direction: column;
  & > header {
    @media print
    {  
      line-height: 0;
      margin: 0;
      padding: 0;
      padding-bottom: 10pt;
    }
    margin: 0;
    display: block;
  }
  a {
    text-decoration:none;
  }
  .email {
    color: initial;
  }
  ul {
    font-size: 100%;
    list-style-type: none;
    margin: 1em 0;
    padding: 0;
    li {
        margin: 0;
        padding: 0;
    }
}
max-width: 25%;

  @media print
  {  
    max-width: 25%;
  }
}
`;

export const WorkExperience = styled.div`
position: relative;
margin: 0 auto;
  max-width: ${props => props.theme.container[props.type]};
width: 100%;
display: flex;
.date {
  flex: 0;
  min-width: 20%;
}
& > div {
  flex-grow: 1;
}
font-size: 100%;

h1 {
  letter-spacing: calc(-23 / 1000 * 1em);
  position: relative;
}
.description {
  @media print
  {  
    line-height: 12pt;
    letter-spacing: calc(-23 / 1000 * 1em);
    font-size: 95%;
  }
}

`

export const Wrapper = styled.div`
${props => props.addCSS}
&>div:last-child {
  padding: 30px;
  @media print
  {  
    padding: 0px;
  }
}
`;
