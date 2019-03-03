import React, { Component } from 'react';
import piLogo from '../../images/piLogoSmall.png';
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { Switch } from 'react-router-dom';

import ThemeSongs from '../../pages/ThemeSongs/ThemeSongs.js'
import HomePage from '../../pages/HomePage/HomePage.js'
import TechOverview from '../../pages/TechOverview/TechOverview.js';


class Navbar extends React.Component {  
    constructor(props) {
      super(props);
    }

    render() {
      return (
          <Router>
            <div>
              <div class="navBarContainer">
                <div className="logo">
                  <a class="active" href="#home"><img src={piLogo} alt="logo"/></a>
                </div>
                <div class="navbar">
                  <ul class="topnav">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/a/ThemeSongs">ThemeSongs</Link></li>
                    <li class="right"><Link to="/a/About">About</Link></li>
                  </ul>
                </div>
              </div>
              <div className="appBody">
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/a/ThemeSongs" component={ThemeSongs} />
                  <Route path="/a/About" component={TechOverview} />
                  <Route render={ () => <h1>404 Error</h1> } />
                </Switch>
              </div>
            </div>
          </Router>
      );
    }
  }

export default Navbar