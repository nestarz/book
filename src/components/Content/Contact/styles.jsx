import styled from "styled-components";

export const Wrapper = styled.header`
  display: flex;
  position: relative;
  flex-direction: column;
  z-index: 1000;
  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    z-index: 100;
    &:hover {
      color: ${props => props.theme.brand.primary};
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    flex-wrap: wrap;
  }
  .phone,
  .email {
    word-break: break-word;
    word-wrap: anywhere;
  }
`;

export const SocialMedia = styled.div`
  @media print {
    display: none;
  }
  display: flex;
  flex: 1 0 auto;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0;
  a {
    padding-right: 0.5rem;
    margin-right: 0.25rem;
    font-size: 100%;
    line-height: normal;
    margin-bottom: 0.1em;
  }
`;
