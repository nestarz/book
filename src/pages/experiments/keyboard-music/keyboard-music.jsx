import Layout from "components/Layout";
import TwoColumns from "components/Layout/Columns/Two";
import { useToggleGlobalLanguage } from "hooks/useLanguage";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Tone from "tone";
import useKey from "use-key-hook";

const Wrapper = styled(TwoColumns)``;

//create a synth and connect it to the master output (your speakers)
var synth = new Tone.Synth({
	"oscillator" : {
		"type" : "sine",
		"modulationFrequency" : 0.2
	},
	"envelope" : {
		"attack" : 0.02,
		"decay" : 0.1,
		"sustain" : 0.2,
		"release" : 0.8,
	}
}).toMaster();
//create a distortion effect
var distortion = new Tone.Distortion(0.4).toMaster();
//connect a synth to the distortion
synth.connect(distortion);
const triggerSynth = time => {
  //play a 'C4' for the duration of an 8th note
  synth.triggerAttackRelease("C4", "8n", time);
};
function Index({ location }) {
  const [language, toggleLanguage] = useToggleGlobalLanguage();
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    Tone.Transport.schedule(triggerSynth, 0);
    Tone.Transport.schedule(triggerSynth, "0:2");
    Tone.Transport.schedule(triggerSynth, "0:2:2.5");
    Tone.Transport.loopEnd = "1m";
    Tone.Transport.loop = true;
  }, []);
  useEffect(() => {
    if (!playing) {
      Tone.Transport.stop();
    } else {
      Tone.Transport.start("+0.0");
    }
  }, [playing]);
  useKey(pressedKey => {
    console.log("Detected Key press", pressedKey);
    const octaves = ["C4", "E4", "G4", "A4"];
    synth.triggerAttackRelease(
      octaves[Math.floor(Math.random() * octaves.length)],
      "8n"
    );
  });
  return (
    <Layout pathname={location.pathname} withNav={true}>
      <Wrapper>
        <div>
          <header>
            <h1>Azerty Melodies</h1>
          </header>
          <div>
            <h1>Keyboard</h1>
            <h1>Twitter</h1>
            <h1>Camera IP</h1>
            <h1>AFP</h1>
          </div>
        </div>
        <div>
          <div className={"body"}>
            <h1>Use your keyboard to play notes and control p5 output (WIP)</h1>
            <button onClick={() => setPlaying(!playing)}>
              {playing ? "Stop" : "Play"}
            </button>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
}

export default Index;

Index.propTypes = {};

export const frontmatter = {
  title: "Azerty Melodies",
  written: "2017-05-04",
  layoutType: "post",
  path: "visitcard",
  category: "experiments",
  description: "Things about the choropleth.",
  updated: false
};
