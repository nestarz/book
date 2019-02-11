import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 1em auto;
  position: relative;
  max-width: 52rem;
  font-size: 100%;
  a {
    color: inherit !important;
    text-decoration: underline;
  }
  @media print {
    a {
      color: inherit !important;
    }
  }
  & > div:first-child {
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: ${props => props.theme.colors.body_color};
    z-index: -1;
    margin: auto;
    padding-left: 1em;
    padding-right: 1em;
  }
  & > div:last-child {
    flex: 1;
    padding-left: 1em;
    padding-right: 1em;
    top: 0;
    color: ${props => props.theme.colors.bg_color};
    mix-blend-mode: overlay;
    z-index: 1;
    margin: auto;
  }`;
