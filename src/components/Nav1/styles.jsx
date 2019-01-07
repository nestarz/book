import styled from 'styled-components';
import config from '../../../config/website';


export const Wrapper = styled.header`
  align-items: baseline;
  color: ${props => props.theme.brand.primary};
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 300%;
  /*transform: skew(20deg) scale(0.8, 1);*/
  justify-content: space-around; /* ADJUSTMENT */
  @media (min-width: ${props => props.theme.breakpoints.m}) {
    justify-content: space-between; /* ADJUSTMENT */
    flex-wrap: nowrap;
  }
  padding: 0rem;
  flex: 0;
  letter-spacing: calc(-6 / 1000 * 1em);
  a {
    color: ${props => props.theme.colors.body_color};
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: ${props => props.theme.brand.primary};
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding: 1rem 0 3rem 0;
    flex-wrap: wrap;
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    font-size: 20px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  color: ${props => props.theme.brand.primary};
  a:not(:first-child) {
    margin-left: 1rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding: 0 1rem;
  }
`;

export const Name = styled.div`
flex-basis: auto; /* default value */
color: ${props => props.theme.brand.primary};
  padding: 0 0;
  display: flex;
  flex-direction: column;
  align-items:flex-start ;
  flex-wrap: wrap;
  line-height: 60px;
  a {
    color: ${props => props.theme.brand.primary};
    &:hover,
    &:focus {
      text-decoration: none;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    flex: 1 0 100%;
    line-height: initial;
  }
`;

export const SocialMedia = styled.div`
@media print {
  display: none;
}
margin-top:-15px;
  a {
    font-size: 1.5rem;
    line-height: 20px;
  }
  a:not(:first-child) {
    margin-left: 1rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    a {
    font-size: 20px;
    line-height: 20px;
  }
    padding: 2rem 0rem;
  }
`;

export const RightGroup = styled.div`
display: flex;
align-items: center;
justify-content: center;
// margin-top: 20px;
`