import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { ExperiencesListing, Layout } from 'components';
import theme from '../../config/theme';

const Experiences = ({
  data: {
    allFile: { edges: projectEdges },
  },
}) => (
  <Layout theme={theme.light} chart={false}>
    <ExperiencesListing projectEdges={projectEdges} />
  </Layout>
);

export default Experiences;

Experiences.propTypes = {
  data: PropTypes.shape({
    allFile: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query ExperiencesQuery {
    allFile(
      filter: { sourceInstanceName: { eq: "sketches" } }
      ) {
        edges {
          node {
            name
            sourceInstanceName
          }
        }
      }
  }
`;
