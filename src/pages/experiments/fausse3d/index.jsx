import React from "react"
import PropTypes from "prop-types"
import Fausse3d from "components/Experiments/Fausse3d"

const Index = ({ data }) => {
  return (
    <Fausse3d />
  )
}

export default Index;

Index.propTypes = {
  location: PropTypes.object.isRequired,
};

export const frontmatter = {
  title: "Fausse 3d",
  written: "2017-05-04",
  layoutType: "post",
  path: "sd-on-d3v4",
  category: "experiments",
  description: "Things about the choropleth.",
  updated: false
}
