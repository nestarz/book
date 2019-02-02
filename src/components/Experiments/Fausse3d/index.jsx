import React from "react"
import { StaticQuery, graphql } from "gatsby"
import {Face1, Face2, Face3, Face4, Face5, Text, Experiment} from './styles'

const Fausse3d = ({ data }) => {
  return (
    <Experiment>
      <Face1 bg={data.allFile.edges[2].node.childImageSharp.fixed.src}/>
      <Face4 bg={data.allFile.edges[2].node.childImageSharp.fixed.src}/>
      <Face3 bg={data.allFile.edges[3].node.childImageSharp.fixed.src}/>
      <Face2 bg={data.allFile.edges[2].node.childImageSharp.fixed.src}/>
      <Text>fausse 3d</Text>
    </Experiment>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allFile(filter: {extension: {eq: "png"}, relativeDirectory: {eq: "fausse3d\\img"}}) {
          edges {
            node {
              childImageSharp {
                fixed(width: 960) {
                    ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Fausse3d data={data} {...props} />}
  />
)
