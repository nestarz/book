import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from 'components/Layout';

import films from '../../data/senscritique/nestarz/films/done/films_done';


const Content = styled.div`
background-color: black;
display: flex;
flex-direction: column;
flex-wrap: wrap;
justify-content: space-around;
padding: 30px;
color: white;
height: 100vh;
div {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
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


const Index = () => {
    const filmsPerPage = 20;
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
        var timerID = setInterval(changePage, 1000);
        return function cleanup() {
            clearInterval(timerID);
        };
    });

    return (
        <Layout>
            <Content>
                {currentFilms.length == 0 && <h1>Films vus</h1>}
                {currentFilms && currentFilms.map((film, i) =>
                    <div>
                        <span>{film.frenchTitle}</span>
                        <span>{film.directors.map((dir, j) => <span>{dir}</span>)}</span>
                    </div>
                )}
            </Content>
        </Layout>
    )
};

export default Index;