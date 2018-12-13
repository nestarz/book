import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import theme from '../../config/theme';
import LayoutWrapper from '../components/LayoutWrapper';
import Scene3D from 'components/Scenes3D/vegetal/Motif';
import ContainerDimensions from 'react-container-dimensions'
import styled from 'react-emotion';

const Wrapper = styled.div`
width: 100vw;
height: 100vh;
`;

const Index = ({}) => {
  return (
        <Wrapper>
        <ContainerDimensions>
            {
                function(parent) {
                    return (
                        <Scene3D 
                        height={parent.height}
                        width={parent.width}
                        main_color={"red"} 
                        bg_color={"white"}
                        />
                    )
                }
            }
        </ContainerDimensions>
        </Wrapper>
  )
};

export default Index;

Index.propTypes = {};
