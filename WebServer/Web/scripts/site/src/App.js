import React, { Component } from 'react';
import logo from './logo.svg';
import piLogo from './images/piLogoSmall.png';
import pythonLogo from './images/pythonLogoSmall.png';
import request from 'superagent/request';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={pythonLogo} className="logo" alt="logo" />
          <img src={logo} className="App-logo" alt="logo" />
          <img src={piLogo} className="logo" alt="logo" />
          <h1 className="App-title">Welcome to Michael Scuteri's Website</h1>
        </header>
        <p className="App-intro">
          This is a test website, built to test the performance limits of a python http/rest server running on a rasberry pi 3.

        </p>
      </div>
    );
  }
}

class RestTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {randomNumber: 0}

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

export default App;
