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
`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
min-height: 100vh;
width: 100%;
`

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Wrapper>
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
