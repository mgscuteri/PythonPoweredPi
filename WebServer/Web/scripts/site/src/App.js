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
            <h1 className="App-title">Python Powered Pi</h1>
          </header>
        </div>
        <div className="appBody">
          <p className="App-intro">
            The year is 2019.  The world has all but given up on owning your own hardware.  “Hosting a website on your own hardware is too expensive!” they say.  In stark contrast to that sentiment, I humbly present the PythonPoweredPi, a webapp that utilizes some of the most modern web technologies, and is being 100% hosted on $35 worth of hardware.   
            <br/>
            <br/>
            The website is still a work in progress.  Below, is an arbitrary table that will write records to disc.  Below that, is a summary of the technologies being used.
            <br/>
            <div>
              <DisplayRegistrations/>
            </div>
            <br/>
            Overview of technologies being used:
            <ul>
               <li>Server</li>
                <ul>
                  <li><a href="https://www.raspberrypi.org/products/raspberry-pi-3-model-b/">Raspberry Pi 3</a> - Hosts this Application, as well as Jenkins </li>
                  <li><a href="https://www.raspberrypi.org/downloads/raspbian/"> Raspbian Stretch Lite </a> - Operating System</li>
                  <li><a href="https://circleci.com/migrate-jenkins-to-circleci/?utm_source=gnb&utm_medium=SEM&utm_campaign=SEM-gnb-400-Eng-ni&utm_content=SEM-gnb-400-Eng-ni-Jenkins&gclid=EAIaIQobChMI8ejf59fV4AIVxkSGCh0zDQ6MEAAYASAAEgLG9fD_BwE"> Jenkins </a> - Integrates with Github to orchestrate continuous integration and deployment</li>
                </ul>
              <li>Back-End</li>
                <ul>
                  <li><a href="https://www.python.org/">Python3</a> - Serves static content and handles rest calls</li>
                  <li><a href="https://aiohttp.readthedocs.io/en/stable/">Aiohttp </a> - used for HTTP handling </li>
                </ul>
              <li> Front-End
                <ul>
                  <li><a href="https://www.npmjs.com/">Node Package Manager </a> - Dependency Management</li> 
                  <li><a href="https://reactjs.org/">React</a> - Javacript Framework</li>
                  <li><a href="https://webpack.js.org/">Webpack</a> - Bundles HTML/Js/CSS and provides development server </li>
                  <li><a href="https://webpack.js.org/">Axios</a> - Package used for making REST calls </li>
                </ul>
              </li>
              <li>Routing/DNS</li>
                <ul>
                    <li><a href="https://www.tp-link.com/us/products/details/cat-9_Archer-C7.html">Tp-Link Archer C7</a> Port Forwarding and VPN Server</li> 
                    <li><a href="https://www.noip.com/">Noip</a> DNS registration and dynamic DNS servicing </li> 
                </ul>
              <li>Source Control</li>
                <ul>
                    <li><a href="https://github.com/mgscuteri/PythonPoweredPi">Github</a></li> 
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
