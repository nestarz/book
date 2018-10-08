import "circular-std";
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { SEO, Navigation, Footer } from '../components';
import theme from '../../config/theme';

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <Helmet>
        <style type="text/css">{`
            body {
              background-color : ${theme.colors.bg_color};
            }
      `}</style>
      </Helmet>
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
