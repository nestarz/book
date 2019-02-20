import Layout from "components/Layout";
import TwoColumns from "components/Layout/Columns/Two";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import { MdViewList, MdViewColumn } from "react-icons/md";

const Wrapper = styled(TwoColumns)`
  button {
    margin: 0;
    display: block;
    color: ${props => props.theme.colors.body_color};
    &.more {
      &:before {
        content: "... ";
        color: ${props => props.theme.colors.body_color};
      }
      color: ${props => props.theme.brand.primary};
      display: inline-block;
    }
    .tag {
      &.isFilter {
        display: grid;
        grid-template-columns: minmax(1.5em, 0.1fr) 9.9fr 1fr;
        color: ${props => props.theme.brand.primary};
        :before {
          content: "✕";
        }
      }
    }
    .count {
      font-size: 65%;
    }
  }
  .body {
    max-width: 50rem;
    &.inline {
      max-width: 45rem;
    }
    h1 {
      margin-bottom: 0.1em;
      margin-top: 0;
      position: relative;
      button.layout {
        color: ${props => props.theme.brand.primary};
        position: absolute;
        right: 0;
        top: 5%;
      }
    }
    .focus {
      h1 {
        transform: translateX(-3em);
        margin-top: 1em !important;
        margin-bottom: 1em !important;
        font-size: 190% !important;
        width: 113%;
        @media (max-width: 700px) {
          font-size: 100% !important;
        }
      }
    }
    a {
      .alias {
        font-size: 70%;
        :before {
          content: "AKA";
        }
      }
    }
    ul:not(*:empty) {
      margin: 1em 0;
    }
    ul.inline {
      grid-template-columns: 1fr;
      li {
        display: grid;
        grid-template-columns: 0.15fr 1fr;
        grid-gap: 1em;
      }
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
    ? item.description.replace(/^(.{150}[^\s]*).*/, "$1")
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
  const [currCategory, setCurrCategory] = useState("people");
  const [layoutType, setLayoutType] = useState(false);
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
      <span className={`tag ${tagFilters.has(name) && "isFilter"}`}>
        <span>
          {name.charAt(0).toUpperCase() + name.slice(1)}{" "}
          <span className="count">{count}</span>
        </span>
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
            <div style={{ margin: "1em 0" }}>
              {Object.keys(data).map((category, i) => {
                const count = data[category].edges
                  .map(({ node }, j) => {
                    const isSubSet = Array.from(tagFilters).every(val => {
                      return node.tags.includes(val);
                    });
                    if (isSubSet) {
                      return 1;
                    } else return 0;
                  })
                  .reduce((pv, cv) => pv + cv, 0);
                if (count == 0) {
                  if (category == currCategory) setCurrCategory(null);
                  return <></>;
                } else {
                  if (currCategory == null) setCurrCategory(category);
                }
                return (
                  <div>
                    <h1>
                      <button onClick={() => setCurrCategory(category)}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                        <span className="count">{count}</span>
                      </button>
                    </h1>
                  </div>
                );
              })}
            </div>
          </header>
          <footer>{setTags}</footer>
        </div>
        <div>
          <div className={`body ${layoutType && "inline"}`}>
            {currCategory && (
              <div className={"focus"}>
                <h1>
                  {currCategory.charAt(0).toUpperCase() + currCategory.slice(1)}{" "}
                  <button
                    className={"layout"}
                    onClick={() => setLayoutType(!layoutType)}
                  >
                    {layoutType ? "||" : "—"}
                  </button>
                </h1>
                <ul className={layoutType && "inline"}>
                  {data[currCategory].edges.map(({ node }, j) => {
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
            )}
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
