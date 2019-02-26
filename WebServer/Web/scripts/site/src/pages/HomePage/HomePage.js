import React, { Component } from 'react';

class HomePage extends React.Component {  
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div>
          <h2>
            Welcome to the PythonPoweredPi
          </h2>
          <p className="App-intro">
          The year is 2019.  The world has all but given up on owning your own hardware.  “Hosting a website on your own hardware is too expensive!” they say.  In stark contrast to that sentiment, I humbly present the PythonPoweredPi, a webapp that utilizes some of the most modern web technologies, and is being 100% hosted on $35 worth of hardware.   
          <br/>
          <br/>
          The website is still a work in progress.  Below, is an arbitrary table that will write records to disc.  Below that, is a summary of the technologies being used.
          <br/>
          </p>
        </div>
      );
    }
  }

export default HomePage