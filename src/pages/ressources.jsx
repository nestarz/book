import Layout from "components/Layout/Main";
import TwoColumns from "components/Layout/Template/TwoColumns";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled(TwoColumns)`
  button {
    margin: 0;
    display: block;
    color: ${props => props.theme.colors.body_color};
    &.inline {
      display: inline-block;
      margin-right: 0.5em;
      font-size: 70%;
      opacity: 0.4;
      &:hover {
        opacity: 1;
      }
    }
    &.more {
      &:hover {
        color: ${props => props.theme.colors.body_color} !important;
      }
    }
    .moreToggle {
      &:before {
        content: " ";
      }
      color: ${props => props.theme.brand.primary};
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
      @media (max-width: 700px) {
        display: none;
      }
    }
  }
  footer {
    white-space: nowrap;
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
        width: 113%;

        margin-top: 1em !important;
        margin-bottom: 1em !important;
        font-size: 190% !important;
        @media (max-width: 700px) {
          font-size: 100% !important;
        }
      }
    }
    a {
      .alias {
        font-size: 70%;
        font-style: italic;
      }
    }
    .location {
      font-size: 70%;
      font-style: italic;
      color: ${props => props.theme.colors.body_color};
      margin-bottom: 0.5em;
    }
    ul.mainUl:not(*:empty) {
      margin: 1em 0;
      & > li {
        display: flex;
        flex-direction: column;
        justify-content: normal;
        & > * {
          margin-bottom: 1em;
        }
        & > :first-child {
          :empty {
            background-color: ${props => props.theme.colors.body_color};
            flex: 1;
            opacity: 0.05;
            max-height: 316.23px;
          }
        }
      }
    }
    ul.mainUl.inline {
      grid-template-columns: 1fr;
      & > li {
        display: grid;
        grid-template-columns: 0.2fr 0.8fr;
        grid-gap: 1em;
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

const Item = ({ item, setTagsFilters }) => {
  const [seeMore, setSeeMore] = useState(false);
  const excerpt = item.description
    ? item.description.replace(/^(.{150}[^\s]*).*/, "$1")
    : "";
  return (
    <li>
      {item.childScreenshot ? (
        <Img
          fluid={item.childScreenshot.screenshotFile.childImageSharp.fluid}
        />
      ) : (
        <div />
      )}
      <div>
        <a href={item.url}>
          {item.name}{" "}
          {item.alias && <span className="alias">({item.alias})</span>}
        </a>
        {item.location && (
          <div className="location">
            {item.location.city && item.location.city + ","}{" "}
            {item.location.country}
          </div>
        )}
        <button onClick={() => setSeeMore(!seeMore)} className={"more"}>
          {seeMore ? item.description : excerpt}
          {item.description && excerpt != item.description && (
            <span className="moreToggle">{seeMore ? " Moins" : "..."}</span>
          )}
        </button>
        <div>
          {item.tags &&
            item.tags.map((tag, index) => (
              <button
                className="tag inline"
                onClick={() => setTagsFilters(new Set([tag]))}
              >
                {tag}
              </button>
            ))}
        </div>
      </div>
    </li>
  );
};

const Collection = ({ items, setTagsFilters, parentNode }) => {
  return (
    <li>
      {parentNode.childScreenshot ? (
        <Img
          fluid={parentNode.childScreenshot.screenshotFile.childImageSharp.fluid}
        />
      ) : (
        <div />
      )}
      <ul className={"collection"}>
        {items.map((item, k) => (
          <Item item={item} setTagsFilters={setTagsFilters} />
        ))}
        <div>
          {parentNode.tags &&
            parentNode.tags.map((tag, index) => (
              <button
                className="tag inline"
                onClick={() => setTagsFilters(new Set([tag]))}
              >
                {tag}
              </button>
            ))}
        </div>
      </ul>
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
                <ul className={`mainUl ${layoutType && "inline"}`}>
                  {data[currCategory].edges.map(({ node }, j) => {
                    const isSubSet = Array.from(tagFilters).every(val => {
                      return node.tags.includes(val);
                    });
                    if (isSubSet) {
                      if (node.collection) {
                        return (
                          <Collection
                            setTagsFilters={setTagsFilters}
                            items={node.collection}
                            parentNode={node}
                          />
                        );
                      } else {
                        return (
                          <Item item={node} setTagsFilters={setTagsFilters} />
                        );
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
          alias
          location {
            city
            country
            workplace
          }
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
          location {
            city
            country
          }
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
          location {
            city
            country
          }
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
          location {
            city
            country
          }
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
          location {
            city
            country
          }
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
          location {
            city
            country
          }
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
          location {
            city
            country
          }
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
