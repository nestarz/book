import "circular-std";
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { SEO, Navigation, Footer } from '../components';
import Helmet from 'react-helmet';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import { withScreenSize } from '@vx/responsive';
import styled, { css } from 'react-emotion';
import { ThreeScene } from '../components';

let ThreeBackground = withScreenSize(
  ({ screenWidth, screenHeight, ...rest }) => (
    <ThreeScene width={screenWidth} height={screenHeight} {...rest} />
  )
);

const WrapperChart = styled.div`
  & {
    position: fixed;
    z-index:-1000;
  }
`;

const Layout = ({ theme, chart, children }) => (
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
      {/* <WrapperChart>
        <ThreeBackground theme={theme} />
      </WrapperChart> */}
      <Navigation />
      {children}
      <Footer />
      <ScrollUpButton 
      style={{
        backgroundColor: theme.colors.bg_color,
        borderColor: theme.colors.bg_color,
        fill: theme.colors.body_color
      }}
      />
    </React.Fragment>
  </ThemeProvider>
);

export default Layout;

Layout.propTypes = {
  theme: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
};
