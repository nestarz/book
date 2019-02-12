import "circular-std";
import SEO from "components/SEO";
import { usePrint } from "hooks/usePrint";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import {
  MdArrowBack,
  MdArrowForward,
  MdClose,
  MdMenu,
  MdPrint
} from "react-icons/md";
import { useGlobal } from "reactn";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { dark_theme, theme } from "../../../config/theme";
import reset from "../../styles/reset";

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
  body {
    font-size: 105%;
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
`;

const GlobalPrintStyle = createGlobalStyle`
  html, body {
    min-width: 240mm;
  }
`;

const LumiereToggle = styled.div`
  position: fixed;
  top: 0em;
  right: 0.5em;
  font-size: 120%;
  cursor: pointer;
  z-index: 999;
  p {
    margin: 0;
    padding: 0;
    margin-top: 0.5rem;
  }
  div > p:not(:first-child) {
    display: none;
  }
  div:hover {
    background-color: ${props => props.theme.colors.bg_color};
    p {
      display: block !important;
    }
    p:first-child {
      display: none !important;
    }
  }
`;

const Nav = styled.nav`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  cursor: pointer;
  z-index: 999999;
`;

// We can pass customSEO here to not include the <SEO> component twice. This prop is 'true' on the project template
// as the SEO component there passes in some additional things. Otherwise things would be inserted two times
const Layout = ({ children, pathname, customSEO, withNav = false }) => {
  const [printing, togglePrint] = usePrint(2000);
  const [alwaysOn, setAlwaysOn] = useState(false);
  useEffect(() => {
    if (printing) setAlwaysOn(true);
  }, [printing]);
  const themes = [theme, dark_theme];
  const [currThemeIndex, setCurrThemeIndex] = useGlobal("currThemeIndex");
  return (
    <ThemeProvider theme={themes[currThemeIndex]}>
      <>
        {!customSEO && <SEO pathname={pathname} />}
        <GlobalStyle />
        {alwaysOn && <GlobalPrintStyle />}
        <LumiereToggle className={"A"}>
          {!withNav && (
            <p
              onClick={() =>
                setCurrThemeIndex((currThemeIndex + 1) % themes.length)
              }
            >
              {currThemeIndex == 1 ? <IoIosSunny /> : <IoIosMoon />}
            </p>
          )}
          {withNav && (
            <>
              <div>
                <p onClick={() => window.history.back()}>
                  <MdMenu />
                </p>
                <p onClick={() => window.history.back()}>
                  <MdClose />
                </p>
                <p onClick={() => window.history.back()}>
                  <MdArrowBack />
                </p>
                <p onClick={() => window.history.forward()}>
                  <MdArrowForward />
                </p>
                <p onClick={() => window.print()}>
                  <MdPrint />
                </p>
                <p
                  onClick={() =>
                    setCurrThemeIndex((currThemeIndex + 1) % themes.length)
                  }
                >
                  {currThemeIndex == 1 ? <IoIosSunny /> : <IoIosMoon />}
                </p>
              </div>
            </>
          )}
        </LumiereToggle>
        {children}
      </>
    </ThemeProvider>
  );
};
export default Layout;
Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
  pathname: PropTypes.string.isRequired,
  customSEO: PropTypes.bool
};
Layout.defaultProps = {
  customSEO: false
};
