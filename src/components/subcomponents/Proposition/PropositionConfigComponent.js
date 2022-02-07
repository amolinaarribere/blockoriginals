import React from 'react';
import ListPendingPropositionComponent from '../Vote/ListPendingPropositionComponent.js';
import UpgradePropositionComponent from '../Vote/UpgradePropositionComponent.js';
import ConfigurationComponent from '../Configuration/ConfigurationComponent.js';

const originalsFunc = require("../../../functions/OriginalsFunctions.js");
const LoadFunc = require('../../../functions/LoadFunctions.js');
const Constants = require("../../../functions/Constants.js");
const func = require("../../../functions/PropositionFunctions.js");
const address_0 = "0x0000000000000000000000000000000000000000"
const VoteFunc = require("../../../functions/VoteFunctions.js");
const VarDataType=[Constants.intDataType,Constants.intDataType,Constants.intDataType]


class PropositionConfigComponent extends React.Component{
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
    await LoadFunc.LoadPropositionFunc(this.props.contract);
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
                  text="Proposition Configuration Parameters"
                  names={["Proposition Life Time", "Proposition Threshold", "Min To Propose"]}
                  values={[func.PropositionLifeTime,func.PropositionThreshold,func.MinToPropose]}/>

          {originalsFunc.isOwner ? (
              <div>
                <UpgradePropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Manage Proposition Configuration"
                  textButton="Upgrade Proposition Configuration"
                  names={["NewPropositionLifeTime", "NewPropositionThreshold", "NewMinToPropose"]}
                  types={["integer", "integer", "integer"]}
                  dataType={VarDataType}/>

                  <br />

                <ListPendingPropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Check Pending Proposition Config"
                  headers={["Pending Proposition Life Time", "Pending Proposition Threshold", "Pending Min To Propose"]}
                  values={[func.PendingPropositionLifeTime, func.PendingPropositionThreshold, func.PendingMinToPropose]}
                  PropStatus={this.state.PropStatus}
                  RemainingVotes={this.state.RemainingVotes}
                  dataType={VarDataType}/>

              </div>):null}
              <hr class="bg-secondary"/>
           </div>
         );
       }
  }

export default PropositionConfigComponent;