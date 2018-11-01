import React from 'react';
import PropTypes from 'prop-types';

import Nav1 from "./Nav1";
import Nav2 from "./Nav2";

const NavigationRouter = props => {
  const { navType, theme, children } = props;
  switch (navType) {
    case "front":
    default:
        return (
            <Nav1 theme={theme}>
                {children}
            </Nav1>
        )
    case "main":
      return (
        <Nav2 theme={theme}>
            {children}
        </Nav2>
      );
  }
}
export default NavigationRouter;

NavigationRouter.propTypes = {
    navType: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
};