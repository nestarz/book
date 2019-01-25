import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import "circular-std"
import SEO from './SEO'
import theme from '../../config/theme'
import reset from '../styles/reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
    font-family: "CircularStd", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: "CircularStd", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  .nav-active {
    color: ${theme.brand.primary} !important;
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
  }
  p {
    font-size: 1.2rem;
    letter-spacing: -0.018em;
    line-height: 1.58;
    --baseline-multiplier: 0.179;
    --x-height-multiplier: 0.35;
    @media (max-width: ${theme.breakpoints.l}), (max-device-width: ${theme.breakpoints.l}) {
      font-size: 1.1rem;
    }
    @media (max-width: ${theme.breakpoints.m}), (max-device-width: ${theme.breakpoints.m}) {
      font-size: 1rem;
    }
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
    letter-spacing: calc(-13 / 1000 * 1em);
  }
`

const Wrapper = styled.div`
min-height: 100%;
width: 100%;
position: relative;
display: flex;
flex-direction: column;
`

const Layout = ({ children, style }) => (
  <ThemeProvider theme={theme}>
    <Wrapper style={style}>
      <SEO />
      <GlobalStyle />
      <noscript>To browse this site, please enable JavaScript.</noscript>
      {children}
    </Wrapper>
  </ThemeProvider>
)

export default Layout

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
}
