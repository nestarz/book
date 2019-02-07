import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import React from 'react';
import { Wrapper } from './styles';
import SpringPosition from 'components/Layout/SpringPosition';

const Nav = (props, context) => {
  const { children, withToggleLanguage = true } = props;
  const [language, toggleLanguage] = useToggleGlobalLanguage()
  return (
    <Wrapper>
      <SpringPosition>
        <button onClick={() => window.history.back()}>{language == "fr" ? 'Retour' : 'Back'}</button>
        <button onClick={() => window.print()}>{language == "fr" ? 'Imprimer' : 'Print'}</button>
        {children}
        {withToggleLanguage && <button onClick={() => toggleLanguage()}>
          En/Fr
      </button>}
      </SpringPosition>
    </Wrapper>
  )
}

export default Nav;
