import React, { Component } from 'react';
import piLogo from '../../images/piLogoSmall.png';

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
                <ul class="topnav">
                    <li><a class="active" href="#home">Home</a></li>
                    <li><a href="#news">ThemeSongs</a></li>
                    <li class="right"><a href="#about">About</a></li>
                </ul>
            </div>
        </div>
      );
    }
  }

export default Navbar