import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import theme from '../../../config/theme';
import ContainerDimensions from 'react-container-dimensions'
import styled from 'styled-components';

import Layout from 'components/Layout';
import { SketchComponent } from 'components/P5js';
import sketch from 'components/P5js/projects/decorationFloral/sketch7';

import csv from "csv/NutritionalFacts_Fruit_Vegetables_Seafood.csv";

const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

const images = importAll(
  require.context("./barcodes", false, /\.(png|jpe?g|svg)$/)
);


const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-around;
align-items: center;
flex: 1;
`;

const TilesWrapper = styled.div`
display: flex;
flex-wrap: wrap;
flex: 1;
padding: 1em;
@media (max-width: 600px), (max-device-width: 600px) {
    flex: 0 0 100%;
}
`;

const Nav = styled.nav`
flex: 1;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
padding: 1em;
h1{
    position: relative;
    color: white;
    &:before{
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0.45em;
        bottom: 0.15em;
        -webkit-transform: rotateZ(-2deg);
        -ms-transform: rotate(-2deg);
        transform: rotateZ(-2deg);
        background: #3CD670;
        z-index: -1;
    }
    z-index: 1;
    margin: 0;
}
`;

const Product = styled.div`
    position: relative;
    background: url(${props => props.backgroundUrl});
    background-size: contain;
    margin: 5px;
    color: white;
    font-weight: bold;
    font-size: 1.5em;
    text-align: center;
    flex: 1 0 auto;
    height:auto;
    width: 20%;
    /*box-shadow: inset 0 0 20px #eee, inset 0 0 20px #eee, inset 0 0 20px #eee;*/
    padding: 20px;
    border: 2px solid #3CD670;
    &:before {
        content:'';
        float:left;
        padding-top:100%;
    }
`;

const HeaderProduct = styled.div`
display: none;
`;

const BodyProduct = styled.div`
position: absolute;
top: 0; right: 0; left: 0; bottom: 0;
&.nav {
    & > div > canvas {
    transform: scale(2);
    margin-top: -50vh;
    margin-left: -23vw;
}
    z-index: -2;
}
`;

const Index = ({ }) => {
    return (
        <Layout theme={theme}>
            <Wrapper>
                <Nav>
                    <h1>Végétal</h1>
                    <h2>Décors Utiles</h2>
                    <p>
                        Le calcium ça fait grandir, les calories grossir et le sucre trembler !
                    </p>
                    <BodyProduct className="nav">
                        <ContainerDimensions>
                            {
                                function (parent) {
                                    return (
                                        <SketchComponent
                                            sketch={sketch}
                                            width={parent.width}
                                            height={parent.height}
                                            sketchProps={{ product: csv[4], color: "#3CD670" }}
                                        />
                                    )
                                }
                            }
                        </ContainerDimensions>
                    </BodyProduct>
                </Nav>
                <TilesWrapper>
                    {csv.slice(1, 17).map((object, i) => {
                        let name = object["Food and Serving"].replace(/\uFFFD/g, '');
                        let mainName = name.substr(0, name.indexOf(',')) ? name.substr(0, name.indexOf(',')) : name;
                        let subName = name.substr(0, name.indexOf(',')) ? name.split(",").pop() : "";
                        return (
                            <Product backgroundUrl={images[i + ".png"]}>
                            </Product>
                        )
                    })}
                </TilesWrapper>
            </Wrapper>
        </Layout>
    )
};

export default Index;

Index.propTypes = {};
