import React from 'react';
import OwnerComponent from './subcomponents/Owners/OwnerComponent.js';
import LoadingComponent from './subcomponents/LoadingComponent.js';

const Ownerfunc = require("../functions/OwnerFunctions.js");
const Contracts = require("../functions/Contracts.js");
const LoadFunc = require("../functions/LoadFunctions.js");
const AuxFunc = require("../functions/AuxiliaryFunctions.js");



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
        this.setState({loading: false})
      }

    render(){
        return (
            <div>
              {(false == this.state.loading)? 
                <div>
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