import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { animated, Spring, config } from 'react-spring'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { Link, graphql } from 'gatsby'
import { Container, Layout, BGImage } from 'components'
import ContainerDimensions from 'react-container-dimensions'
import { PageA4 } from '../styles/print'
import Nav from 'components/Navigation/PrintHeader'
import VisitCard from 'components/VisitCard';

import { SketchComponent } from 'components/P5js'
import sketch from 'components/P5js/projects/mainScreen/sketch4'

const CardCSS = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .recto,
    .verso {
        margin: -10px 0mm;
        border: 1px solid #222;
    }
    .recto {
      display: none;
    }
`;

const VisitCardHolder = styled.div`
margin: 0 auto;
position: relative;
width: 55rem;
@media not print {
margin-bottom: 10mm;
}
`;

const Holder3D = styled.div`
  @media print {  
    width: 21cm;
    height: 29.7cm;
  }
  @media not print {
    top: 0%;    
    bottom: 0;
    left: -170%;
    right: 0;
    width: 21cm;
    height: 29.7cm;
    filter: contrast(0);
  }
  position: absolute;
  pointer-events: none;
  transform: rotate(180deg);
  z-index: 0;
  margin: auto;
`;

const Double = styled.div`
  margin: 0 auto;
  position: relative;
  max-width: 52rem;
  font-size: 200%;
  a {
    color: inherit !important;
    text-decoration: underline;
  }
  @media print {  
    a {
      color: inherit !important;
    }
  }
  & > div:first-child {
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: black;
    z-index: -1;
    margin: auto;
  }
  & > div:last-child {
    flex: 1;
    top: 0;
    color: white;
    mix-blend-mode: overlay;
    z-index: 1;
    margin: auto;
    
  }
`

const Content = styled(Container)`
  @media not print {
    margin-top: 2rem;
  }
  display: flex;
  flex-direction: column;
  flex: none; /*Try 1,none*/
  margin-left: 0;
  margin-right: 0;
`

const LetterContent = styled.div`
p{
  font-size: 1.3rem;
}
`


const Wrapper = styled.div`
display: flex;
justify-content: space-around;
flex: 1;
@media not print {
  @media (max-width: 60rem), (max-device-width: 60rem) {
    padding: 0 2rem;
  }
}
flex-direction: column; /*Try column,row*/
height:100%;
& > div:last-child {
  flex: 9999;
}
`;

const InformationWrapper = styled(animated.div)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Title = styled(animated.h1)`
  margin-top: 0;
  font-weight: 200;
  font-size: 160%;
`

const InfoBlock = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

const Letter = ({ pageContext: { slug }, data: { mdx: postNode } }) => {
  var userLang = typeof navigator != "undefined" ? navigator.language || navigator.userLanguage : "fr";
  const [lg, setLanguage] = useState(userLang == "fr-FR" ? "fr" : "en");
  const letter = postNode.frontmatter;
  const mainContainer = <Wrapper>
    <Content type="text">
      <Spring native config={config.slow} delay={500} from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {props => (
          <InformationWrapper style={props}>
            <InfoBlock>
              <div>{lg=="fr" ? "À" : ""} {letter.to.name}</div>
              {letter.to.address.map((item, index) =>
                <div>{item}</div>
              )}
              <div>{letter.to.email}</div>
            </InfoBlock>
            <InfoBlock>
              <div>{lg=="fr" ? "À" : ""} {letter.from.lieu},</div>
              <div>{lg=="fr" ? "Le" : ""} {letter.date}</div>
            </InfoBlock>
          </InformationWrapper>
        )}
      </Spring>
      <Spring
        native
        config={config.slow}
        from={{ opacity: 0, transform: 'translate3d(0, -30px, 0)' }}
        to={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
      >
        {props => (
          <Title data-testid="letter-title" style={props}>
            {letter.object}
          </Title>
        )}
      </Spring>
    </Content>
    <LetterContent type="text">
      <Spring native config={config.slow} delay={1000} from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {props => (
          <animated.div style={props}>
            <MDXRenderer>{postNode.code.body}</MDXRenderer>
          </animated.div>
        )}
      </Spring>
    </LetterContent>
  </Wrapper>
  return (
    <Layout>
      <PageA4 />
      <Nav setLanguage={setLanguage} lg={lg} />
      {/* <SEO postPath={slug} postNode={postNode} postSEO /> */}
      <>
        <Double>
          {mainContainer}
          <Holder3D>
            <ContainerDimensions>
              {parent => (
                <SketchComponent
                  sketch={sketch}
                  width={parent.width}
                  height={parent.height}
                  sketchProps={{ value: 10 }}
                />
              )
              }
            </ContainerDimensions>
          </Holder3D>
          {mainContainer}
        </Double>
        {/* <VisitCardHolder>
          <VisitCard addCSS={CardCSS} mode={4} />
        </VisitCardHolder> */}
      </>
    </Layout>
  )
}

export default Letter

Letter.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
  }).isRequired,
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      code {
        body
      }
      tableOfContents
      frontmatter {
        object
        title
        date(formatString: "DD.MM.YYYY")
        client
        service
        subtitle
        to {
            name
            address
            email
        }
        from {
            lieu
            date
        }
      }
    }
  }
`
