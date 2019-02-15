import React, { useState } from "react";
import PropTypes from "prop-types";
import Layout from "components/Layout";
import Star from "components/SVG/Star";
import TwoColumns from "components/Layout/Columns/Two";
import PlaylistList from "components/Layout/List/Playlists";
import styled from "styled-components";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { GoLinkExternal } from "react-icons/go";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import Img from "gatsby-image";

const Wrapper = styled(TwoColumns)`
  .title {
    margin-bottom: 1em;
  }
  counter-reset: list;
  h2 {
    &:not(:first-child) {
      margin-top: 2em;
    }
    display: block;
    page-break-before: always;
    &:before {
      counter-increment: list 1;
      content: counter(list, hiragana) " " counter(list, decimal-leading-zero);
      word-spacing: 1em;
      padding-right: 1em;
    }
  }
`;

const Post = styled.div`
  display: flex;
  margin-bottom: 1em;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Release = styled.div`
  position: relative;
  flex: 1;
  > div {
    height: 100%;
    img {
      object-fit: cover;
      width: 100%;
    }
  }
`;

const InfoLink = styled(OutboundLink)`
  display: grid;
  grid-template-columns: 1fr 1.1fr 0.7fr 0.2fr;
  color: inherit;
  div {
    width: auto;
    :nth-child(1) {
      text-align: left;
    }
    :nth-child(2) {
      text-align: center;
    }
    :nth-child(1n + 3) {
      text-align: right;
      svg {
        margin-top: -0.2em;
        font-size: 95%;
      }
    }
  }
`;

const Tags = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 1em;
  flex-wrap: wrap;
  h3 {
    font-weight: 900;
  }
`;
const StarFixed = styled(Star)`
  position: fixed;
  bottom: 1em;
  right: 1em;
`;
function count(tags) {
  var dic = {};
  tags.forEach(function(el, i, arr) {
    var elStandard = el.toLowerCase()
    dic[elStandard] = dic[elStandard] ? ++dic[elStandard] : 1;
  });
  var obj = [];
  Object.keys(dic).forEach(elt => {
    obj.push({ name: elt, count: dic[elt] });
  });
  return obj;
}

const concat = (x,y) =>
  x.concat(y)

const flatMap = (f,xs) =>
  xs.map(f).reduce(concat, [])

Array.prototype.flatMap = function(f) {
  return flatMap(f,this)
}

const Index = ({ playlists, location }) => {
  const playlistsTags = playlists.flatMap(({ frontmatter }, i) =>
    frontmatter.tags.map((tag, i) => tag)
  );
  return (
    <Layout pathname={location.pathname} withNav={true}>
      <Wrapper>
        <header>
          <h1>
            Listen to this,{" "}
            <span className="desc">
              sharing favorites albums. Inspired by fantastic{" "}
              <OutboundLink
                href="https://www.listentothis.info"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jen Monroe
              </OutboundLink>{" "}
              blog.
            </span>
          </h1>
          <div style={{marginBottom: "1em"}}>
            {count(playlistsTags).map(({ name, count }, i) => (
              <div key={i}>
                {name} ({count})
              </div>
            ))}
          </div>
        </header>
        <div>
          <div className={"body"}>
            {playlists.map(({ frontmatter, playlist, body }, i) => (
              <React.Fragment key={i}>
                <h2 className={"title"}>{frontmatter.title}</h2>
                <Post>
                  {playlist.map((release, j) => (
                    <Release key={j}>
                      <div>
                        <Img fluid={release.cover.childImageSharp.fluid} />
                      </div>
                    </Release>
                  ))}
                </Post>
                {playlist.map((release, j) => (
                  <InfoLink
                    key={j}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      "https://www.youtube.com/results?q=" +
                      release.title +
                      "+" +
                      release.artistCredits[0].name
                    }
                  >
                    <div>{release.artistCredits[0].name}</div>
                    <div>{release.title}</div>
                    <div>{release.date.split("-")[0]}</div>
                    <div>
                      <GoLinkExternal />
                    </div>
                  </InfoLink>
                ))}
                <MDXRenderer>{body}</MDXRenderer>
                <Tags>
                  <h3>catégories</h3>
                  {frontmatter.tags.map((tag, i) => (
                    <span key={i}>{tag.toLowerCase()}</span>
                  ))}
                </Tags>
              </React.Fragment>
            ))}
          </div>
        </div>
      </Wrapper>
      <StarFixed>Send me an email if you have suggestions!</StarFixed>
    </Layout>
  );
};

export default props => {
  return (
    <PlaylistList>
      {playlists => <Index {...props} playlists={playlists} />}
    </PlaylistList>
  );
};

Index.propTypes = {
  location: PropTypes.object.isRequired
};
