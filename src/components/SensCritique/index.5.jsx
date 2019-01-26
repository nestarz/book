import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from 'components/Layout';
import { useTimeout } from 'react-use';
import { lighten, desaturate } from 'polished'

import films from '../../data/senscritique/nestarz/films/done/films_done';
import Scene from "components/Filaments/Suzanne";

const SceneFixed = styled(Scene)`
position: fixed;
top: 0;
bottom:0;
left:0;
right:0;
`;

const Content = styled.div`
background-color: black;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 30px;
color: white;
font-size: 1.2rem;
h1:first-child {
    padding-top: 0vh;
}
div {
    width: 100%;
    z-index: 1;
    display: flex;
    margin-bottom: 5px;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: center;
    & > span:first-child {
        justify-content: flex-end;
        text-align: right;
    }
    & > span {
        flex: 30%;
        padding: 0px 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}
`


const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


const Index = () => {
    films.sort((first, second) => {
        return (first.directors.length && second.directors.length) ? first.directors[0].localeCompare(second.directors[0]) : false
    });
    const filmsGroupByReal = films.reduce((r, a) => {
        r[a.directors] = r[a.directors] || [];
        r[a.directors].push(a);
        return r;
    }, Object.create(null));
    //console.log(filmsGroupByReal);
    let avgRatingPage = films.length > 0 ? films.map(obj => obj.rating)
        .reduce((a, b) => a + b) / films.length : 1;
    avgRatingPage = avgRatingPage / 9;
    return (
        <Layout>
            <Content>
                <h1>Films vus</h1>
                {/* {currentFilms.length > 0 && <SceneFixed lookAt={avgRatingPage} />} */}
                {films.length > 0 && Object.keys(filmsGroupByReal).map((key, index) =>
                    <div>
                        <span>{key.split(',').join(', ')}</span>
                        <span>
                            {filmsGroupByReal[key].map((film, i) =>
                                <span style={{ color: lighten(1-scale(film.rating, 1, 9, 0, 1), 'blue') }}>
                                    {film.frenchTitle}
                                </span>
                            )}
                        </span>
                    </div>
                )}
            </Content>
        </Layout>
    )
};

export default Index;