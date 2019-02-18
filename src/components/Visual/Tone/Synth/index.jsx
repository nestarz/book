import { useKeyboardAsMidi, useSynth, useTransport } from "hooks/useTone";
import { useMeyda } from "hooks/useMeyda";
import React, { useEffect } from "react";
//https://p5js.org/examples/sound-filter-bandpass.html
const Index = () => {
  const [synth, setSynth] = useSynth({
    oscillator: {
      type: "triangle8"
    },
    envelope: {
      attack: 2,
      decay: 1,
      sustain: 0.4,
      release: 4
    }
  });
  //const [playing, setPlaying, transport] = useTransport();
  const [currentOctave, octaveControls] = useKeyboardAsMidi(synth);
  const [analyzer, features] = useMeyda(synth);
  //console.log(features)
  return (
    <>
      <div>currentOctave : {currentOctave}</div>
      <div>features: {features && features.energy}</div>
    </>
  );
};

export default Index;

Index.propTypes = {};
