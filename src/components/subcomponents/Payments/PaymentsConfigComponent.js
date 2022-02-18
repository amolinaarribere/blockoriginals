import React from 'react';
import ListPendingPropositionComponent from '../Vote/ListPendingPropositionComponent.js';
import UpgradePropositionComponent from '../Vote/UpgradePropositionComponent.js';
import ConfigurationComponent from '../Configuration/ConfigurationComponent.js';

const originalsFunc = require("../../../functions/OriginalsFunctions.js");
const LoadFunc = require('../../../functions/LoadFunctions.js');
const Constants = require("../../../functions/Constants.js");
const func = require("../../../functions/PaymentsFunctions.js");
const address_0 = "0x0000000000000000000000000000000000000000"
const VoteFunc = require("../../../functions/VoteFunctions.js");
const VarDataType=[Constants.addressDataType]


class PaymentsConfigComponent extends React.Component{
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  async componentWillMount() {
    await this.LoadPropStatus();
 }

  state = {
    PropStatus: [],
    RemainingVotes: ""
  }

  async refresh() {
    await LoadFunc.LoadPaymentsFunc(this.props.contract);
    await this.LoadPropStatus();
  }

  async LoadPropStatus(){
    if(originalsFunc.isOwner){
      var Status = await VoteFunc.PropositionStatus(this.props.contract);
      var Votes = ((Status[0] != address_0)?
        await VoteFunc.PropositionRemainingVotes(this.props.contract)
        : 0);
        this.setState({PropStatus: Status,
          RemainingVotes: Votes})
    }
  }

       render(){
         return (
           <div>
             <ConfigurationComponent refresh={this.refresh}
                  text="Payment Token"
                  names={["Token Address"]}
                  values={[func.TokenAddress]}/>

          {originalsFunc.isOwner ? (
              <div>
                <UpgradePropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Manage Payment Token"
                  textButton="Upgrade Payment Token"
                  names={["NewTokenAddress"]}
                  types={["text"]}
                  dataType={VarDataType}/>

                  <br />

                <ListPendingPropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Check Pending Payment Token"
                  headers={["Pending Payment Token"]}
                  values={[func.PendingTokenAddress]}
                  PropStatus={this.state.PropStatus}
                  RemainingVotes={this.state.RemainingVotes}
                  dataType={VarDataType}/>

              </div>):null}
              <hr class="bg-secondary"/>
           </div>
         );
       }
  }

export default PaymentsConfigComponent;