import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from 'components/Layout';

import films from '../../data/senscritique/nestarz/films/done/films_done';

const Content = styled.div`
background-color: white;
display: flex;
flex-direction: column;
flex-wrap: wrap;
justify-content: space-around;
padding: 30px;
color: blue;
height: 100vh;
font-size: 1.2rem;
div {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    span:first-child {
        justify-content: flex-end;
        text-align: right;
    }
    span {
        flex-basis: auto;
        flex-grow: 1;
        min-width: 200px;
        padding: 0px 10px;
    }
}
h1 {
    font-size: 20vmax;
}
`

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const groupByKey = (array, key) => array.reduce(function (r, a) {
    r[a[key]] = r[a[key]] || [];
    r[a[key]].push(a);
    return r;
}, Object.create(null));

const Index = () => {
    const filmsPerPage = 10;
    const totalPages = Math.floor(films.length / filmsPerPage);
    let [currentPage, setCurrentPage] = useState(0);
    let [currentFilms, setCurrentFilms] = useState([]);
    const changePage = () => {
        const indexOfLastFilm = currentPage * filmsPerPage;
        const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
        const selectedFilms = films.slice(indexOfFirstFilm, indexOfLastFilm);
        setCurrentPage(currentPage == totalPages ? 0 : currentPage + 1);
        setCurrentFilms(selectedFilms);
    }
    useEffect(() => {
        var timerID = setInterval(changePage, 3000);
        return function cleanup() {
            clearInterval(timerID);
        };
    });

    const currentGroups = groupByKey(currentFilms, "year");
    return (
        <Layout>
            <Content>
                {currentGroups && Object.keys(currentGroups).map((currentGroupKey, i) => {
                    return (
                        <div>
                            <h2>{currentGroupKey}</h2>
                            {currentGroups[currentGroupKey].map((film, j) =>
                                <div style={{ opacity: scale(film.rating, 1, 9, 0, 1), fontWeight: Math.floor(scale(film.rating, 1, 9, 0, 600)) }}>
                                    <span>{film.frenchTitle}</span>
                                </div>
                            )}
                        </div>
                    )
                })}
            </Content>
        </Layout>
    )
};

export default Index;