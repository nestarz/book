import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { SEO, Navigation, Footer } from '../components';
import theme from '../../config/theme';
import Helmet from 'react-helmet';

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    {/* <Helmet bodyAttributes={{style: `background-color : ${theme.colors.bg_color}`}}/> */}
    <React.Fragment>
      <SEO />
      <Navigation />
      {children}
      <Footer />
    </React.Fragment>
  </ThemeProvider>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
};
