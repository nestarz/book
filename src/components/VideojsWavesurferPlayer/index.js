import React from 'react';
import styled from 'react-emotion';

import theme from '../../../config/theme';

import 'video.js/dist/video-js.css';
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';

const VjsPlayer = styled.div`
column-span: all;
position: relative;
right: 0;
margin: 0px;
height: calc(150px + 30px);
.video-js.vjs-16-9 {
    padding-top: 150px;
}

.video-js .vjs-control-bar {
    background-color: ${props => props.theme.colors.white};
}
.video-js {
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.black};
}
`;

export default class VideojsWavesurferPlayer extends React.Component {
    componentDidMount() {
        // instantiate Video.js

        const videojs = require('video.js');
        const WaveSurfer = require('wavesurfer.js');

        /*
        // the following import is only needed when you're using 
        // the microphone plugin     
        import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
        WaveSurfer.microphone = MicrophonePlugin;
        */

        // register videojs-wavesurfer plugin with this import
        const Wavesurfer = require('../../../node_modules/videojs-wavesurfer/dist/videojs.wavesurfer.js');

        this.config = {
            controls: true,
            autoplay: false,
            fluid: true,
            width: 1000,
            height: 200,
            plugins: {
                wavesurfer: {
                    src: this.props.src,
                    // Pre-rendered JSON
                    peaks: this.props.peaks,
                    msDisplayMax: 10,
                    debug: true,
                    waveColor: theme.light.colors.black,
                    progressColor: '#111',
                    cursorColor: theme.light.brand.primary,
                    hideScrollbar: true,
                    height: 10,
                    barWidth: 5,
                    responsive: false,
                    partialRender: false,
                    backend: 'MediaElement',
                    normalize: true,
                    pixelRatio: 1,
                }
            }
        }
        this.player = videojs(this.audioNode, this.config, () => {
            // print version information at startup
            var version_info = 'Using video.js ' + videojs.VERSION +
                ' with videojs-wavesurfer ' + videojs.getPluginVersion('wavesurfer') +
                ' and wavesurfer.js ' + WaveSurfer.VERSION;
            videojs.log(version_info);
        });

        this.player.on('waveReady', (event) => {
            console.log('waveform: ready!');
        });

        this.player.on('playbackFinish', (event) => {
            console.log('playback finished.');
        });

        // error handling
        this.player.on('error', (error) => {
            console.warn(error);
        });
    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    // wrap the player in a div with a `data-vjs-player` attribute
    // so videojs won't create additional wrapper in the DOM
    // see https://github.com/videojs/video.js/pull/3856
    render() {
        return (
            <VjsPlayer>
                <div data-vjs-player>
                    <audio id="myAudio" ref={ node => this.audioNode = node } className="video-js vjs-default-skin vjs-16-9"></audio>
                </div>
            </VjsPlayer>
        )
    }
}