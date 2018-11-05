import { Link } from 'gatsby';
import styled from 'react-emotion';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  z-index:1;
  padding: 1rem 0rem 1rem 1rem;
  margin: 0 7vw;
  flex: 0 0 50%;
  & > div, & > section:nth-child(1)  { flex-grow: 100;  }
  & > div, & > section:nth-child(2)  { flex-grow: 2; }
  & > div, & > section:nth-child(3)  { flex-grow: 1; }
  & > div, & > section:nth-child(4)  { flex-grow: 1; }
  & > div, & > section:nth-child(5)  { flex-grow: 3; }
`;
