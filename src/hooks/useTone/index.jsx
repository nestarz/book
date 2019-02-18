import { useEffect, useState } from "react";
import Tone from "tone";
import useKey from "hooks/use-key-hook";

export const useSynth = config => {
  //create a synth and connect it to the master output (your speakers)
  const [synth, setSynth] = useState(null);
  useEffect(() => {
    const new_synth = new Tone.Synth(config).toMaster();
    //const new_synth = new Tone.Synth(config).toMaster();
    setSynth(new_synth);
    return function cleanup() {
      if (synth) synth.disconnect();
    };
  }, []);
  return [synth, setSynth];
};

export const useTransport = () => {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (playing) {
      Tone.Transport.start("+0.0");
    } else {
      Tone.Transport.stop();
    }
  }, [playing]);
  return [playing, setPlaying, Tone.Transport];
};

function linspace(startValue, stopValue, cardinality) {
  var arr = [];
  var currValue = startValue;
  var step = (stopValue - startValue) / (cardinality - 1);
  for (var i = 0; i < cardinality; i++) {
    arr.push(currValue + step * i);
  }
  return arr;
}
export const useOctave = () => {
  const [octave, setOctave] = useState(2);
  useEffect(() => {
    if (!(octave in linspace(0, 8, 9))) {
      setOctave(octave => (octave == 9 ? 0 : 8));
    }
  }, [octave]);
  // We send controls on value, but real value is octave.
  return [octave, setOctave];
};

const toUpper = o =>
  Object.keys(o).reduce((c, k) => ((c[k.toUpperCase()] = o[k]), c), {});
const toLower = o =>
  Object.keys(o).reduce((c, k) => ((c[k.toLowerCase()] = o[k]), c), {});
const mapping = {
  whiteKeys: {
    A: "C",
    S: "D",
    D: "E",
    F: "F",
    G: "G",
    H: "A",
    J: "B",
    K: "C",
    L: "D"
  },
  blackKeys: {
    W: "C#",
    E: "D#",
    T: "F#",
    Y: "G#",
    U: "A#",
    O: "C#"
  },
  octaveKeys: {
    incOctaveKeys: ["x", "X"],
    decOctaveKeys: ["z", "Z"]
  }
};
const midiKeyboardsMap = {
  blackKeys: { ...mapping.blackKeys, ...toLower(mapping.blackKeys) },
  whiteKeys: { ...mapping.whiteKeys, ...toLower(mapping.whiteKeys) },
  octaveKeys: { ...mapping.octaveKeys }
};

export const useKeyboardAsMidi = (synth, {
  octave,
  setOctave
}) => {
  const {
    whiteKeys,
    blackKeys,
    octaveKeys: { incOctaveKeys, decOctaveKeys }
  } = midiKeyboardsMap;
  useKey(
    () => {
      setOctave(octave => octave + 1);
    },
    { detectKeys: incOctaveKeys },
    { dependencies: [] }
  );
  useKey(
    () => {
      setOctave(octave => octave - 1);
    },
    { detectKeys: decOctaveKeys },
    { dependencies: [] }
  );
  const keyboardTriggerAttack = (pressedKey, table) => {
    const pitchOctave = table[String.fromCharCode(pressedKey)] + octave;
    synth.triggerAttackRelease(pitchOctave, "8n");
  };
  useKey(
    key => keyboardTriggerAttack(key, whiteKeys),
    { detectKeys: Object.keys(whiteKeys) },
    { dependencies: [synth, octave] } //re-render to update keyboardTriggerAttack
  );
  useKey(
    key => keyboardTriggerAttack(key, blackKeys),
    { detectKeys: Object.keys(blackKeys) },
    { dependencies: [synth, octave] }
  );
  return [octave, setOctave];
};
