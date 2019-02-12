import { useInterval } from "hooks/useInterval";
import React, { useEffect, useState } from "react";
import Waveform from "react-audio-waveform";
import {
  IoIosPause,
  IoIosPlay,
  IoIosVolumeHigh,
  IoIosVolumeMute
} from "react-icons/io";
import useAudio from "react-use/lib/useAudio";
import useToggle from "react-use/lib/useToggle";
import styled, { withTheme } from "styled-components";

const StyledButton = styled.button`
  all: unset;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
const Wrapper = styled.div`
  height: auto;
  width: 100%;
`;
const WrapperControls = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-size: 0.8em;
  }
`;
const WaveformAudio = ({ src, peaks, ...props }) => {
  const [audio, state, controls, ref] = useAudio({
    src: src,
    autoPlay: false
  });
  const [time, setTime] = useState(0);
  const [mute, toggleMute] = useToggle(false);
  const [play, togglePlay] = useToggle(false);
  const [peaksArray, setPeaksArray] = useState();
  useEffect(() => {
    if (Array.isArray(peaks)) {
      setPeaksArray(peaks);
    } else {
      fetch(peaks)
        .then(result => result.json())
        .then(json => {
          console.log("Loaded Peak Data URL: " + peaks);
          setPeaksArray(json.data);
        });
    }
  }, []);
  useEffect(() => {
    if (play) controls.play();
    else controls.pause();
  }, [play]);
  useEffect(() => {
    if (mute) controls.mute();
    else controls.unmute();
  }, [mute]);
  useInterval(() => {
    setTime(ref.current.currentTime);
  }, 100);
  if (typeof window === "undefined") return <></>;
  return (
    <Wrapper>
      <Waveform
        barWidth={4}
        peaks={peaksArray}
        height={200}
        pos={state.time}
        duration={state.duration}
        onClick={n => {
          controls.seek(n);
          togglePlay(true);
        }}
        color={props.theme.brand.primary}
        progressGradientColors={[[0, "#888"], [1, "#aaa"]]}
      />
      <WrapperControls>
        {audio}
        <div>
          <StyledButton onClick={() => togglePlay()}>
            {play ? <IoIosPause /> : <IoIosPlay />}
          </StyledButton>
          <StyledButton onClick={() => toggleMute()}>
            {mute ? <IoIosVolumeMute /> : <IoIosVolumeHigh />}
          </StyledButton>
        </div>
        <span>
          {Math.round(state.time * 10) / 10}:
          {Math.round(state.duration * 10) / 10}
        </span>
      </WrapperControls>
    </Wrapper>
  );
};

export default withTheme(WaveformAudio);
