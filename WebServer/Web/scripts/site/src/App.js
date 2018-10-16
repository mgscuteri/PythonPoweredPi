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
    var environmentVariables = {}
    environmentVariables.dataUrl = ''
    
    environmentVariables.dataUrl = 'http://' + window.location.host + '/data/registrations'
    
    this.state = {
      registrations: '',
      rowsArray: [],
      name: 'name',
      email: 'email',
      environmentVariables: environmentVariables,
    };
    axios.get(environmentVariables.dataUrl)
    .then(response => {
      this.setState({registrations: response.data})
      console.log(response.data)
      var registrationsArr = [];
      
      Object.keys(response.data).forEach(function(key) {
        registrationsArr.push(response.data[key]);
      });
      var rowsArray = []
      for (var i = 0; i < registrationsArr.length; i++) {
        rowsArray.push(registrationsArr[i]);
      }
      this.setState({rowsArray: rowsArray});
     })
     this.handleDelete = this.handleDelete.bind(this);
     this.handleAddition = this.handleAddition.bind(this);
     this.handleNameChange = this.handleNameChange.bind(this);
     this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleDelete(index) {
    return `temp`
  }
  handleAddition(obj) {
    name = this.state.name
    email = this.state.email
    return 'temp'
  }
  handleNameChange(event) {
    this.setState({name: event.target.value});
  }
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  render() {
    var handleDeleteFunc = this.handleDelete
    var handleAddFunc = this.handleAddition
    var listItems = <tr></tr>
    if(this.state.rowsArray.length > 0)
    {
      var listItems = this.state.rowsArray.map(function(item, index) {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{item.Name}</td>
            <td>{item.emailAddress}</td>
            <td><button onClick={()=>handleDeleteFunc(index + 1)}>Delete</button></td> 
          </tr>
        );
      });
    }
    return (
      <div>
        <div class='table'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Delete</th>
              </tr>
            </thead>
              <tbody>
                {listItems}
                <tr>
                  <td>{this.state.rowsArray.length + 1}</td>
                  <td><input type="text" id="Name" value={this.state.name} onChange={this.handleNameChange}/></td>
                  <td><input type="text" id="Email" value={this.state.email} onChange={this.handleEmailChange}/></td>
                  <td><button onClick={()=>handleAddFunc()}>Add</button></td>  
                </tr>
              </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
