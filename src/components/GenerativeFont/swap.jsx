import * as React from 'react';
import { observer } from "mobx-react";
import cloneDeep from 'lodash/cloneDeep';

//import FontStore from '../font';

// type PropTypes = {
//   fontStore: FontStore
// };

// Round a value to the nearest "step".
function snap(v, distance, strength) {
  return (v * (1.0 - strength)) + (strength * Math.round(v / distance) * distance);
}
function doSnap(path, origPath, snapStrength, snapDistance, snapX, snapY) {
  var i;
  var strength = snapStrength / 100.0;
  for (i = 0; i < path.commands.length; i++) {
      var cmd = path.commands[i];
      var origCmd = origPath.commands[i];
      if (cmd.type !== 'Z') {
          cmd.x = snap(origCmd.x + snapX, snapDistance, strength) - snapX;
          cmd.y = snap(origCmd.y + snapY, snapDistance, strength) - snapY;
      }
      if (cmd.type === 'Q' || cmd.type === 'C') {
          cmd.x1 = snap(origCmd.x1 + snapX, snapDistance, strength) - snapX;
          cmd.y1 = snap(origCmd.y1 + snapY, snapDistance, strength) - snapY;
      }
      if (cmd.type === 'C') {
          cmd.x2 = snap(origCmd.x2 + snapX, snapDistance, strength) - snapX;
          cmd.y2 = snap(origCmd.y2 + snapY, snapDistance, strength) - snapY;
      }
  }
}
function changeCurves(path, origPath, state) {
  var i;
  for (i = 0; i < path.commands.length; i++) {
      var cmd = path.commands[i];
      var origCmd = origPath.commands[i];
      if (cmd.type === 'Q' || cmd.type === 'C') {
        if (Math.random() > 0.3) {
          cmd.x2 = origCmd.x2 + (Math.random() > 0.5 ? -1 : 1) *  Math.random() * origCmd.x2 * 2;
          cmd.y1 = origCmd.y1 + (Math.random() > 0.5 ? -1 : 1) *  Math.random() * origCmd.y1;
          //cmd.y1 = origCmd.x2;          
        }
      }
      if (cmd.type === 'M') {
        cmd.x = origCmd.x + state.tick
        cmd.y = origCmd.y + state.tick
    }
  }
}
@observer
export default class Swap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      originalFont: null,
      font: null,
      tick: 0,
      x: 0,
      y: 0
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(e) {
    this.setState({ x: e.screenX, y: e.screenY });
  }
  tick() {
    this.setState({
      tick: this.state.tick + 1 
    });
  }
  componentDidMount() {
    this.props.fontStore.registerPlugin(this.modifyFont);
    document.addEventListener('mousemove', this.handleClickOutside);
    this.intervalID = setInterval(
      () => this.tick(),
      4000
    );
  }

  componentWillUnmount() {
    this.props.fontStore.unregisterPlugin(this.modifyFont);
    document.removeEventListener('mousemove', this.handleClickOutside);
    clearInterval(this.intervalID);
  }

  modifyFont = (font, originalFont) => {
    const keys = Object.keys(originalFont.glyphs.glyphs);
    keys.forEach((i) => {
      const index = (keys.length + Number(i)) % keys.length;
      // doSnap(
      //   font.glyphs.glyphs[index].path, 
      //   originalFont.glyphs.glyphs[index].path, 
      //   100, 34, this.state.x, this.state.y
      // ); 
      changeCurves(
        font.glyphs.glyphs[index].path, 
        originalFont.glyphs.glyphs[index].path,
        this.state
      );
    });
  }

  handleChange = () => {
    this.setState({checked: !this.state.checked});
  }

  render() {
    const { x, y } = this.state;
    return <span>
    </span>;
    // return <div>
    //   {/* <input type="checkbox" checked={this.state.checked} onChange={this.handleChange} />{this.state.checked ? 'Changed' : 'SWAP'} */}
    // </div>
  }
}
