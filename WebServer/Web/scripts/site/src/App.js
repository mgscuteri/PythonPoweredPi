import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import ThemeSongs from './pages/ThemeSongs/ThemeSongs.js'
import HomePage from './pages/HomePage/HomePage.js'
import './App.css';
import TechOverview from './pages/TechOverview/TechOverview.js';
import Navbar from './modules/site/navbar.js'



class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <div className="appBody">
          <HomePage/>
          <ThemeSongs/>
          <TechOverview/>
        </div>
      </div>
    );
  }
}


export default App;
