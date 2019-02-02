import { Link } from 'gatsby';
import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import React from 'react';
import { Wrapper } from './styles';

const Nav = (props, context) => {
  const {children} = props;
  const [language, toggleLanguage] = useToggleGlobalLanguage()
  return (
    <Wrapper>
      <button onClick={() => window.history.back()}>{language == "fr" ? 'Retour' : 'Back'}</button>
      {children}
      <button onClick={() => window.print()}>{language == "fr" ? 'Imprimer' : 'Print'}</button>
      <button onClick={() => toggleLanguage()}>
        En/Fr
      </button>
    </Wrapper>
  )
}

export default Nav;
