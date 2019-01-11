import React from 'react';
import Img from 'gatsby-image';
import ProjectNav from 'components/Navigation/ProjectNav';
import ContainerDimensions from 'react-container-dimensions'
import { SketchComponent } from 'components/P5js';
import sketch1 from 'components/P5js/projects/mainScreen/sketch1bis';
import sketch2 from 'components/P5js/projects/mainScreen/sketch3';

import * as _ from './styles';

const ProjectHeader = ({ project, postNode }) => {
    let tableOfContents = postNode.tableOfContents;
    return (
        <_.Wrapper>
            <_.HeaderWrapper>
                <_.FlexHeader>
                <_.Holder3D className="printOnly">
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
                </_.Holder3D>
                    <h1>{project.title}</h1>
                    <p>{project.subtitle ? project.subtitle : postNode.excerpt}</p>
                    <_.InformationWrapper>
                        {project.client &&
                            <_.InfoBlock>
                                <div>Où</div>
                                <div>{project.client}</div>
                            </_.InfoBlock>
                        }
                        {project.date &&
                            <_.InfoBlock>
                                <div>Date</div>
                                <div>{project.date}</div>
                            </_.InfoBlock>
                        }
                        {project.service &&
                            <_.InfoBlock>
                                <div>Pour</div>
                                <div>{project.service}</div>
                            </_.InfoBlock>
                        }
                            <_.InfoBlock className="printOnly">
                                <div>Nom</div>
                                <div>Elias Rhouzlane</div>
                            </_.InfoBlock>
                            <_.InfoBlock className="printOnly">
                                <div>Parcours</div>
                                <div>DNMADE OC</div>
                            </_.InfoBlock>
                            <_.InfoBlock className="printOnly">
                                <div>Semestre</div>
                                <div>1</div>
                            </_.InfoBlock>
                            <_.InfoBlock className="printOnly">
                                <div>Année</div>
                                <div>2018-2019</div>
                            </_.InfoBlock>
                    </_.InformationWrapper>
                </_.FlexHeader>
                <_.ImageWrapper>
                    {project.cover && project.cover.childImageSharp.fluid && <Img fluid={project.cover.childImageSharp.fluid} />}
                </_.ImageWrapper>
            </_.HeaderWrapper>
            <ProjectNav project={project} tableOfContents={tableOfContents} />
            <_.ContainerTOC>
                <_.TOC>
                    <ul>
                        {tableOfContents && tableOfContents.items && tableOfContents.items.map((heading, index) => {
                            return (
                                <li>
                                    <h3>
                                        <a href={heading.url}>{heading.title}</a>
                                    </h3>
                                </li>
                            );
                        })}
                    </ul>
                </_.TOC>
                <_.Holder3D>
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
                </_.Holder3D>
            </_.ContainerTOC>
        </_.Wrapper>
    )
}

export default ProjectHeader;