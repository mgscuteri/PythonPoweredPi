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
      rowsArray: [],
      hostUrl: hostUri
    };

    
    console.log(this.state.hostUrl)
    axios.get('http://' + this.state.hostUrl + '/data/registrations')
    .then(response => {
      this.setState({registrations: response})
      var registrationsArr = [];
      Object.keys(this.state.registrations).forEach(function(key) {
        registrationsArr.push(key);
      });
      console.log(rowsArray)
      var rowsArray = [registrationsArr]
      for (var i = 0; i < registrationsArr.length; i++) {
        rowsArray.push(registrationsArr[i]);
      }
      
      this.setState({rowsArray: rowsArray});

      
      console.log(rowsArray)
      console.log(this.state.registrationsHtml)
     })
 
     
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    return `temp`
  }
  handleAddition() {
    return 'temp'
  }

  render() {
    var handleDeleteFunc = this.handleDelete
    var listItems = this.state.rowsArray.map(function(item, index) {
      return (
        <tr>
          <td>{index+1}</td>
          <td>{item.Name}</td>
          <td>{item.emailAddress}</td>
          <td><button onClick={handleDeleteFunc}>Delete</button></td>
        </tr>
      );
    });
    return (
      <div>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
           {listItems}
        </table>
      </div>
    );
  }
}

export default App;
