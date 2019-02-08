import 'circular-std';
import SEO from 'components/SEO';
import { usePrint } from 'hooks/usePrint';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useGlobal } from 'reactn';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { dark_theme, theme } from '../../../config/theme';
import reset from '../../styles/reset';
import { IoIosMoon, IoIosSunny } from 'react-icons/io';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";

const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
    font-family: "CircularStd", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    cursor: crosshair;
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
    min-height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .nav-active {
    color: ${props => props.theme.brand.primary} !important;
  }
  h1, h2, h3, h4 {
    font-weight: 500;
  }
  .ScrollUpButton__Container {
    background-color: transparent !important;
    color: ${props => props.theme.colors.bg_color} !important;
    border: none !important;
    path {
      fill: ${props => props.theme.colors.body_color} !important;
    }
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

const LumiereToggle = styled.div`
position: fixed;
top: 2px; right: 10px;
font-size: 2em;
cursor: pointer;
z-index: 999;
`;

// We can pass customSEO here to not include the <SEO> component twice. This prop is 'true' on the project template
// as the SEO component there passes in some additional things. Otherwise things would be inserted two times
const Layout = ({ children, pathname, customSEO }) => {
  const [printing, togglePrint] = usePrint(2000);
  const [alwaysOn, setAlwaysOn] = useState(false);
  useEffect(() => { if (printing) setAlwaysOn(true) }, [printing])
  const themes = [theme, dark_theme];
  const [currThemeIndex, setCurrThemeIndex] = useGlobal('currThemeIndex');
  return (
    <ThemeProvider theme={themes[currThemeIndex]}>
      <>
        {!customSEO && <SEO pathname={pathname} />}
        <GlobalStyle />
        {alwaysOn && <GlobalPrintStyle />}
        <LumiereToggle onClick={() => setCurrThemeIndex((currThemeIndex + 1) % themes.length)}>
        {currThemeIndex == 1 ? <IoIosMoon/> : <IoIosSunny/>}
        </LumiereToggle>
        {children}
        <ScrollUpButton
          AnimationDuration={600}
        />
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
