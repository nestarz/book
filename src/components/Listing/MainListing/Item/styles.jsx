import { Link } from 'gatsby';
import styled from 'react-emotion';

export const ItemInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  max-width: 23%;
  h2 {
    font-size: 17px;
    line-height: 18px;
    font-weight: 100;
    letter-spacing: calc(-23 / 1000 * 1em);
    &:hover {
      border-bottom: 1px solid ${props => props.theme.colors.body_color};
    }
  }
  
`;

export const TestWrapper = styled.div`
position: relative;
min-width: 300px;
margin: 0vh 1rem 1rem 0vw;
flex-grow: 1;
width: 33%;
header {
  margin-bottom: 7px;
  h2 {
    font-size: 18px;
    line-height: 18px;
    font-weight: 100;
    letter-spacing: calc(-23 / 1000 * 1em);
    &:hover {
      border-bottom: 1px solid ${props => props.theme.colors.body_color};
    }
    display: inline;
  }
  p {
    margin: 0;
  }
}
`;

export const DeepImg = styled.img`
  display: none;
  &.hover {
    display: block;
    mix-blend-mode: overlay;
  }
`;

export const ItemWrapper = styled.div`
  position: relative;
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;

  a {
    opacity: 0;
    z-index: 10;
    transition: all 0s ease-in-out;
    text-decoration: none;
    border-radius: 0px;
    &:hover {
      opacity: 1;
      text-decoration: none;
    }
  }
    
  header {
    margin: 0rem 0rem;
    background-color : ${props => props.theme.colors.bg_color};
    color: ${props => props.theme.colors.body_color};
    pointer-events: none;
    position: absolute;
    bottom: 0;
    display: block;
    h2 {
      font-size: 24px;
      line-height: 50px;
      margin-bottom: 0rem;
      font-weight: 500;
      letter-spacing: calc(-23 / 1000 * 1em);
    }
    p {
      font-size: 12px;
      letter-spacing: calc(-6 / 1000 * 1em);
      font-weight: 400;
      margin-bottom: 0rem;
    }
  }
`;

export const ImageWrapper = styled.div`
  > header {
    left: 22px;
    margin: 10px;
    padding: 2px 10px;
    h2 {
      font-size: 10px;
      margin: 0;
      padding: 0;
      line-height: 12px;
      font-size: 18px;
    }
  }
  > div {
    min-height: 40vh;
    //transform: rotate(${Math.random()*10}deg);
    z-index: -1;
    > div {
      position: static !important;
    }
  }
`;

export const OverlayLink = styled(Link)`
  //background-color: ${props => props.theme.colors.bg_color};
  //box-shadow: inset 0 0 300px ${props => props.theme.colors.body_color};
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
  filter: blur(0px);
  color: ${props => props.theme.colors.body_color};
  section {
    position: absolute;
    bottom: 0;
    z-index: -1;
    right: 0;
    left: 0;
    p {
      background-color: ${props => props.theme.colors.bg_color};
    }
  }
`

export const Holder3D = styled.div`
position: absolute;
z-index: 999;
top: 0;
bottom: 0;
right: 0;
left: 0;
`;