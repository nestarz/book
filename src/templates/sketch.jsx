import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import config from '../../config/website';
import theme from '../../config/theme';
import { Layout, P5Wrapper } from 'components';
import { files } from "../../content/sketches";

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    z-index:-1;
`;

const Sketch = ({ data }) => {
    console.log(data, data.file.name, files[data.file.name]);
    return (
        <Layout theme={theme.dark} withFooter={true}>
            <Helmet title={`${data.file.name} | ${config.siteTitle}`} />
            <Helmet>
            <style type="text/css">{`
                body {
                    background-color : ${theme.dark.colors.bg_color};
                }
            `}</style>
            </Helmet>
            <Wrapper>
                <P5Wrapper sketch={files[data.file.name]} theme={theme}/>
            </Wrapper>
        </Layout>
    )
};

export default Sketch;

export const query = graphql`
	query( $name: String! ) {
		file (name: { eq: $name } ) {
			name
		}
	}
`