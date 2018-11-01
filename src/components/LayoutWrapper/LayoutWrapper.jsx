import React from 'react';
import PropTypes from 'prop-types';

import MainLayout from "./MainLayout";

const Listing = props => {
  const { layoutType, children, ...rest } = props;
  switch (layoutType) {
    case "main":
    default:
      return (
        <MainLayout {...rest} >
          {children}
        </MainLayout>
      );
  }
}
export default Listing;

Listing.propTypes = {
  layoutType: PropTypes.string.isRequired,
};