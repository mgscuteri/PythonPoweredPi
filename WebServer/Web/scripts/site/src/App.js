import React, { Component } from 'react';
import logo from './logo.svg';
import piLogo from './images/piLogoSmall.png';
import pythonLogo from './images/PythonLogoSmall.png';
import axios from 'axios'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <header className="App-header">
            <img src={pythonLogo} className="logo" alt="logo" />
            <img src={logo} className="App-logo" alt="logo" />
            <img src={piLogo} className="logo" alt="logo" />
            <h1 className="App-title">Welcome to Michael Scuteri's Website</h1>
          </header>
          <p className="App-intro">
            This is a test website, built to test python's "pickler" I/O performance limits when hosted on a rasberry pi 3.
          </p>
        </div>
        <div>
          <DisplayRegistrations/>
        </div>
      </div>
    );
  }
}

class DisplayRegistrations extends React.Component {  
  constructor(props) {
    super(props);
    var hostUri = window.location.host; 
    var localTest = false;
    if(localTest) {
      hostUri = 'http://localhost:8080'
    }
    this.state = {
      registrations: '',
      registrationsHtml: '',
      hostUrl: hostUri
    };

    
    console.log(this.state.hostUrl)
    axios.get(this.state.hostUrl + '/data/registrations')
    .then(response => {
      this.setState({registrations: response})
      var registrationsArr = [];
      Object.keys(this.state.registrations).forEach(function(key) {
        registrationsArr.push(this.state.registrations[key]);
      });
      var rowsArray = []
      for (var i = 0; i < registrationsArr.length; i++) {
        rowsArray.push(this.renderRow(i, registrationsArr[i].Name, registrationsArr[i].emailAddress));
      }
      this.setState({registrationsHtml: rowsArray})
     })
 
     
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {

  }
  handleAddition() {

  }
  renderRow(i, Name, emailAddress) {
    return (
      <tr>
        <td>{i+1}</td>
        <td>{Name}</td>
        <td>{emailAddress}</td>
        <td><button onClick={this.handleDelete}>Delete</button></td>
      </tr>
    )
  }


  render() {
    return (
      <div>
        <table>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
           {this.registrationsHtml}
        </table>
      </div>
    );
  }
}

export default App;
