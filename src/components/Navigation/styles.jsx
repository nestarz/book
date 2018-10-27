import styled from 'react-emotion';

export const Wrapper = styled.div``;
export const RightGroup = styled.div``;
export const Nav = styled.div``;
export const Name = styled.div``;
export const SocialMedia = styled.div``;
export const active = styled.css`
  color: ${props => props.theme.brand.primary} !important;
  position: relative;
  &:after {
    background-color: ${props => props.theme.brand.primary};
  }
`;