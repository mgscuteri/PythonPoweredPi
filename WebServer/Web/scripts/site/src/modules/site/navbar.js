import React, { Component } from 'react';
import piLogo from '../../images/piLogoSmall.png';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { Switch } from 'react-router-dom';

import EmailList from '../../pages/EmailList/EmailList.js'
import HomePage from '../../pages/HomePage/HomePage.js'
import TechOverview from '../../pages/TechOverview/TechOverview.js';
import TheServer from '../../pages/TheServer/TheServer.js';


class Navbar extends React.Component {  
    constructor(props) {
      super(props);
    }

    render() {
      return (
          <Router>
            <div>
              <div class="navBarContainer">
                <div class="navbar">
                  <ul class="topnav">
                    <li><Link to="/"><img src={piLogo} alt="logo"/></Link></li>
                    <li class="topnav"><Link to="/">Home</Link></li>
                    <li class="topnav, right"><Link to="/TheServer">The Server</Link></li>
                    <li class="topnav"><Link to="/EmailList">Email List</Link></li>
                    <li class="topnav"><Link to="/About">About</Link></li>
                  </ul>
                </div>
              </div>
              <div className="appBody">
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/TheServer" component={TheServer} />
                  <Route path="/EmailList" component={EmailList} />
                  <Route path="/About" component={TechOverview} />
                  <Route render={ () => <h1>404 Error</h1> } />
                </Switch>
              </div>
            </div>
          </Router>
      );
    }
  }

export default Navbar