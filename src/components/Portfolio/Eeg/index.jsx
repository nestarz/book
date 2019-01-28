import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import { Wrapper, Info } from '../styles';
import { randomTesseraeString } from '../../../styles/fonts';
import eeg7 from "./img/DSC04325.jpg";
import eeg4 from "./img/DSC04398.jpg";
import eeg3 from "./img/DSC04416.jpg";
import eeg2 from "./img/DSC04437.jpg";
import eeg5 from "./img/DSC04411.jpg";
import eeg1 from "./img/DSC04422.jpg";
import eeg6 from "./img/DSC04413.jpg";

const LocalWrapper = styled(Wrapper)`
& > img:nth-child(2n + 1) {
    &:hover {
        filter: none;
    }
    filter: saturate(0)
}
& > img:nth-child(2n):hover {
    filter: saturate(0)
}
.info1 {
    grid-column: 2;
    grid-row: 1 / 4;
    &:after {
        content: "${randomTesseraeString(1)}";
    }
}
.info2 {
    grid-column: 3;
    grid-row: 2 / 4;
    &:after {
        content: "${randomTesseraeString(1)}";
    }
}
`;

const protocol = {
    "fr": <>
        <h1>Nouveau protocole</h1>
        Contrairement aux études précédentes qui utilisaient des questionnaires pour évaluer la frustration, nous proposons un nouveau protocole dans lequel nous induisons de la frustration lors d’une tâche d’apprentissage. Les participants ont été invités à réaliser une tâche d’orientation 3D dans un environnement peu frustrant ou très frustrant. Nous avons ensuite comparé la réponse neurophysiologique entre les deux conditions pour trouver le corrélat de la frustration.
    </>,
    "en": <>
        <h1>New protocol</h1>
        Contrary to previous studies which have used questionnaires to assess frustration, we propose a new protocol where we induce frustration during a learning task. Participants were asked to achieve a 3D orientation task in a low or highly frustrative environment. We then compared the neurophysiological response between the two conditions to find the correlate of frustration.
    </>
}

const frustration = {
    "fr": <>
        <h1>Detection de la frustration</h1>
        Le but de cette étude est de déterminer quels changements se produisent lorsqu'un participant éprouve de la frustration lorsqu'il termine une tâche d'apprentissage. Nous avons mesuré le comportement individuel et les marqueurs neurophysiologiques en corrélation avec le niveau de frustration.
    </>,
    "en": <>
        <h1>Frustration detection</h1>
        The purpose of this study is to determine what changes occur when a participant experiences frustration when completing a learning task. We measured individual behaviour and neurophysiological markers correlated with frustration level.
    </>
}

const Index = ({ lg = "fr" }) => {
    return (
        <LocalWrapper>
            <img src={eeg1} />
            <img src={eeg2} />
            <img src={eeg3} />
            <img src={eeg4} />
            <img src={eeg5} />
            <img src={eeg6} />
            <img src={eeg7} />
            <Info className="info1">
                {protocol[lg]}
            </Info>
            <Info className="info2">
                {frustration[lg]}
            </Info>
        </LocalWrapper>
    )
};

export default Index;

Index.propTypes = {};
