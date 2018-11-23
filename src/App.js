import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../src/components/Loading/Loading';

import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';

import '../node_modules/video.js/dist/video-js.css';

import '../node_modules/videojs-contrib-ads/dist/videojs-contrib-ads.css';

import '../node_modules/videojs-ima/dist/videojs.ima.css';



import Workaround from "./components/Workaround/Workaround";
import Loading from "./components/Loading/Loading";
class App extends Component {
  render() {
    return (
      <div className="App">



          <Loading/>

          <header>
            <Workaround/>
        </header>
      </div>
    );
  }
}

export default App;
