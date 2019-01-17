import React, { useState } from 'react';
import VisitCard from 'components/VisitCard';
import Layout from 'components/Layout';
import { PageVisitCard } from '../../styles/print';
import { Link } from 'gatsby';
import styled from 'styled-components';
import _ from 'lodash';

const Wrapper = styled.div`
    @media not print{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        flex-wrap: wrap;
        & > div {
            margin: 5mm;
            & > div {
                border: 1px solid black;
                margin: 5mm;
            }
        }
    }
`;

export const CVPrint = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;  
    padding: 5mm;
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

function Index() {
    const [mode, setCount] = useState(0);
    var userLang = typeof navigator != "undefined" ? navigator.language || navigator.userLanguage: "fr";
    const [lg, setLanguage] = useState(userLang == "fr-FR" ? "fr" : "en");
    //console.log(`User's preferred language: ${userLang}, setting language to ${lg}`);
    return (
        <>
            <PageVisitCard />
            <Layout>
                <CVPrint>
                    <button onClick={() => setLanguage(lg == "fr" ? "en" : "fr")}>
                        En/Fr
                        </button>
                    <button onClick={() => setCount(mode + 1)}>
                        Changer la version
                        </button>
                    <button onClick={() => window.print()}>
                        Imprimer
                        </button>
                </CVPrint>
                <Wrapper>
                    {_.times(3, i => {
                        return (
                            <VisitCard key={i} mode={mode} lg={lg} />
                        )
                    })}
                </Wrapper>
            </Layout>
        </>
    )
};

export default Index;

Index.propTypes = {};