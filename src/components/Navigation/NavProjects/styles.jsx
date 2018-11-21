import styled from 'react-emotion';
import config from '../../../../config/website';

export const Nav = styled.nav`
padding: 0px;
padding-left: 30px;
background-color: ${props => props.theme.brand.primary};
font-family: monospace;
font-size: 2em;
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    font-size: 4.5vw;
  }
a{
  color: white;
  margin: 10px;
}
a:first-child{
  color: white;
  margin-left: 0px;
}
`;
