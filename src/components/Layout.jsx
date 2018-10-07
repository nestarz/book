import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { SEO, Navigation, Footer } from '../components';
import theme from '../../config/theme';
import Helmet from 'react-helmet';

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <Helmet bodyAttributes={{style: `background-color : ${theme.colors.bg_color}`}}/>
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
