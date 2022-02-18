import React from 'react';
import ManagerAddressPropositionComponent from './subcomponents/Manager/AddressPropositionComponent.js';
import PropositionConfigComponent from './subcomponents/Proposition/PropositionConfigComponent.js';
import PricePropositionComponent from './subcomponents/Treasury/PricePropositionComponent.js';
import PaymentsConfigComponent from './subcomponents/Payments/PaymentsConfigComponent.js';
import LoadingComponent from './subcomponents/LoadingComponent.js';

const Contracts = require("../functions/Contracts.js");
const LoadFunc = require("../functions/LoadFunctions.js");

class SettingsComponent extends React.Component {
  async componentWillMount() {
    await this.refresh();
  }

  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  
   state = {
      loading : false,
    };
    
    async refresh() {
      this.setState({loading: true})
      await LoadFunc.LoadManagerFunc(Contracts.Manager);
      this.setState({loading: false})
    }
  
    render(){
      return (
        <div>
          {(false == this.state.loading)? 
            <div>
              <ManagerAddressPropositionComponent contract={Contracts.Manager}/>
              <br />
              <PropositionConfigComponent contract={Contracts.PropositionSettings}/>
              <br/>
              <PricePropositionComponent contract={Contracts.Treasury}/>
              <br/>
              <PaymentsConfigComponent contract={Contracts.Payments}/>
              <br/>
            </div>
          :
            <div>
              <LoadingComponent />
            </div>
          }
        </div>
      );
    }
  }

  export default SettingsComponent;

