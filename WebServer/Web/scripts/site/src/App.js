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
        <div className="header">
          <header className="App-header">
            <img src={pythonLogo} className="logo" alt="logo" />
            <img src={logo} className="App-logo" alt="logo" />
            <img src={piLogo} className="logo" alt="logo" />
            <h1 className="App-title">Welcome to Michael Scuteri's Website</h1>
          </header>
        </div>
        <div className="appBody">
          <p className="App-intro">
            Hi, welcome to my website. I built this site from the ground up to demonstrate the feasibility of hosting a website on your own personal hardware in 2018. In a world of expensive managed hosting solutions where everything is AWS this, Azure that - this website is being hosted on a $37 rasberry pi sitting underneath my desk.
            <br/>
            The table below serves no real purpose. (Yet!) It is there simply to demonstrate data persistence. Feel free to add or delete records to it. They will be written to/from disk. 
            <br/>
            <br/>
            This just in, this site now supports continuous integration and deployment!
            <br/>
            <div>
              <DisplayRegistrations/>
            </div>
            <br/>
            Here is a brief overview of the technologies being used here:
            <ul>
              <li>Python</li>
                <ul>
                  <li>Serves Static Files</li>
                  <li>Serves Rest API </li>
                  <li><a href="https://aiohttp.readthedocs.io/en/stable/">Aiohttp </a> used for HTTP handling </li>
                </ul>
              <li>Javascript
                <ul>
                  <li><a href="https://www.npmjs.com/">Node Package Manager </a></li> 
                  <li><a href="https://reactjs.org/">React </a></li>
                  <li><a href="https://webpack.js.org/">Webpack</a> (Bundler and Dev Server) </li>
                  <li><a href="https://webpack.js.org/">Axios</a> used for making REST calls </li>
                </ul>
              </li>
              <li>Routing/DNS</li>
                <ul>
                    <li><a href="https://www.noip.com/">Noip</a> DNS registration and dynamic DNS servicing </li> 
                </ul>
            </ul>
          </p>
        </div>
      </div>
    );
  }
}

class DisplayRegistrations extends React.Component {  
  constructor(props) {
    super(props);
    var environmentVariables = {}
    environmentVariables.dataUrl = 'http://' + window.location.host + '/data/registrations'
        
    this.state = {
      listItems: <tr></tr>,
      nextId: '',
      registrations: '',
      rowsArray: [],
      name: 'name',
      email: 'email',
      environmentVariables: environmentVariables,
    };
    axios.get(environmentVariables.dataUrl)
    .then(response => {
      this.setState({registrations: response.data})
      var registrationsArr = [];
      
      Object.keys(response.data).forEach(function(key) {
        response.data[key].key = key
        registrationsArr.push(response.data[key]);
      });
      var rowsArray = []
      for (var i = 0; i < registrationsArr.length; i++) {
        rowsArray.push(registrationsArr[i]);
      }
      this.setState({rowsArray: rowsArray});
      if(rowsArray.length > 0) {
        this.setState({nextId: (parseInt(rowsArray[rowsArray.length - 1].key) + 1).toString()})
      } else {
        this.setState({nextId: 0})
      }

      
     })
     this.handleDelete = this.handleDelete.bind(this);
     this.handleAddition = this.handleAddition.bind(this);
     this.handleNameChange = this.handleNameChange.bind(this);
     this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleDelete(index) {
    var obj = this;
    axios.delete(this.state.environmentVariables.dataUrl + '/' + index)
    .then(response => {
      obj.setState({registrations: response.data})
      var registrationsArr = [];
      
      Object.keys(response.data).forEach(function(key) {
        response.data[key].key = key
        registrationsArr.push(response.data[key]);
      });
      var rowsArray = []
      for (var i = 0; i < registrationsArr.length; i++) {
        rowsArray.push(registrationsArr[i]);
      }
      obj.setState({rowsArray: rowsArray});
      if(rowsArray.length > 0) {
        this.setState({nextId: (parseInt(rowsArray[rowsArray.length - 1].key) + 1).toString()})
      } else {
        this.setState({nextId: 0})
      }
      
    })
  }
  handleAddition(obj) {
    var obj = this 
    axios.post(this.state.environmentVariables.dataUrl, {
      Name: this.state.name,
      emailAddress: this.state.email
    })
    .then(response => {
      obj.setState({registrations: response.data})
      var registrationsArr = [];
      
      Object.keys(response.data).forEach(function(key) {
        response.data[key].key = key
        registrationsArr.push(response.data[key]);
      });
      var rowsArray = []
      for (var i = 0; i < registrationsArr.length; i++) {
        rowsArray.push(registrationsArr[i]);
      }
      obj.setState({rowsArray: rowsArray});
      if(rowsArray.length > 0) {
        this.setState({nextId: (parseInt(rowsArray[rowsArray.length - 1].key) + 1).toString()})
      } else {
        this.setState({nextId: 0})
      }
    })
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
    
    if(this.state.rowsArray.length > 0)
    {
      var listItems = this.state.rowsArray.map(function(item, index) {
        return (
          <tr>
            <td>{item.key}</td>
            <td>{item.Name}</td>
            <td>{item.emailAddress}</td>
            <td className='right'><button className='button1' onClick={()=>handleDeleteFunc(item.key)}>Delete</button></td> 
          </tr>
        );
      });
    }
    return (
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
              <tbody>
                {listItems}
                <tr>
                  <td></td>
                  <td><input type="text" id="Name" value={this.state.name} onChange={this.handleNameChange}/></td>
                  <td><input type="text" id="Email" value={this.state.email} onChange={this.handleEmailChange}/></td>
                  <td className='right' ><button className='button2' onClick={()=>handleAddFunc()}>  Add  </button></td>
                </tr>
              </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
