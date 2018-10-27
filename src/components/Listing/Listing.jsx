import React from 'react';
import PropTypes from 'prop-types';

import MainListing from "./MainListing";

const Listing = props => {
  const { listingType, projectEdges } = props;
  switch (listingType) {
    case "main":
    default:
      return (
        <MainListing projectEdges={projectEdges}/>
      );
  }
}
export default Listing;

Listing.propTypes = {
  listingType: PropTypes.string.isRequired,
  projectEdges: PropTypes.array.isRequired,
};