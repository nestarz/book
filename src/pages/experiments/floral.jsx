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
//console.log(csv);

const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
flex-grow: 1;
`;

const Nav = styled.nav`
border-bottom: 1px solid #3CD670;
width: 100%;
min-height: 50vh;
padding: 30px;
font-size: 200%;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
font-size: 5vw;
color: red;
transform: scale(1,2);
p{
    margin: 0;
    font-size: 2.5vw;
}
`;

const Product = styled.div`
position: relative;
flex: 25%;
height: 25vw;
border: 0.5vw solid black;
padding: 0px;
`;

const HeaderProduct = styled.div`
width:24vw;
overflow: hidden;
height:24vw;
    color: red;
h3 {
    margin: 0;
    margin-top: 10%;
    font-size: 5vw;
    transform: scale(1,3);
    word-break: break-word;
    text-transform: uppercase;
    letter-spacing: -0.15em;

}
ul {
    display: none;
    padding: 0;
    list-style-type: none;
    margin: 0;
    li {
        margin: 0;
        display: flex;
        justify-content: space-between;
    }
}
p {
    display: none;
    font-size: 10px;
    margin-bottom: 5px;
}
`;

const BodyProduct = styled.div`
position: absolute;
top:0;
bottom:0;
right:0;
left:0;
mix-blend-mode: darken;
background-color: white;
`;

const Index = ({ }) => {
    return (
        <React.Fragment>
            <Nav>
                <span><strong>Végétal, Projet Décors Utiles</strong> | Motif #1</span>
                <p>
                    Le calcium ça fait grandir 😍, les calories grossir 😱 et le sucre trembler 🤢 !
                </p>
            </Nav>
            <Layout theme={theme} style={{ padding: "30px" }}>
                <Wrapper>
                    {csv.slice(1, -16).map((object, i) => {
                        let name = object["Food and Serving"].replace(/\uFFFD/g, '');
                        let mainName = name.substr(0, name.indexOf(',')) ? name.substr(0, name.indexOf(',')) : name;
                        let subName = name.substr(0, name.indexOf(',')) ? name.split(",").pop() : "";
                        return (
                            <Product>
                                <HeaderProduct>
                                <h3>{mainName}</h3>
                                <p>{subName}</p>
                                <ul>
                                    <li><span>Calcium</span> {object["Calcium"]}</li>
                                    <li><span>Calories</span> {object["Calories"]}</li>
                                    <li><span>Sugars</span> {object["Sugars"] ? object["Sugars"] : "0"}</li>
                                    <li><span>Vitamin A</span> {object["Vitamin A"] ? object["Vitamin A"] : "0"}</li>
                                    <li><span>Vitamin C</span> {object["Vitamin C"] ? object["Vitamin C"] : "0"}</li>
                                </ul>
                                </HeaderProduct>
                                <BodyProduct>
                                    <ContainerDimensions>
                                        {
                                            function (parent) {
                                                return (
                                                    <SketchComponent
                                                        sketch={sketch}
                                                        width={parent.width}
                                                        height={parent.height}
                                                        sketchProps={{ product: object }}
                                                    />
                                                )
                                            }
                                        }
                                    </ContainerDimensions>
                                </BodyProduct>
                            </Product>
                        )
                    })}
                </Wrapper>
            </Layout>
        </React.Fragment>
    )
};

export default Index;

Index.propTypes = {};
