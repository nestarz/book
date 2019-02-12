import { SketchComponentAbsoluteBackground } from "components/Visual/P5js";
import { graphql, StaticQuery } from "gatsby";
import QRCode from "qrcode.react";
import React from "react";
import { Wrapper } from "../styles";

const Recto = ({ data, bgSketch }) => {
  const siteUrl = data.site.siteMetadata.siteConfig.siteUrl;
  return (
    <Wrapper className={"verso"}>
      <SketchComponentAbsoluteBackground
        sketch={bgSketch}
        watchedVal={bgSketch}
      />
      <QRCode
        value={siteUrl}
        size={59}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"H"}
        includeMargin={true}
        renderAs={"svg"}
      />
    </Wrapper>
  );
};

export default props => (
  <StaticQuery
    query={query}
    render={data => <Recto {...props} data={data} />}
  />
);

const query = graphql`
  query {
    site {
      siteMetadata {
        siteConfig {
          siteUrl
        }
      }
    }
  }
`;
