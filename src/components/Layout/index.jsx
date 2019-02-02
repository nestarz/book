import 'circular-std';
import SEO from 'components/SEO';
import { usePrint } from 'hooks/usePrint';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from '../../../config/theme';
import reset from '../../styles/reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
    font-family: "CircularStd", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  html, body {
    margin: 0;
    padding: 0;
    border: none;
    height: 100%;
  }
  #___gatsby, #___gatsby > div {
    margin: 0;
    padding: 0;
    border: none;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .nav-active {
    color: ${theme.brand.primary} !important;
  }
  h1, h2, h3, h4 {
    font-weight: 500;
  }
`

const GlobalPrintStyle = createGlobalStyle`
  html, body {
    min-width: 240mm;
  }
  .fullWidth {
    max-width: 100% !important;
    width: 100% !important;
    min-height: 25vh !important;
    padding: 0 !important;
    margin: 0 !important;
    position: initial !important;
  }
`
// We can pass customSEO here to not include the <SEO> component twice. This prop is 'true' on the project template
// as the SEO component there passes in some additional things. Otherwise things would be inserted two times
const Layout = ({ children, pathname, customSEO }) => {
  const [printing, togglePrint] = usePrint(2000);
  const [alwaysOn, setAlwaysOn] = useState(false);
  useEffect(() => { if (printing) setAlwaysOn(true) }, [printing])
  const btn = <button onClick={togglePrint}>Print {printing.toString()}</button>
  return (
    <ThemeProvider theme={theme}>
      <>
        {!customSEO && <SEO pathname={pathname} />}
        <GlobalStyle />
        {alwaysOn && <GlobalPrintStyle />}
        {children}
      </>
    </ThemeProvider>
  )
}
export default Layout
Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
  pathname: PropTypes.string.isRequired,
  customSEO: PropTypes.bool,
}
Layout.defaultProps = {
  customSEO: false,
}
