import React from 'react';
import OwnerComponent from './subcomponents/Owners/OwnerComponent.js';
import LoadingComponent from './subcomponents/LoadingComponent.js';
import PiggyBankTransferComponent from './subcomponents/PiggyBank/PiggyBankTransferComponent.js';
import PendingTransferComponent from './subcomponents/PiggyBank/PendingTransferComponent.js';


const Ownerfunc = require("../functions/OwnerFunctions.js");
const Contracts = require("../functions/Contracts.js");
const LoadFunc = require("../functions/LoadFunctions.js");
const Aux = require("../functions/AuxiliaryFunctions.js");


class PiggyBankComponent extends React.Component {
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
        await LoadFunc.LoadOwnersFunc(Contracts.AdminPiggyBank);
        await LoadFunc.LoadPiggyBankFunc(Contracts.AdminPiggyBank);
        this.setState({loading: false})
      }

    render(){
        return (
            <div>
              {(false == this.state.loading)? 
                <div>
                    <PiggyBankTransferComponent contract={Contracts.AdminPiggyBank} 
                      isOwner={Ownerfunc.isOwner}
                      refresh={this.refresh}/>
                    <br/>
                    {(Aux.account && Ownerfunc.isOwner)?
                      <PendingTransferComponent contract={Contracts.AdminPiggyBank} 
                        text="Check Pending Transfer"
                        refresh={this.refresh}/> 
                        :
                        null
                      }
                    <br/>
                    <hr class="bg-secondary"/>
                    <OwnerComponent contract={Contracts.AdminPiggyBank} 
                      isOwner={Ownerfunc.isOwner}
                      refresh={this.refresh}/>
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
  
export default PiggyBankComponent;