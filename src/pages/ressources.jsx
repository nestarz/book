import Layout from "components/Layout";
import TwoColumns from "components/Layout/Columns/Two";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import Img from "gatsby-image";

const Wrapper = styled(TwoColumns)`
  button {
    display: block;
    &.more {
      &:before {
        content: "... ";
        color: ${props => props.theme.colors.body_color};
      }
      color: ${props => props.theme.brand.primary};
      display: inline-block;
    }
    .isFilter {
      color: ${props => props.theme.brand.primary};
      display: grid;
      grid-template-columns: minmax(1.5em, 0.1fr) 9.9fr;
      :before {
        content: "✕";
      }
    }
  }
  .body {
    max-width: 50rem;
    h1 {
      margin-bottom: 0.1em;
      margin-top: 0;
    }
    a {
      .alias {
        font-size: 70%;
        :before {
          content: 'AKA'
        }
      }
    }
    ul:not(*:empty) {
      margin: 1em 0;
    }
    .gatsby-image-wrapper {
      margin-bottom: 1em;
      & + div {
        margin-bottom: 1em;
      }
    }
  }
`;

function count(tags) {
  var dic = {};
  tags.forEach(function(el, i, arr) {
    var elStandard = el.toLowerCase();
    dic[elStandard] = dic[elStandard] ? ++dic[elStandard] : 1;
  });
  var obj = [];
  Object.keys(dic).forEach(elt => {
    obj.push({ name: elt, count: dic[elt] });
  });
  return obj;
}
const concat = (x, y) => x.concat(y);
const flatMap = (f, xs) => xs.map(f).reduce(concat, []);
Array.prototype.flatMap = function(f) {
  return flatMap(f, this);
};

const Item = ({ item }) => {
  const [seeMore, setSeeMore] = useState(false);
  const excerpt = item.description
    ? item.description.replace(/^(.{200}[^\s]*).*/, "$1")
    : "";
  return (
    <li>
      {item.childScreenshot && (
        <Img
          fluid={item.childScreenshot.screenshotFile.childImageSharp.fluid}
        />
      )}
      <div>
        <a href={item.url}>
          {item.name}{" "}
          {item.alias && <span className="alias">{item.alias}</span>}
        </a>
        {seeMore ? item.description : excerpt}
        {item.description && excerpt != item.description && (
          <button onClick={() => setSeeMore(!seeMore)} className={"more"}>
            {seeMore ? "Moins" : "Plus"}
          </button>
        )}
      </div>
    </li>
  );
};

const Index = ({ data, location }) => {
  const [tagFilters, setTagsFilters] = useState(() => new Set());
  const [foo, setFoo] = useState(false);
  const tags = Object.keys(data)
    .map((category, i) =>
      data[category].edges.map(({ node }, j) => {
        const isSubSet = Array.from(tagFilters).every(val => {
          return node.tags.includes(val);
        });
        if (isSubSet) return node.tags.map((tag, k) => tag);
      })
    )
    .flat(2)
    .filter(elt => elt !== undefined)
    .sort((a, b) => (a > b) - (a < b));
  const setTags = count(tags).map(({ name, count }, i) => (
    <button
      key={i}
      onClick={() => {
        setTagsFilters(tagFilters => {
          if (tagFilters.has(name)) tagFilters.delete(name);
          else tagFilters.add(name);
          return tagFilters;
        });
        setFoo(!foo); //fix not rerender on new set
      }}
    >
      <span className={tagFilters.has(name) && "isFilter"}>
        {name.charAt(0).toUpperCase() + name.slice(1)} ({count})
      </span>
    </button>
  ));
  return (
    <Layout pathname={location.pathname} withNav={true}>
      <Wrapper>
        <div>
          <header>
            <h1>
              Ressources, <span className={"desc"}>Essentials</span>
            </h1>
          </header>
          <footer>{setTags}</footer>
        </div>
        <div>
          <div className="body">
            {Object.keys(data).map((category, i) => (
              <div>
                <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
                <ul>
                  {data[category].edges.map(({ node }, j) => {
                    const isSubSet = Array.from(tagFilters).every(val => {
                      return node.tags.includes(val);
                    });
                    if (isSubSet) {
                      if (node.collection) {
                        return node.collection.map((item, k) => (
                          <Item item={item} />
                        ));
                      } else {
                        return <Item item={node} />;
                      }
                    }
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query ResurlQuery {
    people: allPeopleYaml {
      edges {
        node {
          name
          url
          childScreenshot {
            screenshotFile {
              childImageSharp {
                fluid(maxWidth: 350, quality: 70) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          description
          tags
        }
      }
    }
    collectives: allCollectivesYaml {
      edges {
        node {
          name
          url
          childScreenshot {
            screenshotFile {
              childImageSharp {
                fluid(maxWidth: 350, quality: 70) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          description
          tags
        }
      }
    }
    projects: allProjectsYaml {
      edges {
        node {
          name
          url
          childScreenshot {
            screenshotFile {
              childImageSharp {
                fluid(maxWidth: 350, quality: 70) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          description
          tags
        }
      }
    }
    festivals: allFestivalsYaml {
      edges {
        node {
          name
          url
          childScreenshot {
            screenshotFile {
              childImageSharp {
                fluid(maxWidth: 350, quality: 70) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          description
          tags
        }
      }
    }
    schools: allSchoolsYaml {
      edges {
        node {
          name
          url
          childScreenshot {
            screenshotFile {
              childImageSharp {
                fluid(maxWidth: 350, quality: 70) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          description
          tags
        }
      }
    }
    laboratories: allLaboratoriesYaml {
      edges {
        node {
          name
          url
          childScreenshot {
            screenshotFile {
              childImageSharp {
                fluid(maxWidth: 350, quality: 70) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          description
          tags
        }
      }
    }
    datasets: allDatasetsYaml {
      edges {
        node {
          name
          url
          childScreenshot {
            screenshotFile {
              childImageSharp {
                fluid(maxWidth: 350, quality: 70) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          description
          tags
        }
      }
    }
    magazines: allMagazinesYaml {
      edges {
        node {
          name
          url
          childScreenshot {
            screenshotFile {
              childImageSharp {
                fluid(maxWidth: 350, quality: 70) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          description
          tags
        }
      }
    }
    residencies: allResidencesYaml {
      edges {
        node {
          name
          url
          childScreenshot {
            screenshotFile {
              childImageSharp {
                fluid(maxWidth: 350, quality: 70) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          description
          tags
        }
      }
    }
    posts: allPostsYaml {
      edges {
        node {
          name
          url
          childScreenshot {
            screenshotFile {
              childImageSharp {
                fluid(maxWidth: 350, quality: 70) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          tags
          collection {
            name
            url
          }
        }
      }
    }
  }
`;

Index.propTypes = {
  location: PropTypes.object.isRequired
};
