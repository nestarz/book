import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import ContainerDimensions from 'react-container-dimensions'
import Layout from 'components/Layout';
import { FaInstagram, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { SketchComponent } from 'components/P5js';
import QRCode from 'qrcode.react';
import config from '../../../config/website';
import sketch1 from 'components/P5js/projects/mainScreen/sketch1';
import sketch2 from 'components/P5js/projects/mainScreen/sketch1bis';
import sketch3 from 'components/P5js/projects/mainScreen/sketch2';
import sketch4 from 'components/P5js/projects/mainScreen/sketch3';
import sketch5 from 'components/P5js/projects/mainScreen/sketch4';
// import Scene3D from 'components/3D/threejs-scenes/cube';

const VisitCard = styled.div`
width: 85mm;
height: 55mm;
background-color: #fff;
word-wrap: break-word;
padding: 5mm;
display: flex;
flex-direction: column;
justify-content: space-between;
position: relative;
font-size: 10pt;
&.recto {
    transform: rotate(180deg);
}
`;

const NameHeader = styled.div`
mix-blend-mode: multiply;
color: ${props => props.theme.brand.primary};
max-width: 60%;
font-weight: 500;
`;

const Contact = styled.div`
font-size: 8pt;
`;

const SketchContainer = styled.div`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
mix-blend-mode: multiply;
pointer-events: none;
`;

const SocialMedia = styled.div`
  display: flex;
  flex: 1;
  width: 47%;
  margin-bottom: 1%;
  a {
      color: #111;
      margin-right: 5pt;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding: 0 0rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    order: 3;
  }
`

const Wrapper = styled.div`
${props => props.addCSS}
`;

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

    print = () => {
        if (typeof window != "undefined") window.print();
    }

    render() {
        let sketches = [sketch1, sketch2, sketch3, sketch4, sketch5]
        let selectedSketch = sketches[this.props.mode % sketches.length];
        console.log("addCSS-visitCard", this.props.addCSS);
        return (
            <Wrapper addCSS={this.props.addCSS}>
                <VisitCard className={"verso"}>
                    <SketchContainer>
                        <ContainerDimensions>
                            {parent => (
                                <SketchComponent
                                    sketch={selectedSketch}
                                    width={parent.width}
                                    height={parent.height}
                                    sketchProps={{ value: 0 }}
                                    watchedVal={this.props.mode}
                                />
                            )
                            }
                        </ContainerDimensions>
                    </SketchContainer>
                    <NameHeader>
                        {config.author}, <br /> {config.authorTitle[this.props.lg ? this.props.lg : "fr"]}
                    </NameHeader>
                    <Contact>
                        <SocialMedia>
                            <a
                                href="https://www.instagram.com/eliasrhouzlane"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </a>
                            <a href="https://www.behance.net/eliasrhouzlane" target="_blank" rel="noopener noreferrer" aria-label="Behance">
                                <FaGithub />
                            </a>
                            <a href="https://www.behance.net/eliasrhouzlane" target="_blank" rel="noopener noreferrer" aria-label="Behance">
                                <FaLinkedin />
                            </a>
                            <a href="https://dribbble.com/eliasrhouzlane" target="_blank" rel="noopener noreferrer" aria-label="Dribbble">
                                <FaTwitter />
                            </a>
                        </SocialMedia>
                        <div>eliasrhouzlane<span style={{ fontSize: "80%" }}>(@</span>gmail<span style={{ fontSize: "80%" }}>)</span>.com</div>
                        <div>{this.props.lg == "fr" ? "0" : "+33"}6 20 40 62 67</div>
                    </Contact>
                </VisitCard>
                <VisitCard className={"recto"}>
                    <SketchContainer>
                        <ContainerDimensions>
                            {parent => (
                                <SketchComponent
                                    sketch={selectedSketch}
                                    width={parent.width}
                                    height={parent.height}
                                    sketchProps={{ value: 0 }}
                                    watchedVal={this.props.mode}
                                />
                            )
                            }
                        </ContainerDimensions>
                    </SketchContainer>
                    {/* <SketchContainer>
                                <ContainerDimensions>
                                    {parent => (
                                        <Scene3D 
                                        height={parent.height}
                                        width={parent.width}
                                        main_color={"#000000"} 
                                        bg_color={"#ffffff"}
                                        />
                                    )
                                    }
                                </ContainerDimensions>
                            </SketchContainer> */}
                    <QRCode value={config.siteUrl}
                        size={59}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"H"}
                        includeMargin={true}
                        renderAs={"svg"} />
                </VisitCard>
            </Wrapper>
        )
    };
};
export default Index;
