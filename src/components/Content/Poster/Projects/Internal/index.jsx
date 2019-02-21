import PosterTemplate from "components/Content/Poster/Template";
import { graphql, StaticQuery } from "gatsby";
import React, { useState } from "react";
import styled from "styled-components";
import reactStringReplace from "react-string-replace";
import { useInterval } from "hooks/useInterval";

export const frontmatter = {
  title: "Internal",
  description: "Coloration aléatoire de nombres présents dans les identifiants des fichiers qui constitue le site hôte."
};

const Wrapper = styled(PosterTemplate)`
  background-color: black;
  font-size: 120%;
  font-family: monospace;
  border: 1em solid black;
  .highlight {
    color: red;
    filter: blur(0.3px);
    display: inline-block;
    transform: scale(5, 2);
  }
`;

const highlighter = (text, numbers) => {
  const regex = new RegExp(`(${numbers.join("|")})`, "g");
  return reactStringReplace(text, regex, (match, i) => (
    <span key={i} className={"highlight"}>{match}</span>
  ));
};

const Internal = ({ fileIds }) => {
  const [numbers, setNumbers] = useState([0]);
  useInterval(() => {
    const newVal = Math.floor(Math.random() * 100);
    if (Math.random() > 0.8) setNumbers([newVal]);
    else setNumbers([...numbers, newVal]);
  }, 500);
  console.log(numbers);
  return (
    <Wrapper>
      {fileIds.map(({ node }, i) => {
        return (
          <span key={i}>
            {highlighter(node.atime, numbers)}:{" "}
            {highlighter(node.id, numbers)},
          </span>
        );
      })}
    </Wrapper>
  );
};

const query = graphql`
  {
    allFile(limit: 110) {
      edges {
        node {
          id
          relativePath
          atime
        }
      }
    }
  }
`;

export default props => (
  <StaticQuery
    query={query}
    render={data => <Internal fileIds={data.allFile.edges} {...props} />}
  />
);
