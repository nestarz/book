import { useMeydaAnalyzer } from "hooks/useMeyda";
import { useKeyboardAsMidi, useOctave, useSynth } from "hooks/useTone";
import React, { useEffect } from "react";
import Spectrogram from "components/Visual/Three/Spectrogram";

const Index = () => {
  // Configure a Synth (use Tone.js)
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

  // Get Octave controls
  const [currentOctave, setOctave] = useOctave();

  // Bind Keyboard with Synth (using Ableton Live Mapping)
  // Trigger pitch notes function of current octave
  // Increase/Decrease octave
  useKeyboardAsMidi(synth, {
    octave: currentOctave,
    setOctave: setOctave
  });

  // Use Meyda as Analyzer of Synth output
  // Pass a config to specify features to extract and bufferSize
  // An instance is created when we use setAudioContext and setSource
  const bufferSize = 512;
  const {
    analyzer,
    features,
    setAudioContext: setMeydaAnalyzerAudioContext,
    setSource: setMeydaAnalyzerSource
  } = useMeydaAnalyzer({
    audioContext: null,
    source: null,
    bufferSize: bufferSize,
    featureExtractors: [
      "amplitudeSpectrum",
      "spectralCentroid",
      "spectralRolloff",
      "loudness",
      "rms"
    ]
  });
  // When Synth is ready, we bind it with our MeydaAnalyzer
  useEffect(() => {
    if (synth) {
      setMeydaAnalyzerAudioContext(synth.context.rawContext);
      setMeydaAnalyzerSource(synth);
    }
  }, [synth]);
  return (
    <>
      <div>currentOctave : {currentOctave}</div>
      <div>features: {features && features.rms}</div>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
        <Spectrogram
          analyzer={analyzer}
          features={features}
          bufferSize={bufferSize}
        />
      </div>
    </>
  );
};

export default Index;

Index.propTypes = {};
