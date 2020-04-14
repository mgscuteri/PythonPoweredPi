import React, { Component } from 'react';

class HomePage extends React.Component {  
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div>
          <h2>
            Welcome to Mike Scuteri's PythonPoweredPi!
          </h2>
          <p>
            I'm Michael Scuteri. Welcome to my website.  I built this website for no particular reason other then I am a Software Engineer, and I felt like I should have my own website.  This site does not take advantage of any SAS providers. It is entirely custom built, coded, deployed, and maintened.. It has no recurring costs, and it is hosted on $35 worth of hardware.
          </p>
          <br/>
          See the source code for this technology demostrator here: 
          <br/>
          <a href="https://github.com/mgscuteri/PythonPoweredPi">https://github.com/mgscuteri/PythonPoweredPi</a>
        
        </div>
        
      );
    }
  }

export default HomePage
