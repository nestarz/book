import { useKeyboardAsMidi, useSynth, useTransport } from "hooks/zone.js";
import React, { useEffect } from "react";

const Index = () => {
  const [synth, setSynth] = useSynth({
    oscillator: {
      type: 'triangle8'
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
  //const cam = useFaceCameraAsMidi(synth);
  return (
    <>
    <div>currentOctave : {currentOctave}</div>
    </>
  );
};

export default Index;

Index.propTypes = {};
