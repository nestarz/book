import React from "react";
import PropTypes from "prop-types";

import "circular-std";
import Helmet from 'react-helmet';
import { ThemeProvider } from 'emotion-theming';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import { withScreenSize } from '@vx/responsive';

import Navigation from "../../Navigation"
import SEO from "../../SEO";
import Footer from "../../Footer";
import { Grid as Motif } from '../../Motifs';
//import { AnimatedSurface as Motif } from '../../Shaders';
//import { GameofLife as Motif } from '../../Shaders';
//import { DesertPassage as Motif } from '../../Shaders';

import { 
  Wrapper,
  MotifWrapper,
 } from "./styles";

let MotifResponsive = withScreenSize(
  ({ screenWidth, screenHeight, ...rest }) => (
    <Motif width={screenWidth} height={screenHeight} {...rest} />
  )
);

const LayoutWrapper = props => {
  const { theme, children } = props;

  return (
    <Wrapper>
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
      {/* <MotifWrapper>
        <MotifResponsive theme={theme}/>
      </MotifWrapper> */}
      <Navigation theme={theme}/>
      {children}
      <Footer/>
      <ScrollUpButton 
      style={{
        backgroundColor: theme.colors.bg_color,
        borderColor: theme.colors.bg_color,
        fill: theme.colors.body_color
      }}
      />
    </React.Fragment>
  </ThemeProvider>
  </Wrapper>
  );
};

LayoutWrapper.propTypes = {
  theme: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
};
export default LayoutWrapper;
