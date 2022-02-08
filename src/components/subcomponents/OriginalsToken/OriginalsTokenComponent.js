import React from 'react';
import OriginalsBalancesComponents from './OriginalsBalancesComponents.js';
import OriginalsTransferComponent from './OriginalsTransferComponent.js';

const Contracts = require("../../../functions/Contracts.js");

class OriginalsTokenComponent extends React.Component {
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  
  async refresh() {
    await this.props.refresh();
  }

    render(){
      return (
        <div>
           <h3>Originals Tokens</h3>
          <OriginalsBalancesComponents contract={Contracts.OriginalsToken}/>
          <OriginalsTransferComponent contract={Contracts.OriginalsToken}
                refresh={this.refresh}/>
          <hr class="bg-secondary"/>
          <br />
          </div>
      );
    }
  }

export default OriginalsTokenComponent;