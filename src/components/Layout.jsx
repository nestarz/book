import "circular-std";
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { SEO, Navigation, Footer } from '../components';
import Helmet from 'react-helmet';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import { Chords } from '../components';
import { withScreenSize } from '@vx/responsive';
import styled, { css } from 'react-emotion';

import { ThreeScene } from '../components';


let ChartToRender = withScreenSize(
  ({ screenWidth, screenHeight, ...rest }) => (
    <Chords width={screenWidth * 1} height={screenHeight * 1} {...rest} />
  )
);

let ObjToRender = withScreenSize(
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
      <WrapperChart>
        <ChartToRender theme={theme}/>
      </WrapperChart>
      <WrapperChart>
        <ObjToRender theme={theme} />
      </WrapperChart>
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
