import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import ContainerDimensions from 'react-container-dimensions'

import theme from '../../../config/theme';
import { siteUrl2, email, schools, bioCV, works, skills } from '../../../config/website';
import NameHeader from 'components/Navigation/NameHeader';
import Layout from 'components/Layout';
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

const NameHeaderCv = styled(NameHeader)`
a {
    font-size: 100%;
}
.name a {
    font-size: 100%;
}
`;

const Index = (props) => {
    var userLang = typeof navigator != "undefined" ? navigator.language || navigator.userLanguage: "fr";
    const [lg, setLanguage] = useState(props.lg ? props.lg : userLang == "fr-FR" ? "fr" : "en");
    if (props.lg != lg && props.lg) setLanguage(props.lg ? props.lg : lg);
    //console.log(`User's preferred language: ${userLang}, setting language to ${lg}`);
    return (
        <Wrapper addCSS={props.addCSS}>
            <Layout navType={"front"} layoutType={"main"} theme={theme.light}>
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

                        <NameHeaderCv lg={lg} />
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
                                <a className={"email"} href={"mailto:" + email}>{email}</a><br />
                                {siteUrl2}
                            </p>
                        </div>
                        <div>
                            <h1>{lg == "fr" ? 'Langages' : 'Languages'}</h1>
                            <ul>
                                {skills.languages.map((language, index) => {
                                    return (
                                        <li key={index}>{lg == "fr" ? language.name.fr : language.name.en} ({lg == "fr" ? language.score.fr : language.score.en})</li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div>
                            <h1>{lg == "fr" ? 'Compétences' : 'Skills'}</h1>
                            <h2>{lg == "fr" ? 'Principales compétences' : 'Main skills'}</h2>
                            <ul>
                                {skills.main.map((skill, index) => {
                                    return (
                                        <li key={index}>{lg == "fr" ? skill.fr : skill.en}</li>
                                    );
                                })}
                            </ul>
                            <h2>{lg == "fr" ? 'Design et Céramique' : 'Ceramic Design'}</h2>
                            <ul>
                                {skills.ceramicsAndDesign.map((skill, index) => {
                                    return (
                                        <li key={index}>{lg == "fr" ? skill.fr : skill.en}</li>
                                    );
                                })}
                            </ul>
                            <h2>{lg == "fr" ? 'Informatique' : 'Computer Science'}</h2>
                            <ul>
                                {skills.computerScience.map((skill, index) => {
                                    return (
                                        <li key={index}>{skill}</li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div>
                            <h1>{lg == "fr" ? 'Publications' : 'Publications'}</h1>
                            <ul>
                                {skills.publications.map((publication, index) => {
                                    return (
                                        <li key={index}><a className="noDecor" href="{publication.url}">{lg == "fr" ? publication.title.fr : publication.title.en}</a></li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <p className="bio">{lg == "fr" ? bioCV.fr : bioCV.en}</p>
                        <h1>{lg == "fr" ? 'Éducation' : 'Education'}</h1>
                        {schools.map((school, index) => {
                            return (
                                <WorkExperience key={index}>
                                    <p className="date">{school.from} {school.to ? "—" : ""} {school.to}</p>
                                    <div>
                                        <p style={{ marginBottom: 0 }}><span style={{ fontSize: "120%" }}>{lg == "fr" ? school.title.fr : school.title.en}</span></p>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1em" }}><div>{school.etablishment}</div><div style={{textAlign: 'right', alignSelf: 'stretch'}}>{school.location}</div></div>
                                        <p className="description">{school.description && (lg == "fr" ? school.description.fr : school.description.en)}</p>
                                    </div>
                                </WorkExperience>
                            );
                        })}
                        <h1>{lg == "fr" ? 'Éxpérience' : 'Work Experience'}</h1>
                        {works.map((work, index) => {
                            return (
                                <WorkExperience key={index}>
                                    <p className="date">{work.from} {work.to ? "—" : ""} {work.to}</p>
                                    <div>
                                        <p style={{ marginBottom: 0 }}><span style={{ fontSize: "120%" }}>{lg == "fr" ? work.title.fr : work.title.en}</span></p>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1em"}}><div>{work.etablishment}</div><div style={{textAlign: 'right', alignSelf: 'stretch'}}>{work.location}</div></div>
                                        <p className="description">{work.description && (lg == "fr" ? work.description.fr : work.description.en)}</p>
                                    </div>
                                </WorkExperience>
                            );
                        })}
                    </div>
                </IndexWrapper>
            </Layout>
        </Wrapper>
    )
};

export default Index;
