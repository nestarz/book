module.exports = {
  pages: `
  {
    projects: allMdx(filter: { fields: { sourceInstanceName: { eq: "projects" } } }) {
      edges {
        node {
          fields {
            slug
          }
          code {
            scope
          }
        }
      }
    }
    letters: allMdx(filter: { fields: { sourceInstanceName: { eq: "letters" } } }) {
      edges {
        node {
          fields {
            slug
          }
          code {
            scope
          }
        }
      }
    }
    billets: allMdx(filter: { fields: { sourceInstanceName: { eq: "billets" } } }) {
      edges {
        node {
          fields {
            slug
          }
          code {
            scope
          }
        }
      }
    }
  }
`
}
