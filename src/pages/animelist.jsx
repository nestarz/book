import React from "react";
import PropTypes from "prop-types";
import Layout from "components/Layout";
import Star from "components/SVG/Star";
import { StaticQuery } from "gatsby";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1em;
  h1,
  h2,
  h3 {
    all: unset;
  }
`;

const AnimeWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: grid;
  max-height: 100vh;
  overflow: hidden;
  grid-template-columns: min-content;
  grid-template-rows: repeat(auto-fill, minmax(10vh, 1fr));
  grid-auto-flow: column dense;
  grid-gap: 0em;
  & > * {
    border-bottom: 1px dashed ${props => props.theme.colors.body_color};
    border-right: 1px dashed ${props => props.theme.colors.body_color};
  }
  & > *:nth-last-child(2):nth-child(odd) {
    border-bottom: none;
  }
  &,
  & * {
    cursor: pointer;
  }
  p {
    max-width: 40rem;
  }
  div {
    img {
      pointer-events: none;
      width: 100%; /* image box size as % of container, see step 1 */
      height: 100%; /* image box size as % of container, see step 1 */
      object-fit: cover; /* matching of image pixels to image box, see step 2 */
      padding: 0.2em;
      filter: grayscale(1);
    }
    .info {
      display: none;
    }
    p, p span {
      max-width: 40rem;
    }
    &:hover {
      z-index: 99;
      img {
        opacity: 1 !important;
        position: absolute;
        height: 40vh;
        width: auto;
        z-index: 1;
        padding: 0;
        object-fit: unset;
        filter: grayscale(0);
      }
      .info {
        display: block;
        position: fixed;
        z-index: 2;
        bottom: 0;
        right: 0;
        padding: 1em;
        span {
          background-color: ${props => props.theme.colors.bg_color};
        }
        h1 {
          font-size: 9vmin;
        }
        pointer-events: none;
        text-shadow: 0 0 0.1em ${props => props.theme.colors.bg_color};
      }
    }
  }
`;

const Index = ({ data, location }) => {
  return (
    <Layout pathname={location.pathname} withNav={true}>
      <Wrapper>
        <h1>Animes Collection</h1>
        <AnimeWrapper>
          {data.anilist.MediaListCollection.lists.map(({ entries }, i) =>
            entries.map(
              (
                {
                  media: {
                    meanScore,
                    description,
                    coverImage: { large },
                    title: { native, english, romaji }
                  }
                },
                j
              ) => {
                return (
                  <div>
                    <img
                      src={large}
                      style={{
                        opacity: (meanScore / 90) ** 6
                      }}
                    />
                    <div className={"info"}>
                      <Star/>
                      <h1>
                        <span>
                          {english ? english : romaji}
                          {native}
                        </span>
                      </h1>
                      <p>
                        <span>{description.slice(0, 1000)}</span>
                      </p>
                    </div>
                  </div>
                );
              }
            )
          )}
        </AnimeWrapper>
      </Wrapper>
    </Layout>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      {
        anilist {
          MediaListCollection(userId: 238438, type: ANIME) {
            lists {
              entries {
                id
                media {
                  description
                  meanScore
                  coverImage {
                    large
                  }
                  title {
                    romaji
                    english
                    native
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Index data={data} {...props} />}
  />
);

Index.propTypes = {
  location: PropTypes.object.isRequired
};
