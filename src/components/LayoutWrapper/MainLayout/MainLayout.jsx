import React from "react";
import PropTypes from "prop-types";

import "circular-std";
import Helmet from 'react-helmet';
import { ThemeProvider } from 'emotion-theming';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

import Navigation from "../../Navigation"
import SEO from "../../SEO";
import Footer from "../../Footer";

import { Wrapper } from "./styles";

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
