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
@media print
{  
  justify-content: space-between;
}
& > div {
  margin-right: 50px;
  @media print
  {  
    margin-right: 5mm;
  }
}
& > div:last-child {
  margin-right: 0;
}
p {
  font-size: 22px;
  @media print
  {  
    font-size: 10pt;
  }
}
h1,h2,h3,h4 {
  font-weight: 500;
  @media print
  {  
    font-size: 10pt;
  }
}
.bio {
  font-size: 30px;
  @media print
  {  
    font-size: 10pt;
  }
}
.left {
  position: relative;
  display: flex;
  flex-direction: column;
  & > header {
    @media print
    {  
      font-size: 15pt;
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
  ul {
    font-size: 22px;
    @media print
    {  
      font-size: 10pt;
    }
    list-style-type: none;
    margin: 10px 0;
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
  flex-basis: 170px;
  flex-grow: 0;
  flex-shrink: 0;
  @media print
  {  
    flex-basis: 1.1cm;
  }
}
& > div {
  flex-grow: 1;
}
font-size: 22px;
@media print
{  
  font-size: 10pt;
}
h1 {
  font-weight: 500;
  letter-spacing: calc(-23 / 1000 * 1em);
  position: relative;
  font-size: 400%;
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
&>div:last-child {
  padding: 30px;
  @media print
  {  
    padding: 0px;
  }
}
`;
