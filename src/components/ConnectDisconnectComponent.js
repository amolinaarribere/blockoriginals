import React from 'react';

const loadFunc = require("../functions/LoadFunctions.js");
const AuxFunc = require("../functions/AuxiliaryFunctions.js");
const BrowserStorageFunctions = require("../functions/BrowserStorageFunctions.js");


class ConnectDisconnectComponent extends React.Component{
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
    this.state = {
      connected: false,
      label: "Connect"
    }

    if(BrowserStorageFunctions.ReadKey(BrowserStorageFunctions.accountConnectedKey)){
      this.state = {
        connected: true,
        label: "Disconnect"
      }
    }
  }

  state = {
    connected : "",
    label : ""
  };

  refresh(){
    this.props.refresh();
  }

  handleConnectDisconnect = async (event) => {
    event.preventDefault();
    if(this.state.connected){
      await this.disconnect();
    } 
    else{
      await this.connect();
    } 
  };

  async connect() {
    try {
      await loadFunc.ReadAccount();
      if(AuxFunc.account){
        this.setState({label: "Disconnect"});
        this.setState({connected: true})
      }
      this.refresh();
    } catch (ex) {
      window.alert("Error connecting to your wallet : " + JSON.stringify(ex))
    }
  }

  async disconnect() {
    try {
      await loadFunc.DisconnectAccount();
      if(!AuxFunc.account){
        this.setState({label: "Connect"});
        this.setState({connected: false})
      }
      this.refresh();
    } catch (ex) {
      window.alert("Error disconnecting from your wallet : " + JSON.stringify(ex))

    }
  }


    render(){
      return(
        <div>
          <button type="button" onClick={this.handleConnectDisconnect} class="btn btn-light">{this.state.label}</button> 
        </div>

      );
    }
  }

export default ConnectDisconnectComponent;