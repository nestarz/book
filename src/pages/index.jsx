/* eslint react/display-name: 0 */
import React from 'react'
import { Link, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { Trail } from 'react-spring'
import styled from 'styled-components'
import { Layout } from 'components'
import website from '../../config/website';
import theme from '../../config/theme';
import NameHeader from 'components/Navigation/NameHeader';
import ProjectList from 'components/Navigation/ProjectList';
import ExperimentList from 'components/Navigation/ExperimentList';
import ContainerDimensions from 'react-container-dimensions'
import { SketchComponent } from 'components/P5js';
import sketch1 from 'components/P5js/projects/mainScreen/sketch1';

const Holder3D = styled.div`
position: fixed;
top:0;
left:0;
right:0;
bottom:0;
pointer-events: none;
mix-blend-mode: multiply;
`;


const ListWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-end;
max-width: 600px;
text-align: right;
`

const Description = styled.p`
  padding: 0rem;
  padding-bottom: 0em;
  justify-content: flex-end;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  position: relative;
  font-size: 180%;
  min-width: 300px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.01em;
  text-align: left;
  line-height: 1.7em;
  margin: 0em;
  padding-top: 3em;
  flex: 1;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  color: ${props => props.theme.colors.body_color};
  justify-content: space-between;
  flex-direction: row;
  align-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  h2 {
    font-size: 180%;
    font-weight: normal;
    margin: 20px 0 0 0;
  }
`;

const Header = styled(NameHeader)`
flex: 0 0 100%;
`;


const Index = ({
  data: {
    allMdx: { edges: projectEdges },
  },
}) => (
    <Layout>
      <Holder3D>
        <ContainerDimensions>
          {parent => (
            <SketchComponent
              sketch={sketch1}
              width={parent.width}
              height={parent.height}
              sketchProps={{ value: 10 }}
            />
          )
          }
        </ContainerDimensions>
      </Holder3D>
      <Wrapper>
        <Header theme={theme} />
        <Description>
          {website.bioCV.en}
        </Description>
        <ListWrapper>
          <h2>Experiments</h2>
          <ExperimentList />
          <h2>Projects</h2>
          <ProjectList />
        </ListWrapper>
      </Wrapper>
    </Layout>
  )

export default Index

Index.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query IndexQuery {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceInstanceName: { eq: "projects" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            service
            client
            title
            cover {
              childImageSharp {
                fluid(maxWidth: 850, quality: 90, traceSVG: { color: "#f3f3f3" }) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
