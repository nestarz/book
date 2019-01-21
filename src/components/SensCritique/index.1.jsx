import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Layout from 'components/Layout';

import films from '../../data/senscritique/nestarz/films/done/films_done';


const Content = styled.div`
text-align: justify;
span {
    margin: 0.1rem;
    display: inline-block
    position: relative;
    top: 1.2em;
    padding: 1px;
    border: 1px solid black;
}

&:before{
    content: '';
    display: block;
    width: 100%;
    margin-bottom: -1.2em;
}

&:after {
    content: '';
    display: inline-block;
    width: 100%;
}

`


const Index = () => {
    return (
        <Layout>
            <Content>
                {films.map((film, index) =>
                    <span>{film.frenchTitle}</span>
                )}
            </Content>
        </Layout>
    )
};

export default Index;