import React from 'react';
import SendNewProposalComponent from './SendNewProposalComponent.js';
import ManageMarketsComponent from './ManageMarketsComponent.js';
import ListPendingMarketsComponent from './ListPendingMarketsComponent.js';
import CreditComponent from './CreditComponent.js';
import LoadingComponent from '../LoadingComponent.js';

const LoadFunc = require("../../../functions/LoadFunctions.js");
const Treasury = require("../../../functions/TreasuryFunctions.js");


class PublicComponent extends React.Component {
    async componentWillMount() {
        await this.refreshPartial();
    }
    
    state = {
        loading : false,
    };
    
    constructor(props) {
        super(props)
        this.refresh = this.refresh.bind(this)
    }
        
    async refreshPartial() {
        this.setState({loading: true})
        await LoadFunc.LoadPublicFunc(this.props.contract);
        this.setState({loading: false})
    }

    async refresh() {
        await this.props.refresh()
    }

    render(){
        return (
          <div>
            {(false == this.state.loading)? 
                <div>
                    <SendNewProposalComponent contract={this.props.contract} 
                      price={Treasury.NewIssuerFee.plus(Treasury.AdminNewIssuerFee)}
                      refresh={this.refresh}/>
                    <br/>
                    {
                      (this.props.isOwner)?(
                        <div>
                            <ManageMarketsComponent contract={this.props.contract}
                              refresh={this.refresh}/>
                            <br/>
                            <ListPendingMarketsComponent contract={this.props.contract} />
                            <br/>
                        </div>
                        ):null}
                    <hr class="bg-secondary"/>
                    <CreditComponent contract={this.props.contract} 
                      refresh={this.refresh}/>
                    <hr class="bg-secondary"/>

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

export default PublicComponent;