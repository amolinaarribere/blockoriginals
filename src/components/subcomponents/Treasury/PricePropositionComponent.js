import React from 'react';
import ListPendingPropositionComponent from '../Vote/ListPendingPropositionComponent.js';
import UpgradePropositionComponentDynamic from '../Vote/UpgradePropositionComponentDynamic.js';
import ConfigurationComponent from '../Configuration/ConfigurationComponent.js';

const func = require("../../../functions/TreasuryFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");
const originalsFunc = require("../../../functions/OriginalsFunctions.js");
const address_0 = "0x0000000000000000000000000000000000000000"
const VoteFunc = require("../../../functions/VoteFunctions.js");
const Constants = require("../../../functions/Constants.js");
const PaymentsFunc = require("../../../functions/PaymentsFunctions.js");


const VarDataType=[Constants.numberDataType,
  Constants.numberDataType,
  Constants.numberDataType,
  Constants.numberDataType,
  Constants.intDataType,
  Constants.intDataType,
  Constants.intDataType,
  Constants.intDataType,
  Constants.intDataType]



class PricePropositionComponent extends React.Component {
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
    };

  async refresh() {
    await this.LoadPropStatus();
  }

  async LoadPropStatus(){
      await loadFunc.LoadTreasuryConfigFunc(this.props.contract);
      if(originalsFunc.isOwner){
        var Status = await VoteFunc.PropositionStatus(this.props.contract);
        var Votes = ((Status[0] != address_0)?
          await VoteFunc.PropositionRemainingVotes(this.props.contract)
          : 0);
          this.setState({PropStatus: Status,
            RemainingVotes: Votes})
      }
  }

  getAllNamesDynamic(list, prefix){
    let TokenRelatedFeesNames = [];
    let index = 0;

    for(let i=0; i < list.length; i++){
      TokenRelatedFeesNames[index++] = "Payment Token Symbol -----------------------------------";
      TokenRelatedFeesNames[index++] = prefix + "New Issuer Fee";
      TokenRelatedFeesNames[index++] = prefix + "New Issuer Fee (Admin)";
      TokenRelatedFeesNames[index++] = prefix + "Minting Fee";
      TokenRelatedFeesNames[index++] = prefix + "Minting Fee (Admin)";
    }

    return TokenRelatedFeesNames;
  }

  getAllNamesFix(prefix){
    return [prefix + "Transfer Fee Amount - Percentage",
    prefix + "Transfer Fee Decimals",
    prefix + "Transfer Fee Amount (Admin) - Percentage",
    prefix + "Transfer Fee Decimals (Admin)",
    prefix + "Offers Life Time - Seconds"];
  }

  getAllValues(values){
    let TokenRelatedFees = [];
    let index = 0;

    for(let i=0; i < values[0].length; i++){
      TokenRelatedFees[index++] = (i < PaymentsFunc.TokenSymbols.length)? PaymentsFunc.TokenSymbols[i] : "NOT-DEFINED";
      TokenRelatedFees[index++] = values[0][i].toString();
      TokenRelatedFees[index++] = values[1][i].toString();
      TokenRelatedFees[index++] = values[2][i].toString();
      TokenRelatedFees[index++] = values[3][i].toString();
    }

    TokenRelatedFees[index++] = values[4].toString();
    TokenRelatedFees[index++] = values[5].toString();
    TokenRelatedFees[index++] = values[6].toString();
    TokenRelatedFees[index++] = values[7].toString();
    TokenRelatedFees[index++] = values[8].toString();

    return TokenRelatedFees;
  }

  getAllDataTypesDynamic(list){
    let TokenRelatedDataType = [Constants.numberDataType,
      Constants.numberDataType,
      Constants.numberDataType,
      Constants.numberDataType,
      Constants.numberDataType];

    let index = TokenRelatedDataType.length;

    for(let i=1; i < list.length; i++){
      for(let j=0; j < 5; j++){
        TokenRelatedDataType[index++] = Constants.numberDataType;
      }
    }

    return TokenRelatedDataType;
  }

  getAllDataTypesFix(){
    return [Constants.intDataType,
      Constants.intDataType,
      Constants.intDataType,
      Constants.intDataType,
      Constants.intDataType];
  }

  getAllTypesDynamic(list){
    let TokenRelatedType = ["number",
    "number",
    "number",
    "number",
    "number"];

    let index = TokenRelatedType.length;

    for(let i=0; i < list.length; i++){
      for(let j=0; j < 5; j++){
        TokenRelatedType[index++] = "number";
      }
    }

    return TokenRelatedType;
  }

  getAllTypesFix(){
    return ["number",
    "number",
    "number",
    "number",
    "number",];
  }

    
    render(){
      return (
        <div>
           <ConfigurationComponent refresh={this.refresh}
                text="Fees"
                names={this.getAllNamesDynamic(func.NewIssuerFee, "", true).concat(this.getAllNamesFix(""))}
                values={
                  this.getAllValues([func.NewIssuerFee, 
                    func.AdminNewIssuerFee, 
                    func.MintingFee, 
                    func.AdminMintingFee,
                    func.TransferFeeAmount,
                    func.TransferFeeDecimals,
                    func.AdminTransferFeeAmount,
                    func.AdminTransferFeeDecimals,
                    func.OffersLifeTime
                  ])}/>

          {originalsFunc.isOwner ? (
              <div>
                <UpgradePropositionComponentDynamic contract={this.props.contract}
                  refresh={this.refresh}
                  text="Manage Prices"
                  textButton="Upgrade Prices"
                  DynamicNames={this.getAllNamesDynamic(func.NewIssuerFee, "", false)}
                  DynamicTypes={this.getAllTypesDynamic(func.NewIssuerFee)}
                  DynamicDataType={this.getAllDataTypesDynamic(func.NewIssuerFee)}
                  FixNames={this.getAllNamesFix("")}
                  FixTypes={this.getAllTypesFix()}
                  FixDataType={this.getAllDataTypesFix()}/>
                  <br />

                <ListPendingPropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Check Pending Prices"
                  headers={this.getAllNamesDynamic(func.NewIssuerFee, "Pending", true).concat(this.getAllNamesFix("Pending"))}
                  values={this.getAllValues([func.PendingNewIssuerFee, 
                    func.PendingAdminNewIssuerFee, 
                    func.PendingMintingFee, 
                    func.PendingAdminMintingFee,
                    func.PendingTransferFeeAmount,
                    func.PendingTransferFeeDecimals,
                    func.PendingAdminTransferFeeAmount,
                    func.PendingAdminTransferFeeDecimals,
                    func.PendingOffersLifeTime
                  ])}
                  PropStatus={this.state.PropStatus}
                  RemainingVotes={this.state.RemainingVotes}
                  dataType={this.getAllDataTypesDynamic(func.PendingNewIssuerFee).concat(this.getAllDataTypesFix())}/>

              </div>):null}
              <hr class="bg-secondary"/>

        </div>
      );
    }
  }
  
export default PricePropositionComponent;