import styled from 'styled-components'


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
`

export const SocialMedia = styled.div`
  @media print {
    display: none;
  }
  display: flex;
  flex: 1 0 auto;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0;
  margin-top: 1em;
  a {
    padding-right: 0.5rem;
    margin-right: 0.25rem;
    font-size: 180%;
    line-height: normal;
    margin-bottom: 0.1em;
  }
`

export const Name = styled.div`
  display: flex;
  flex: 1 0 auto;
  justify-content: flex-start;
  letter-spacing: calc(-23 / 1000 * 1em);
  a {
    font-size: 100%;
    line-height: normal;
    font-weight: 500;
    color: ${props => props.theme.brand.primary};
    &:hover,
    &:focus {
      color: ${props => props.theme.colors.body_color};
      text-decoration: none;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    margin-bottom: 0.75rem;
  }
`
