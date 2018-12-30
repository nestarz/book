import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
//import { SketchComponent, Sketch1 } from 'components/P5js';
import theme from '../../../config/theme';
import { siteUrl2, email, schools, bioCV, works, skills } from '../../../config/website';
import Navigation from 'components/Navigation';
import LayoutWrapper from 'components/LayoutWrapper';
import ContainerDimensions from 'react-container-dimensions'

import { SketchComponent } from 'components/P5js';
import sketch1 from 'components/P5js/projects/mainScreen/sketch2';
import sketch2 from 'components/P5js/projects/mainScreen/sketch3';
import {
    CVPrint,
    Holder3D,
    IndexWrapper,
    WorkExperience,
    Wrapper
} from "./styles"

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    render() {
        //console.log(skills);
        return (
            <Wrapper>
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
                <CVPrint>
                    <Link to="/">{this.state.isToggleOn ? 'Retour' : 'Back'}</Link>
                    <button onClick={window.print}>{this.state.isToggleOn ? 'Imprimer CV' : 'Print CV'}</button>
                    <button onClick={this.handleClick}>
                        {this.state.isToggleOn ? 'Go to English Version' : 'Aller vers la Version française'}
                    </button>
                      </CVPrint>
                <LayoutWrapper navType={"front"} layoutType={"main"} theme={theme.light}>
                    <IndexWrapper>
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
                        <div className="left" style={{ position: "relative" }}>

                            <Navigation navType={"front"} theme={theme.light} />
                            <Holder3D>
                                    <ContainerDimensions>
                                        {parent => (
                                            <SketchComponent
                                                sketch={sketch2}
                                                width={parent.width}
                                                height={parent.height}
                                                sketchProps={{ value: 10 }}
                                            />
                                        )
                                        }
                                    </ContainerDimensions>
                                </Holder3D>
                            <div>
                                <p>
                                    {email}<br />
                                    {siteUrl2}<br />
                                </p>
                            </div>
                            <div>
                                <h1>{this.state.isToggleOn ? 'Langages' : 'Languages'}</h1>
                                <ul>
                                    {skills.languages.map((language, index) => {
                                        return (
                                            <li>{this.state.isToggleOn ? language.name.fr : language.name.en} ({this.state.isToggleOn ? language.score.fr : language.score.en})</li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div>
                                <h1>{this.state.isToggleOn ? 'Compétences' : 'Skills'}</h1>
                                <h2>{this.state.isToggleOn ? 'Principales compétences' : 'Main skills'}</h2>
                                <ul>
                                    {skills.main.map((skill, index) => {
                                        return (
                                            <li>{this.state.isToggleOn ? skill.fr : skill.en}</li>
                                        );
                                    })}
                                </ul>
                                <h2>{this.state.isToggleOn ? 'Design et Céramique' : 'Ceramic Design'}</h2>
                                <ul>
                                    {skills.ceramicsAndDesign.map((skill, index) => {
                                        return (
                                            <li>{this.state.isToggleOn ? skill.fr : skill.en}</li>
                                        );
                                    })}
                                </ul>
                                <h2>{this.state.isToggleOn ? 'Informatique' : 'Computer Science'}</h2>
                                <ul>
                                    {skills.computerScience.map((skill, index) => {
                                        return (
                                            <li>{skill}</li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div>
                                <h1>{this.state.isToggleOn ? 'Publications' : 'Publications'}</h1>
                                <ul>
                                    {skills.publications.map((publication, index) => {
                                        return (
                                            <li><a className="noDecor" href="{publication.url}">{this.state.isToggleOn ? publication.title.fr : publication.title.en}</a></li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <p className="bio">{this.state.isToggleOn ? bioCV.fr : bioCV.en}</p>
                            <h1>{this.state.isToggleOn ? 'Éducation' : 'Education'}</h1>
                            {schools.map((school, index) => {
                                return (
                                    <WorkExperience>
                                        <p className="date">{school.from} {school.to ? "—" : ""} {school.to}</p>
                                        <div>
                                            <p style={{ marginBottom: 0 }}><span style={{ fontSize: "120%" }}>{this.state.isToggleOn ? school.title.fr : school.title.en}</span></p>
                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}><div>{school.etablishment}</div><div>{school.location}</div></div>
                                            <p className="description">{school.description && (this.state.isToggleOn ? school.description.fr : school.description.en)}</p>
                                        </div>
                                    </WorkExperience>
                                );
                            })}
                            <h1>{this.state.isToggleOn ? 'Éxpérience' : 'Work Experience'}</h1>
                            {works.map((work, index) => {
                                return (
                                    <WorkExperience>
                                        <p className="date">{work.from} {work.to ? "—" : ""} {work.to}</p>
                                        <div>
                                            <p style={{ marginBottom: 0 }}><span style={{ fontSize: "120%" }}>{this.state.isToggleOn ? work.title.fr : work.title.en}</span></p>
                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}><div>{work.etablishment}</div><div>{work.location}</div></div>
                                            <p className="description">{work.description && (this.state.isToggleOn ? work.description.fr : work.description.en)}</p>
                                        </div>
                                    </WorkExperience>
                                );
                            })}
                        </div>
                    </IndexWrapper>
                </LayoutWrapper>
            </Wrapper>
        )
    };
};
export default Index;
