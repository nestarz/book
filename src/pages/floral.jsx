import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import theme from '../../config/theme';
import ContainerDimensions from 'react-container-dimensions'
import styled from 'react-emotion';

import LayoutWrapper from 'components/LayoutWrapper';
import { SketchComponent } from 'components/P5js';
import sketch from 'components/P5js/projects/decorationFloral/sketch7';

import csv from "csv/NutritionalFacts_Fruit_Vegetables_Seafood.csv";
console.log(csv);

const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
flex-grow: 1;
`;

const Nav = styled.nav`
border-bottom: 1px solid #3CD670;
width: 100%;
min-height: 20px;
padding: 30px;
font-size: 200%;
display: flex;
justify-content: space-between;
p{
    margin: 0;
}
`;

const Product = styled.div`
position: relative;
flex: 1;
width: 25vw;
min-width: 200px;
margin-bottom: 60px;
h3 {
    margin-bottom: 2px;
}
ul {
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
    font-size: 10px;
    margin-bottom: 5px;
}
`;

const HeaderProduct = styled.div`
margin-right: 20%;
`;

const BodyProduct = styled.div`
width: 100%;
height: 50vh;
margin-top: 30px;
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
            <LayoutWrapper layoutType={"main"} theme={theme.light} style={{ padding: "30px" }}>
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
            </LayoutWrapper>
        </React.Fragment>
    )
};

export default Index;

Index.propTypes = {};
