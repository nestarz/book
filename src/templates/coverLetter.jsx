import React from 'react';
import theme from '../../config/theme';
import styled from 'react-emotion';

import LayoutWrapper from 'components/LayoutWrapper';
import { RotateOne as Scene3D } from '../components/Scenes3D';
import ContainerDimensions from 'react-container-dimensions'
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';

import { SketchComponent } from 'components/P5js';
import sketch1 from 'components/P5js/projects/mainScreen/sketch4';
import { graphql } from 'gatsby';


const Holder3D = styled.div`
@media print
{  
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
`;

const Double = styled.div`
position: relative;
max-width: 900px;
margin: auto;
@media print
{  
    max-width: 100%;
}
aside p {
  }
  h3 {
      font-weight: 200;
      font-size: 200%;
  }
& > div:first-child {
    display: block;
    position:absolute;
    top: 1px;
    color: black;
    font-size: 100%;
    z-index: -1;
}
& > div:last-child {
    display: block;
    color: white;
    mix-blend-mode: overlay;
    z-index: 1;
}
`;

const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
isolation: isolate;
flex-grow: 1;
flex-direction: column;
justify-content: space-between;
padding: 30px;
aside {
    display: flex;
    justify-content: space-between;
    div {
        align-self: flex-end;
    }
    p {
        margin: 0;
    }
    margin-bottom: 20px;
}
@page {
    size: 21cm 29.7cm;   /*A4*/
    margin: 10mm; /*webkit says no*/
}
@media print
{  
    max-width: 100%;
    height: 100%;
    font-size: 12pt;
    padding: 0;
}
`;
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

const CoverLetter = ({ pageContext: { id }, data: { mdx: postNode } }) => {
    const letter = postNode.frontmatter;
    const tableOfContents = postNode.tableOfContents;
    return (
        <LayoutWrapper layoutType={"main"} theme={theme.light}>
            <Helmet>
                <style type="text/css">{`
                        @page {
                            size: 21cm 29.7cm;   /*A4*/
                            margin: 10mm; /*webkit says no*/
                        }
                        @media print
                        {  
                        
                        aside {
                            display: none;
                        }
                        }
                        @media print {

                        html, body {
                            height:100%; 
                            margin: 0 !important; 
                            padding: 0 !important;
                            overflow: hidden;
                        }
                        }
                    `}</style>
            </Helmet>
            <Nav />
            <Double>
                {[0].map((item, index) => {
                    return (
                        <Wrapper>
                            <aside>
                                <div>
                                    <p>À {letter.to.name}</p>
                                    {letter.to.address.map((item, index) => {
                                        return (
                                            <p>{item}</p>
                                        );
                                    })}
                                    <p>{letter.to.email}</p>
                                </div>
                                <div>
                                    <p>À {letter.from.lieu},</p>
                                    <p>Le {letter.date}</p>
                                </div>
                            </aside>
                            <h3>{letter.object}</h3>
                            <article></article>
                            <MDXRenderer>
                                {postNode.code.body}
                            </MDXRenderer>
                        </Wrapper>
                    )
                })}
                <Holder3D>
                    <ContainerDimensions>
                        {parent => (
                            // <Scene3D 
                            //   height={parent.height}
                            //   width={parent.width}
                            //   main_color={theme.light.brand.primary} 
                            //   bg_color={theme.light.colors.bg_color}
                            // />
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
                    <aside>
                        <div>
                            <p>À {letter.to.name}</p>
                            {letter.to.address.map((item, index) => {
                                return (
                                    <p>{item}</p>
                                );
                            })}
                            <p>{letter.to.email}</p>
                        </div>
                        <div>
                            <p>À {letter.from.lieu},</p>
                            <p>Le {letter.date}</p>
                        </div>
                    </aside>
                    <h3>{letter.object}</h3>
                    <article></article>
                    <MDXRenderer>
                        {postNode.code.body}
                    </MDXRenderer>
                </Wrapper>
            </Double>
        </LayoutWrapper>
    )
};

export default CoverLetter;

CoverLetter.propTypes = {};

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      excerpt(pruneLength: 60)
      code {
        body
      }
      tableOfContents
      frontmatter {
        object
        title
        date(formatString: "DD.MM.YYYY")
        client
        wip
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
`;
