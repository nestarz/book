import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import { useStrict } from 'mobx';
import { observer } from "mobx-react";
import Font from './font';
import Swap from './swap';

//useStrict(true);

const fontStore = new Font();
fontStore.loadFont(require('./CircularStd-Medium.woff'));
window.font = fontStore;
var fontN = true;

@observer
class App extends React.Component {
  render() {
    fontN = !fontN;
    return <span>
      {fontStore.isLoading ? 'Loading' :
        <span style={{fontFamily: "GeneratedFont"}}>
          <style>{`
            @font-face {
              font-family: GeneratedFont${fontN ? '2' : '1'};
              src: url(${fontStore.base64}) format('woff');
            }
          `}</style>
          <Swap fontStore={fontStore}/>
        </span>
      }
      <span style={{fontFamily: "GeneratedFont2, GeneratedFont1, CircularStd"}}>
        {this.props.children}
      </span>
    </span>
  }
}

window.font = fontStore;

export default App;
