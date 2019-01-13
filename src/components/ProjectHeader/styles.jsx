
import styled from 'styled-components';

export const Wrapper = styled.div``;

export const FlexHeader = styled.section`
  flex-grow: 1;
  @media not print {
    padding: 30px 30px 0 30px;
  }
  @media print {
    padding-right: 20pt;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
export const ContainerTOC = styled.section`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
  background-color:${props => props.theme.brand.primary};
  padding-left: 20px;
  h1,h2,h3,h4,h5,h6 {
    margin: 0;
  }
  @media print {
    display: none;
  }
`;
export const Holder3D = styled.section`
  position: absolute;
  left: 0;
  right: 0;
  top: 22.5vh;
  bottom: 0;
  z-index: -1;
  height: 70vh;
  &.printOnly {
    @media not print {
      display: none;
    }
  }
`;
export const TOC = styled.section`
  flex-grow: 1;
  padding: 30px;
  max-width: 80%;
  ul {
    column-fill: balance;
    column-count: 3;
    column-gap: 3px;
    orphans: 3;
    widows: 3;
    list-style-type: none;
    margin: 0;
    padding: 0;
    margin-left: 10px;
    li a {
      color: white;
    }
    & > li {
      break-inside: avoid;
      &:first-child {
        margin-top: 0;
      }
    }
  }
`
export const HeaderWrapper = styled.section`
  text-align: left;
  position: relative;
  width: 100%;
  padding: 0;
  color: ${props => props.theme.colors.body_color};
  font-size: 1.5em;
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    font-size: 3.5vw;
  }
  h1, h2, h3, h4 {
    margin: 0;
  }
  h1 {
    font-size: 200%;
    @media print {
      font-size: 300%;
      text-align: center;
      color: ${props => props.theme.brand.primary};
      transform: scale(1,4);
    }
    margin-bottom: 0.5rem;
    font-weight: 500;
    letter-spacing: calc(-23 / 1000 * 1em);
    break-before: page;
  }
  p {
    font-size: 100%;
    @media print {
      display: none;
      text-align: center;
    }
    margin: 0;
    letter-spacing: calc(-16 / 1000 * 1em);
  }
  display: flex;
  justify-content: space-between;
  @media print {
    height: 110vh;
  }
`;

export const InformationWrapper = styled.div`
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  &>div:first-child {
    font-size: 80%;
    margin-bottom: 0.5rem;
    position: relative;
    text-transform: uppercase;
  }
  &>div:last-child {
    font-size: 125%;
  }
  &.printOnly {
    @media not print {
      display: none;
    }
  }
`;

export const ImageWrapper = styled.div`
flex-grow: 1;
display: flex;
flex-direction: column;
/* background-color: ${props => props.theme.brand.primary}; */
min-width: 20vw;
  > div { 
    margin: 0rem auto 0 auto;
    height: 100%;
    width: 100%;
    > div {
      position: static !important;
    }
  }
  @media print {
    display: none;
  }
`;
