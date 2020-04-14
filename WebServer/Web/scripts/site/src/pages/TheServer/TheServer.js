import React, { Component } from 'react';
import theServer from '../../images/TheServer.jpg';

class TheServer extends React.Component {  
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div>
          <h2>
            The Server
          </h2>
          <p>
            This here stunning piece of machinery - is a generation 3 Raspberry Pi. It sits here in my living room, on top of a speaker, and it is the server that is serving you this content.  Your request was routed through the no-ip DNS server, which then directed the request to my Verizon wide area network address, where it was then finally directed to this robust little $35 piece of machinery. 
          </p>
          <img src={theServer} alt="Picture of Raspberry Pi 3"/>
        </div>
      );
    }
  }

export default TheServer