import styled from 'styled-components';
import config from '../../../../config/website';

export const WIP = styled.div`
font-size: 1vw;
display: inline;
position: relative;
right: 0;
float: right;
position: relative; 
bottom: 0;
background-color: white;
color: black;
padding: 2px;
z-index: 9999;
`;

export const Nav = styled.nav`
padding: 0px;
padding-left: 30px;
background-color: ${props => props.theme.brand.primary};
font-family: monospace;
font-size: 1.5rem;
color: white;
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    font-size: 4.5vw;
  }
a{
  color: white;
  margin: 10px;
  transition: none !important;
}
a:first-child{
  color: white;
  margin-left: 0px;
}
justify-content: space-between;
@media print {
  display: none;
}
`;


export const TOC = styled.section`
&:before {
  content: "Table des matières";
  color: white;
  font-size: 20px;
  border-bottom: 1px solid white;
  display: block;
  margin: 0;
    white-space: nowrap;
    text-align: left;
    transform-origin: bottom; 
    margin-top: 180px;
    margin-left: 30px;
    transform: rotate(270deg);
    pointer-events: none;
}
&:hover:before {
  display: none;
}
background-color: ${props => props.theme.brand.primary};
margin-top: 0px;
a {
  text-decoration: none;
  color: ${props => props.theme.brand.primary};
  color: white !important;
  }
  ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  }
  li {
    margin: 0;
    margin-bottom: 2px;
  }
  li:last-child {
    margin-bottom:25px;
  }

  li a {
  text-decoration: none;
  color: ${props => props.theme.brand.primary};
  display: block;
  font-size: 120%;
  }
  li a:hover {
    text-decoration: underline;
  }
  h1 {
    column-span: all;
    font-size: 270%;
    margin-top: 20vh;
  }
  p {
    font-weight: 100;
  }
  h1,h2,h3,h4,h5,h6 {
    margin: 0;
    font-weight: 500;
  }
position: absolute;
left: 0;
padding: 30px 0;
max-height: 100vh;
font-size: 15px;
max-width: 30px;
border-right: 1px solid white;
  column-span: all;
  li a, h2 {
    color: white;
  }
  ul {
    margin-left: 10px;
    display: none;
    pointer-events: none;
  }
  &:hover ul {
    display: block;
    pointer-events: all;

  }
  ul > li {
    column-fill: auto;
    break-inside: avoid;
    &:first-child {
      margin-top: 0;
    }
  }
  h3,h4,h5,h6 {
    margin: 0;
    font-weight: 100;
  }
  h3 {
    margin: 0;
    font-weight: 500;
  }
  &:hover {
    padding: 0px 0;
    padding-bottom: 30px;
  max-width: 300px;
  overflow: scroll;
  z-index: 999;
}
h3 {
  margin: 0;
}
`
