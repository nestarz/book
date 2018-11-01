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
                <div onClick={() => { this.setState({ value: (this.state.value + 5)%256 }) }}>
                    <Sketch
                        sketch={sketchtest}
                        width={'100%'}
                        height={'70vh'}
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
