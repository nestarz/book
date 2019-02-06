import styled from 'styled-components'

export const Wrapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.5vmax;
  font-size: 1.8rem;
  @media (min-width: 1600px) {
    font-size: 2vw;
  }
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
  & > * {
    margin: 0 1rem;
    margin-top: 0.25rem;
  }
`;
