import React, { useState } from 'react';
import styled from 'styled-components';
import Cv from 'components/CurriculumVitae';
import { PageA4 } from '../styles/print';

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
& > div {
  max-width: 60rem;
  .name {
    font-size: 160%;
  }
}
`;

const Index = () => {
    return (
        <>
            <PageA4 />
            <Wrapper>
                <p>Keep it simple, stupid.</p>
                <p>Elias Rhouzlane.</p>
                <div>
                    <p>Manger</p>
                    <p>M'identifier</p>
                    <p>Me reposer</p>
                    <p>Désirs corporels</p>
                    <p>M'exprimer</p>
                    <p>Trouver récompense</p>
                </div>
                <div>
                    <p>CV</p>
                    <p>Resume</p>
                </div>
            </Wrapper>
        </>
    )
};

export default Index;

Index.propTypes = {};