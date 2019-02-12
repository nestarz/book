import styled from "styled-components";

export const Wrapper = styled.header`
  display: flex;
  position: relative;
  flex-direction: column;
  z-index: 1000;
  a {
    color: ${props => props.theme.colors.body_color};
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
`;

export const Name = styled.div`
  display: flex;
  flex: 1 0 auto;
  justify-content: flex-start;
  letter-spacing: calc(-23 / 1000 * 1em);
  a {
    line-height: normal;
    font-weight: 500;
    color: ${props => props.theme.brand.primary};
    .desc {
      color: ${props => props.theme.colors.body_color};
      font-weight: 400;
    }
    &:hover,
    &:focus {
      color: ${props => props.theme.colors.body_color};
      text-decoration: none;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    margin-bottom: 0.75rem;
  }
  .editable {
    *:focus, &:focus {
      outline: none;
    }
    color: ${props => props.theme.colors.body_color};
  }
`;
