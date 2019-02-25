<p className="App-intro">
The year is 2019.  The world has all but given up on owning your own hardware.  “Hosting a website on your own hardware is too expensive!” they say.  In stark contrast to that sentiment, I humbly present the PythonPoweredPi, a webapp that utilizes some of the most modern web technologies, and is being 100% hosted on $35 worth of hardware.   
<br/>
<br/>
The website is still a work in progress.  Below, is an arbitrary table that will write records to disc.  Below that, is a summary of the technologies being used.
<br/>
</p>


class HomePage extends React.Component {
    constructor(props) {
      super(props);
  
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

export default ThemeSongs