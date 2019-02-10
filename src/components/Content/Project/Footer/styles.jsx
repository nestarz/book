import styled from 'styled-components';

export const Wrapper = styled.div`
max-width: 40rem;
margin: auto;
  text-align: left;
  width: 100%;
  padding: 0 1em;
  margin-top: 0em;
  h1, h2, h3, h4 {
    margin: 0;
  }
  h1 {
    font-size: 100%;
    @media print {
      font-size: 100%;
      text-align: center;
      color: ${props => props.theme.brand.primary};
      transform: scale(1,4);
    }
    margin-bottom: 0.2rem;
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
    margin-bottom: 2vw;
    letter-spacing: calc(-16 / 1000 * 1em);
  }
  display: flex;
  justify-content: space-between;
  @media print {
    height: 110vh;
  }
  &>:first-child {
    width: 100%;
  }
`;



export const Frontmatter = styled.section`
  flex-grow: 1;
  @media not print {
    padding: 0;
  }
  @media print {
    padding-right: 0pt;
  }
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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
flex-direction: row;
justify-content: center;
align-items: center;
margin: 0;
&>div {
  margin: 0em;
}
&>div:first-child {
  font-size: 100%;
  margin-right: 1rem;
  position: relative;
}
&>div:last-child {
  font-size: 120%;
}
&.printOnly {
  @media not print {
    display: none;
  }
}
`;

export const ImageWrapper = styled.div`
flex-grow: 0;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
/* background-color: ${props => props.theme.brand.primary}; */
flex:100%;
align-self: center;
> div {
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
