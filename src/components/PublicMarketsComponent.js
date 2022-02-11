import React from 'react';
import OwnerComponent from './subcomponents/Owners/OwnerComponent.js';
import LoadingComponent from './subcomponents/LoadingComponent.js';
import PublicComponent from './subcomponents/Public/PublicComponent.js';
import NFTMarketComponent from './subcomponents/NFTMarkets/NFTMarketComponent.js';


const Ownerfunc = require("../functions/OwnerFunctions.js");
const Contracts = require("../functions/Contracts.js");
const LoadFunc = require("../functions/LoadFunctions.js");


class PublicMarketsComponent extends React.Component {
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
        await LoadFunc.LoadOwnersFunc(Contracts.publicPool);
        this.setState({loading: false})
      }

    render(){
        return (
            <div>
              {(false == this.state.loading)? 
                <div>
                    <PublicComponent contract={Contracts.publicPool} 
                      isOwner={Ownerfunc.isOwner}
                      refresh={this.refresh}/>
                    <NFTMarketComponent contract={Contracts.publicPool} 
                      refresh={this.refresh}/>
                    {(true == Ownerfunc.isOwner)?
                      <div>
                        <OwnerComponent contract={Contracts.publicPool} 
                          isOwner={Ownerfunc.isOwner}
                          refresh={this.refresh}/>
                      </div>
                    :
                    null}
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
  
export default PublicMarketsComponent;