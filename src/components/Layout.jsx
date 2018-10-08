import "circular-std";
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { SEO, Navigation, Footer } from '../components';
import Helmet from 'react-helmet';

const Layout = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <Helmet>
        <style type="text/css">{`
            body {
              background-color : ${theme.colors.bg_color};
              color: ${theme.colors.body_color};
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
  theme: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
};
