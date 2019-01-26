import React from 'react';
import styled from "styled-components";
import Clock from 'react-live-clock';
import Layout from "components/Layout";
import Nav from 'components/Navigation/PrintHeader'
import HelloPage from 'components/Portfolio/Hello';
import NetartPage from 'components/Portfolio/Netart';
import RenderPage from 'components/Portfolio/Render';
import DispositifPage from 'components/Portfolio/Dispositif';
import EegPage from 'components/Portfolio/Eeg';
import MindmapPage from 'components/Portfolio/Mindmap';
import { PageA3_Paysage } from '../../../styles/print';

const Header = styled.div`
font-size: 5vw;
align-self: center;
margin-top: 5vw;
@media print {
    display: none;
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
    return (
        <Layout>
            <PageA3_Paysage />
            <Wrapper>
                <Nav />
                <Header>
                    <Clock
                        format={'SS:HH:mm:ss:SS'}
                        ticking={true}
                        timezone={'Europe/Paris'}
                        interval={10} />
                </Header>
                <HelloPage />
                <NetartPage />
                <RenderPage />
                <DispositifPage />
                <EegPage />
                <MindmapPage />
            </Wrapper>
        </Layout>
    )
};

export default Index;

Index.propTypes = {};
