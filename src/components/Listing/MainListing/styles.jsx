import { Link } from 'gatsby';
import styled from 'react-emotion';

export const Item = styled.div`
  position: relative;
  min-width: 300px;
  max-height: 40vh;
  margin: 0vh 2vw 3vw 2vw;
  //border-right: 5px dotted ${props => props.theme.colors.body_color};
  //border-bottom: 5px dotted ${props => props.theme.colors.body_color};
  padding: 10px;
  opacity: 1;
  &:hover {
    opacity: 1
  }
  
  flex-grow: 1;
  width: 33%;
  &:before {
    content: '';
    display: block;
    padding-top: 40vh;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  z-index:1;
  padding: 1rem 2rem;
  margin-top: 5vh;
  flex: 0 0 50%;
  & ${Item}:nth-child(1)  { flex-grow: 100;  }
  & ${Item}:nth-child(2)  { flex-grow: 2; }
  & ${Item}:nth-child(3)  { flex-grow: 1; }
  & ${Item}:nth-child(4)  { flex-grow: 1; }
  & ${Item}:nth-child(5)  { flex-grow: 3; }
`;

export const Content = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  a {
    color: #fff;
    height: 100%;
    left: 0;
    opacity: 0;
    padding-bottom: calc(2 * calc(2 * .5rem));
    padding-left: 22px;
    padding-right: 22px;
    padding-top: calc(2 * .5rem);
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
    transition: all 0.3s ease-in-out;
    text-decoration: none;
    filter: grayscale(100%);

    &:hover {
      color: #fff;
      opacity: 1;
      text-decoration: none;
      filter: grayscale(0%) !important;
    }
  }
  header {
    margin: 0rem 0rem;
    //background-color : ${props => props.theme.colors.bg_color};
    color: ${props => props.theme.colors.bg_color};
    pointer-events: none;
    display: block;
    h2 {
      font-size: 44px;
      line-height: 50px;
      margin-bottom: 1rem;
      font-weight: 500;
      letter-spacing: calc(-23 / 1000 * 1em);
    }
    p {
      font-size: 22px;
      letter-spacing: calc(-6 / 1000 * 1em);
      font-weight: 400;
    }
  }
`;

export const ImageWrapper = styled.div`
  > div {
    height: 100%;
    left: 0;
    position: absolute !important;
    top: 0;
    width: 100%;
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
`
