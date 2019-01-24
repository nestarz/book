/* eslint react/display-name: 0 */
import React, { useState } from 'react'
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
// import SpringAnimation from 'components/SpringAnimation/animation1';

const Holder3D = styled.div`
position: fixed;
top:0;
left:0;
right:0;
bottom:0;
pointer-events: none;
mix-blend-mode: multiply;
transform: rotate(90deg);
`;


const ListWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-end;
max-width: 600px;
text-align: right;
flex: 1;
font-size: 130%;
flex: 45%;
@media (max-width: 1000px), (max-device-width: 1000px) {
  font-size: 150%;
  text-align: left;
}
`

const Description = styled.p`
  margin: 0;
  max-width: 800px;
  min-width: 300px;
  font-size: 180%;
  line-height: 1.7em;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  color: ${props => props.theme.colors.body_color};
  justify-content: space-between;
  flex-direction: row;
  align-content: space-between;
  padding: 30px;
  @media (max-width: 1000px), (max-device-width: 1000px) {
    flex-wrap: wrap;
  }
  h2 {
    font-size: 180%;
    font-weight: normal;
    margin: 20px 0 0 0;
  }
  button {
    background: none;
    color: inherit;
    border: none;
      padding: 0;
      text-decoration: underline;
      font: inherit;
    cursor: pointer;
    outline: inherit;
    font-size: 1.1rem;
    display: flex;
  }
  &>div {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  &>div:first-child {
    justify-content: space-between;
  }
`;

const Header = styled(NameHeader)`
`;


const Index = ({
  data: {
    allMdx: { edges: projectEdges },
  },
}) => {
  var userLang = typeof navigator != "undefined" ? navigator.language || navigator.userLanguage : "fr";
  const [lg, setLanguage] = useState(userLang == "fr-FR" ? "fr" : "en");
  //console.log(`User's preferred language: ${userLang}, setting language to ${lg}`);
  return (
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
            // <SpringAnimation
            //   width={parent.width}
            //   height={parent.height}
            // />
          )
          }
        </ContainerDimensions>
      </Holder3D>
      <Wrapper>
        <div>
          <Header theme={theme} lg={lg} />
          <Description>
            <button onClick={() => setLanguage(lg == "fr" ? "en" : "fr")}>
              En/Fr
          </button>
            {website.bioCV[lg]}
          </Description>
        </div>
        <ListWrapper>
          <h2>{lg == "fr" ? "Expériences" : "Experiments"}</h2>
          <ExperimentList />
          <h2>{lg == "fr" ? "Projets" : "Projects"}</h2>
          <ProjectList />
        </ListWrapper>
      </Wrapper>
    </Layout>
  )
};

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
