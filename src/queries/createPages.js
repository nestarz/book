module.exports = {
  pages: `
  {
    almusiqa: allMdx(filter: { fields: { sourceInstanceName: { eq: "almusiqa" } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            mbid
          }
          code {
            scope
          }
        }
      }
    }
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
`,
ressources: `
{
  allPostsYaml {
    edges {
      node {
        name
        source
        tags
        collection {
          name
          source
        }
      }
    }
  }
  allFestivalsYaml {
    edges {
      node {
        name
        source
        description
        tags
      }
    }
  }
  allSchoolsYaml {
    edges {
      node {
        name
        source
        description
        tags
      }
    }
  }
  allPeopleYaml {
    edges {
      node {
        name
        source
        description
        tags
      }
    }
  }
  allLaboratoriesYaml {
    edges {
      node {
        name
        source
        description
        tags
      }
    }
  }
    allDatasetsYaml {
    edges {
      node {
        name
        source
        description
        tags
      }
    }
  }
  allMagazinesYaml {
    edges {
      node {
        name
        source
        description
        tags
      }
    }
  }
  allResidencesYaml {
    edges {
      node {
        name
        source
        description
        tags
      }
    }
  }
  allProjectsYaml {
    edges {
      node {
        name
        source
        description
        tags
      }
    }
  }
    allCollectivesYaml {
    edges {
      node {
        name
        source
        description
        tags
      }
    }
  }
}
`
}

