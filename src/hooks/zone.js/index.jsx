import { useEffect, useState } from "react";
import { useCounter } from "react-use";
import Tone from "tone";
import useKey from "use-key-hook";

const synthCreation = config => new Tone.Synth(config).toMaster();
export const useSynth = config => {
  //create a synth and connect it to the master output (your speakers)
  const [synth, setSynth] = useState(null);
  useEffect(() => {
    setSynth(synthCreation(config));
  }, []);
  useEffect(() => {
    setSynth(synthCreation(config));
  }, [config]);
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
  const [value, { inc, dec, get, set, reset }] = useCounter(8);
  const [octave, setOctave] = useState(value);
  useEffect(() => {
    if (value in linspace(0, 8, 9)) {
      setOctave(value);
    } else {
      reset();
    }
  }, [value]);
  // We send controls on value, but real value is octave.
  return [octave, { inc, dec, set, get, reset }];
};

const toUpper = o => Object.keys(o).reduce((c, k) => (c[k.toUpperCase()] = o[k], c), {});
const toLower = o => Object.keys(o).reduce((c, k) => (c[k.toLowerCase()] = o[k], c), {});
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

export const useKeyboardAsMidi = synth => {
  const [
    currentOctave,
    { inc: incOctave, dec: decOctave, get: getOctave, reset: resetOctave }
  ] = useOctave();
  const {
    whiteKeys,
    blackKeys,
    octaveKeys: { incOctaveKeys, decOctaveKeys }
  } = midiKeyboardsMap;
  useKey(
    () => incOctave(),
    { detectKeys: incOctaveKeys },
    { dependencies: [] }
  );
  useKey(
    () => decOctave(),
    { detectKeys: decOctaveKeys },
    { dependencies: [] }
  );
  const keyboardTriggerAttack = (pressedKey, table) => {
    const pitchOctave = table[String.fromCharCode(pressedKey)] + currentOctave;
    synth.triggerAttackRelease(pitchOctave, "8n");
  };
  useKey(
    key => keyboardTriggerAttack(key, whiteKeys),
    { detectKeys: Object.keys(whiteKeys) },
    { dependencies: [synth, currentOctave] }
  );
  useKey(
    key => keyboardTriggerAttack(key, blackKeys),
    { detectKeys: Object.keys(blackKeys) },
    { dependencies: [synth, currentOctave] }
  );
  const octaveControls = {
    inc: incOctave,
    dec: decOctave,
    get: getOctave,
    reset: resetOctave
  };
  return [currentOctave, octaveControls];
};
