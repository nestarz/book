import styled from "styled-components";

export const Wrapper = styled.header`
  flex: 1;
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
  .videoWrapper {
    height: 40vh;
    width: 40vh;
    position: relative;
    border-radius: 50%;
    position: relative;
    margin-top: 0.5em;
    align-self: flex-start;
    justify-content: flex-end;
    border-radius: 50%;
    video {
      max-width: 100%;
      border-radius: 50%;
      filter: grayscale(1);
    }
    &:before {
      background-image: url(${props => props.theme.noisy_uri});
      border-radius: 50%;
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      mix-blend-mode: overlay;
      z-index: 2;
    }
    &:after {
      border-radius: 50%;
      background: radial-gradient(
        transparent -3%,
        ${props => props.theme.colors.bg_color} 50%
      );
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      content: "";
      z-index: 3;
      transform: scale(1.05);
    }
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
    pointer-events: none;
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
    *:focus,
    &:focus {
      outline: none;
    }
    caret-color: transparent;
    color: ${props => props.theme.colors.body_color};
    margin-left: 0.1em;
  }
  .bot {
    font-size: 60%;
    color: ${props => props.theme.colors.body_color};
  }
  .cursor {
    color: ${props => props.theme.brand.primary};
  }
`;
