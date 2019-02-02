import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
  /*background-color:${props => props.theme.brand.primary};*/
  padding-left: 0px;
  h1,h2,h3,h4,h5,h6 {
    margin: 0;
  }
  @media print {
    display: none;
  }
`;

export const Content = styled.section`
  flex-grow: 1;
  padding: 30px 30px;
  ul, ol {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    h3 {
      font-size: 115%;
      text-align: center;
    }
    li a {
      color: black;
    }
    & > li {
      break-inside: avoid;
      &:first-child {
        margin-top: 0;
      }
    }
  }
  ul {
    list-style-type: none;
    flex-direction: column;
  }
  ol > li {
    padding: 0.5vw 0.5vw;
    min-width: 10vw;
  }
  ol {
    padding: 0 20px;
  }
`
