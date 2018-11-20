import React from "react";
import PropTypes from "prop-types";

import "circular-std";
import "typeface-yrsa";

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
import { RotateOne as Scene3D } from '../../Scenes3D';
import { ParentSize } from '@vx/responsive';
import ContainerDimensions from 'react-container-dimensions'

import { 
  Wrapper,
  MotifWrapper as Holder3D,
 } from "./styles";

const LayoutWrapper = props => {
  const { theme, navType, children, style } = props;

  return (
    <Wrapper style={style}>
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
  navType: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
};
export default LayoutWrapper;
