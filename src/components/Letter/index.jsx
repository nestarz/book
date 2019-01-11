import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { animated, Spring, config } from 'react-spring'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { Link, graphql } from 'gatsby'
import { Container, Layout, BGImage } from 'components'
import ContainerDimensions from 'react-container-dimensions'
import { PageA4 } from '../../styles/print'

import { SketchComponent } from 'components/P5js'
import sketch from 'components/P5js/projects/mainScreen/sketch4'

const Holder3D = styled.div`
  @media print {  
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 21cm;
    height: 29.7cm;
  }
  @media not print {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 21cm;
    height: 29.7cm;
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
  max-width: 55rem;
  & > div:first-child {
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: black;
    font-size: 100%;
    z-index: 0;
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

const Wrapper = styled.div`
display: flex;
justify-content: space-around;
flex: 1;
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

const CVPrint = styled.div`
width: 100%;
display: flex;
justify-content: space-around;
border-bottom: 1px solid black;
padding: 30px;
font-size: 2vw;
@media print
{   
  display: none;
}
button,a {
	background: none;
	color: inherit;
	border: none;
    padding: 0;
    text-decoration: underline;
    font: inherit;
	cursor: pointer;
	outline: inherit;
}
`;

class Nav extends React.Component {
  constructor(props) {
      super(props);
      this.print = this.print.bind(this);
  }
  
  print() {
      if (typeof window != "undefined") window.print();
  }

  render() {
      return (
          <CVPrint>
              <Link to="/">Retour</Link>
              <Link to="/cv">Aller au CV</Link>
              <button onClick={this.print}>Imprimer</button>
          </CVPrint>
      )
  };
};

const Letter = () => {
  const letter = {
    title: 'Olivier van Herpt',
    subtitle: '',
    date: '2019-01-04',
    client: 'Olivier van Herpt',
    service: 'Olivier van Herpt',
    cover: './final6.png',
    object: 'Former Deep Learning engineer and Ceramics Student Internship or Collaboration proposal',
    to: {
        name: 'Olivier van Herpt',
        email: 'info@oliviervanherpt.com',
        address:[
            'Lodewijkstraat 11',
            '5652 AC Eindhoven',
            'The Netherlands',
            ]
        },
    from: {
        lieu: "Paris",
        date: '2019-01-04',
    }
  };
  const body = <>
    <p>Hello Olivier van Herpt,</p>

    <p>I saw your works at Manufacture Bernardaud @ Limoges and I was excited to experiment and create like you did. It was awesome !</p>

    <p>Currently studying Ceramics and Object Design at Auguste Renoir in Paris, France, I'm a former Computer Vision and Deep Learning engineer. I am exploring the interaction of objects, people, art and technology using creative code, ceramics and others materials.</p>

    <p>I am trying to develop an approach that combines science and art, science and design in a process that is not classical, I want to hack things and prototype while being focused on the object, the uses and/or the political or aesthetical expression. </p>
    <p>Akin to research with artists and designers to elaborate projects and learn from them, while being expressive I wanted to know if you had any plans for internship in the end of year or if you could advise me in this area. Do not hesitate if like me you want more info! </p>

    <p>Best,</p>

    <h4>Elias Rhouzlane<br/>
    Student DNMADE Objets et Systèmes d'Objets en Céramique - Lycée Auguste Renoir<br/>
    Diplomee MSc. Computer Vision - Sorbonne Université<br/>
    eliasrhouzlane.com</h4>
  </>
  const mainContainer = <Wrapper>
    <Content type="text">
      <Spring native config={config.slow} delay={500} from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {props => (
          <InformationWrapper style={props}>
            <InfoBlock>
              <div>À {letter.to.name}</div>
              {letter.to.address.map((item, index) =>
                <div>{item}</div>
              )}
              <div>{letter.to.email}</div>
            </InfoBlock>
            <InfoBlock>
              <div>À {letter.from.lieu},</div>
              <div>Le {letter.date}</div>
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
    <Container type="text">
      <Spring native config={config.slow} delay={1000} from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {props => (
          <animated.div style={props}>
            {body}
          </animated.div>
        )}
      </Spring>
    </Container>
  </Wrapper>
  return (
    <Layout>
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
  