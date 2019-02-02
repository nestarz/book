import React, { useState, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image';

const formatImagesNames = (images) => {
    var imageDict = {};
    images.map((edge, i) => {
        imageDict[edge.node.name.split("_")[1]] = edge.node
    })
    return imageDict
}
const getMax = (obj) => obj.reduce((obj1,obj2) => obj1.probability > obj2.probability ? obj1 : obj2)
const Header = ({ data, className, expressions }) => {
    const images = data.allFile.edges;
    const [bestEmotion, setBestEmotion] = useState(null);
    const imagesSrcDict = formatImagesNames(images);
    useEffect(() => {if(expressions) setBestEmotion(getMax(expressions))}, [expressions]);
    return <div className={className}><Img fluid={
        (imagesSrcDict && bestEmotion && bestEmotion.expression) ? imagesSrcDict[bestEmotion.expression].childImageSharp.fluid : imagesSrcDict["neutral"].childImageSharp.fluid
    }/></div>
}

export default props => (
    <StaticQuery
        query={graphql`
        query AssetsPhotos {
            allFile(filter: {extension: {eq: "png"}, relativeDirectory: {eq: "img"}}) {
            edges {
                node {
                id
                name
                relativePath
                childImageSharp {
                    # Specify the image processing specifications right in the query.
                    # Makes it trivial to update as your page's design changes.
                    fluid(maxWidth: 700, quality: 90) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
            }
            }
        }
    `}
        render={data => <Header data={data} {...props} />}
    />
)
