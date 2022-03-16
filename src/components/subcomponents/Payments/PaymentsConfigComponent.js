import React from 'react';
import ListPendingPropositionComponent from '../Vote/ListPendingPropositionComponent.js';
import UpgradePropositionComponentDynamic from '../Vote/UpgradePropositionComponentDynamic.js';
import ConfigurationComponent from '../Configuration/ConfigurationComponent.js';

const originalsFunc = require("../../../functions/OriginalsFunctions.js");
const LoadFunc = require('../../../functions/LoadFunctions.js');
const Constants = require("../../../functions/Constants.js");
const func = require("../../../functions/PaymentsFunctions.js");
const address_0 = "0x0000000000000000000000000000000000000000"
const VoteFunc = require("../../../functions/VoteFunctions.js");


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

  getAllNamesDynamic(list){
    let TokenRelatedNames = ["Payment Token ID",
      "Token Symbol",
      "Token Address",
      "Token active",
      "-"];

    let index = TokenRelatedNames.length;

    for(let i=1; i < list.length; i++){
      TokenRelatedNames[index++] = "Payment Token ID";
      TokenRelatedNames[index++] = "Token Symbol";
      TokenRelatedNames[index++] = "Token Address";
      TokenRelatedNames[index++] = "Token active";
      TokenRelatedNames[index++] = " - ";

    }

    return TokenRelatedNames;
  }

  getAllNamesDynamicPending(list){
    let TokenRelatedNames = ["Payment Token ID",
      "Token Address"];

    if(list.length > 0)TokenRelatedNames.push(" - ");

    let index = TokenRelatedNames.length;

    for(let i=1; i < list.length; i++){
      TokenRelatedNames[index++] = "Payment Token ID";
      TokenRelatedNames[index++] = "Token Address";
      TokenRelatedNames[index++] = " - ";
    }

    return TokenRelatedNames;
  }

  getAllValues(values, symbols){
    let TokenRelated = [];
    let index = 0;
    let id = 0;


    for(let i=0; i < values.length; i++){
      TokenRelated[index++] = id++;
      TokenRelated[index++] = symbols[i];
      TokenRelated[index++] = values[i].TokenContract;
      TokenRelated[index++] = values[i].active.toString();
      TokenRelated[index++] = "";
    }

    return TokenRelated;
  }

  getAllValuesPending(values){
    let TokenRelated = [];
    let index = 0;

    for(let i=0; i < values[0].length; i++){
      TokenRelated[index++] = values[0][i];
      TokenRelated[index++] = values[1][i];
      TokenRelated[index++] = "";
    }

    return TokenRelated;
  }

  getAllDataTypesDynamic(list){
    let TokenRelatedDataType = [Constants.intDataType,
      Constants.addressDataType,
      Constants.intDataType];

    let index = TokenRelatedDataType.length;

    for(let i=1; i < list.length; i++){
      for(let j=0; j < 3; j++){
        if(j == 1) TokenRelatedDataType[index++] = Constants.addressDataType;
        else TokenRelatedDataType[index++] = Constants.intDataType;
      }
    }

    return TokenRelatedDataType;
  }

  getAllDataTypesDynamicPending(list){
    let TokenRelatedDataType = [Constants.intDataType,
      Constants.addressDataType];

    let index = TokenRelatedDataType.length;

    for(let i=1; i < list.length; i++){
      for(let j=0; j < 2; j++){
        if(j == 1) TokenRelatedDataType[index++] = Constants.addressDataType;
        else TokenRelatedDataType[index++] = Constants.intDataType;
      }
    }

    return TokenRelatedDataType;
  }

  getAllTypesDynamic(){
    return ["number",
    "string"];
  }


   render(){
         return (
           <div>
            <ConfigurationComponent refresh={this.refresh}
                text="Payment Token"
                names={this.getAllNamesDynamic(func.TokenAddresses)}
                values={this.getAllValues(func.TokenAddresses, func.TokenSymbols)}/>

          {originalsFunc.isOwner ? (
              <div>

            <UpgradePropositionComponentDynamic contract={this.props.contract}
                  refresh={this.refresh}
                  text="Manage Payment Token"
                  textButton="Upgrade Payment Token"
                  DynamicNames={this.getAllNamesDynamicPending([])}
                  DynamicTypes={this.getAllTypesDynamic()}
                  DynamicDataType={this.getAllDataTypesDynamicPending([])}
                  FixNames={[]}
                  FixTypes={[]}
                  FixDataType={[]}
                  Treasury={false}/>
                  <br />

            <ListPendingPropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Check Pending Payment Token"
                  headers={this.getAllNamesDynamicPending(func.PendingTokenAddresses)}
                  values={this.getAllValuesPending([func.PendingTokenIndex, func.PendingTokenAddresses])}
                  PropStatus={this.state.PropStatus}
                  RemainingVotes={this.state.RemainingVotes}
                  dataType={this.getAllDataTypesDynamicPending(func.PendingTokenIndex)}/>

              </div>):null}
              <hr class="bg-secondary"/>
           </div>
         );
       }
  }

export default PaymentsConfigComponent;