import React from 'react';
import PropTypes from 'prop-types';

import MainLayout from "./MainLayout";

const Listing = props => {
  const { layoutType, theme, children } = props;
  switch (layoutType) {
    case "main":
    default:
      return (
        <MainLayout theme={theme}>
          {children}
        </MainLayout>
      );
  }
}
export default Listing;

Listing.propTypes = {
  layoutType: PropTypes.string.isRequired,
  projectEdges: PropTypes.array.isRequired,
};