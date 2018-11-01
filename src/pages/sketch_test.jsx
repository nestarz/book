import React from 'react';
import Helmet from 'react-helmet';
import LayoutWrapper from '../components/LayoutWrapper';
import sketchtest from '../components/P5_Sketches';
import { Sketch } from '../../plugins/p5-react/src/components/sketch';
import config from '../../config/website';
import theme from '../../config/theme';

class SketchApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: 0 };
    }
    render() {
        return (
            <LayoutWrapper layoutType={"main"} theme={theme.light}>
                <Helmet title={`Sketch1 | ${config.siteTitle}`} />
                <div style={{ width: '100%', height: '100%' }} onClick={() => { this.setState({ value: (this.state.value + 5)%256 }) }}>
                    <p>
                        A simple demonstration of how this component wrapper for p5 works. See <a href='https://github.com/JobLeonard/p5-react'>source code on github</a> for more information.
                    </p>
                    <Sketch
                        sketch={sketchtest}
                        width={'80%'}
                        height={'80%'}
                        sketchProps={{ value: this.state.value}}
                    />
                    <p>
                        Click to change current value being passed as a prop to the sketch: {this.state.value}
                    </p>
                </div>
            </LayoutWrapper>
            );
        }
    }
export default SketchApp;
