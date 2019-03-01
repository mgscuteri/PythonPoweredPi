import React, { Component } from 'react';
import piLogo from '../../images/piLogoSmall.png';
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

class Navbar extends React.Component {  
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div class="navBarContainer">
          
              <div className="logo">
                  <a class="active" href="#home"><img src={piLogo} alt="logo"/></a>
              </div>
              <div class="navbar">
                <Router>
                  <ul class="topnav">
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/ThemeSongs">ThemeSongs</Link></li>
                      <li class="right"><Link to="/About">About</Link></li>
                  </ul>
                </Router>
              </div>
            
        </div>
      );
    }
  }

export default Navbar