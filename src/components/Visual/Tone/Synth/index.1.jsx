import { useEffect } from "react";
import Tone from "tone";

export const useSynth = (config) => {
  //create a synth and connect it to the master output (your speakers)
  const [synth, setSynth] = setState(new Tone.Synth(config).toMaster());
  useEffect(() => {
    setState(new Tone.Synth(config).toMaster());
  }, [config])
  return [synth, setSynth]
}

export const useTransport = ({
  loop = true,
  loopEnd = "1m"
}) => {
  const [playing, setPlaying] = setState(false);
  useEffect(() => {
    Tone.Transport.loopEnd = loop;
    Tone.Transport.loop = loopEnd;
  }, [])
  useEffect(() => {
    if (playing) {
      Tone.Transport.start("+0.0");
    } else {
      Tone.Transport.stop();
    }
  }, [playing])
  return [playing, setPlaying, Tone.Transport]
}
