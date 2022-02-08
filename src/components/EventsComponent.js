import React from 'react';
import ListEventsComponent from './subcomponents/Event/ListEventsComponent.js';
import LoadingComponent from './subcomponents/LoadingComponent.js';

const Aux = require("../functions/AuxiliaryFunctions.js");


class EventsComponent extends React.Component {
  async componentWillMount() {
    await this.refresh();
  }

  state = {
    block : 0,
    loading : true
  };

  async refresh() {
    let b = await Aux.web3.eth.getBlockNumber();
    this.setState({block : b});
    this.setState({loading : false});
  }
    
    render(){
      return (
        <div>
          {(false == this.state.loading)? 
            <div>
              <ListEventsComponent block={this.state.block}/>
            </div>
          : 
            <div>
              <LoadingComponent />
            </div>
          }
          <br />
        </div>
      );
    }
  }

export default EventsComponent;