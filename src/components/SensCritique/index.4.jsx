import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from 'components/Layout';
import { useTimeout } from 'react-use';

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
flex-wrap: wrap;
justify-content: space-around;
padding: 30px;
color: white;
height: 100vh;
font-size: 1.2rem;
div {
    flex: 1;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    span:first-child {
        justify-content: flex-end;
        text-align: right;
    }
    span {
        flex: 30%;
        padding: 0px 10px;
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
    const filmsPerPage = 1;
    const totalPages = Math.floor(films.length / filmsPerPage);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentFilms, setCurrentFilms] = useState([]);
    const [changePage, setChangePage] = useState(false);
    useEffect(() => setInterval(() => setChangePage(prevState => !prevState), 2000), []);
    useEffect(() => {
        const indexOfLastFilm = currentPage * filmsPerPage;
        const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
        const selectedFilms = films.slice(indexOfFirstFilm, indexOfLastFilm);
        setCurrentPage(currentPage == totalPages ? 0 : currentPage + 1);
        setCurrentFilms(selectedFilms);
    }, [changePage]);
    let avgRatingPage = currentFilms.length > 0 ? currentFilms.map(obj => obj.rating)
                  .reduce((a, b) => a + b ) / currentFilms.length: 1;
    avgRatingPage = avgRatingPage / 9;
    return (
        <Layout>
            <Content>
                {currentFilms.length == 0 && <h1>Films vus</h1>}
                {/* {currentFilms.length > 0 && <SceneFixed lookAt={avgRatingPage} />} */}
                {currentFilms.length > 0 && currentFilms.map((film, i) =>
                    <div>
                        <span style={{ opacity: scale(film.rating, 1, 9, 0, 1), fontWeight: Math.floor(scale(film.rating, 1, 9, 0, 600)) }}>
                            {film.frenchTitle}
                        </span>
                        <span>{film.directors.map((dir, j) => <span>{dir}</span>)}</span>
                    </div>
                )}
            </Content>
        </Layout>
    )
};

export default Index;