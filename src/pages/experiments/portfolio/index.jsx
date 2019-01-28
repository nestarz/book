import React, { useRef, useState } from 'react';
import styled from "styled-components";
import Clock from 'components/react-live-clock/src/Component';
import Layout from "components/Layout";
import Nav from 'components/Navigation/PrintHeader'
import HelloPage from 'components/Portfolio/Hello';
import NetartPage from 'components/Portfolio/Netart';
import RenderPage from 'components/Portfolio/Render';
import DispositifPage from 'components/Portfolio/Dispositif';
import EegPage from 'components/Portfolio/Eeg';
import MindmapPage from 'components/Portfolio/Mindmap';
import { PageA3_Paysage } from '../../../styles/print';
import { convertToTesserae } from '../../../styles/fonts';

const Header = styled.div`
font-size: 1vw;
align-self: center;
margin-top: 5vw;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
@media print {
    display: none;
}
time:first-child {
    font-family: Tesserae;
    font-size:5vw;
}
span {
    transform: scale(2,1);
}
@media (max-width: 1600px) {
    time:first-child {
        font-size: 10vw;
    }
    span {
        transform: scale(2,1);
        font-size: 7vw;
    }
}
`;

const Wrapper = styled.div`
margin: 0;
padding: 0;
@media not print {
    background-color: grey;
    display: flex;
    flex-direction: column;
    padding-bottom: 5vw;
    background-color: grey;
}
`;

const Index = () => {
    var userLang = typeof navigator != "undefined" ? navigator.language || navigator.userLanguage : "fr";
    const [lg, setLanguage] = useState(userLang == "fr-FR" ? "fr" : "en");
    const clockRef = useRef();
    //const xGlyphs = convertToTesserae(x, "0123456789.");
    //const yGlyphs = convertToTesserae(y, "0123456789.");
    console.log(clockRef);
      return (
        <Layout>
            <PageA3_Paysage />
            <Wrapper>
                <Nav lg={lg} setLanguage={setLanguage} />
                <Header>
                <Clock
                        format={'SS:ss:HH:mm:ss:SS'}
                        ticking={true}
                        timezone={'Europe/Paris'}
                        interval={10} 
                        filter={(x) => convertToTesserae(x, "0123456789")} 
                    />
                <span>Portfolio</span>
                </Header>
                <HelloPage lg={lg} />
                <NetartPage lg={lg} />
                <RenderPage lg={lg} />
                <DispositifPage lg={lg} />
                <EegPage lg={lg} />
                <MindmapPage lg={lg} />
            </Wrapper>
        </Layout>
    )
};

export default Index;

Index.propTypes = {};
