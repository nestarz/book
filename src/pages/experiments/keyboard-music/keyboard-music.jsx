import Layout from "components/Layout/Main";
import TwoColumns from "components/Layout/Template/TwoColumns";
import Synth from "components/Visual/Tone/Synth";
import { useToggleGlobalLanguage } from "hooks/useLanguage";
import Markdown from 'markdown-to-jsx';
import React from "react";
import styled from "styled-components";
import { useToggle } from 'react-use';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
const Wrapper = styled(TwoColumns)`
th {
  text-align: center;
  font-weight: normal;
  padding: 1em;
}
td{
    border-top:1px solid ${props => props.theme.brand.primary};
    padding: 1em;
}
tr td:not(:last-child){
    width:1%;
    white-space:nowrap;
}
.toggle {
  cursor: pointer;
}
`;
const md = `
## Mapping inherited from Ableton Live

| M |	M |	Toggle computer **MIDI keyboard** |
| --- | --- | --- |
| A to L | A to L | This row triggers white notes from C (the A key). |
| W to O | W to O | This row triggers black notes from C# (the W key). Actual keys are: WE – TYU – O |
| Z |	Z |	Octave down |
| X |	X |	Octave up |
| C |	C |	Decrease note velocity |
| V |	V |	Increase note velocity |
`;
function Index({ location }) {
  const [language, toggleLanguage] = useToggleGlobalLanguage();
  const [controls, toggleControls] = useToggle(false);
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
            <h1>
              Use your voice/keyboard to play notes and control p5 output (WIP)
            </h1>
            {controls && <Markdown children={md} />}
            <Synth />
            <h1 className={"toggle"} onClick={() => toggleControls()}>
              <span>Display Controls {controls ? <MdArrowDropDown/> : <MdArrowDropUp/>}</span>
            </h1>
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
