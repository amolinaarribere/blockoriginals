import React from 'react';
import ListPendingPropositionComponent from '../Vote/ListPendingPropositionComponent.js';
import UpgradePropositionComponentDynamic from '../Vote/UpgradePropositionComponentDynamic.js';
import ConfigurationComponent from '../Configuration/ConfigurationComponent.js';
import BigNumber from 'bignumber.js';

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
    let TokenRelatedFeesNames = ["Payment Token",
      prefix + "New Issuer Fee",
      prefix + "New Issuer Fee (Admin)",
      prefix + "Minting Fee",
      prefix + "Minting Fee (Admin)"];

    if(list.length > 0) TokenRelatedFeesNames.push(" - ");
    

    let index = TokenRelatedFeesNames.length;

    for(let i=1; i < list.length; i++){
      TokenRelatedFeesNames[index++] = "Payment Token";
      TokenRelatedFeesNames[index++] = prefix + "New Issuer Fee";
      TokenRelatedFeesNames[index++] = prefix + "New Issuer Fee (Admin)";
      TokenRelatedFeesNames[index++] = prefix + "Minting Fee";
      TokenRelatedFeesNames[index++] = prefix + "Minting Fee (Admin)";
      TokenRelatedFeesNames[index++] =  " - ";
    }

    return TokenRelatedFeesNames;
  }

  getAllNamesFix(prefix){
    return [prefix + "Transfer Fee Amount - Percentage",
    prefix + "Transfer Fee Amount (Admin) - Percentage",
    prefix + "Offers Life Time - Seconds"];
  }

  getAllNamesFix2(prefix){
    return [prefix + "Transfer Fee Amount - Percentage",
    prefix + "Transfer Fee Decimals",
    prefix + "Transfer Fee Amount (Admin) - Percentage",
    prefix + "Transfer Fee Decimals (Admin)",
    prefix + "Offers Life Time - Seconds"];
  }

  getAllValues(values){
    let TokenRelatedFees = [];
    let index = 0;

    if(values[0].length == 0){
      TokenRelatedFees[index++] = "-";
      TokenRelatedFees[index++] = "-";
      TokenRelatedFees[index++] = "-";
      TokenRelatedFees[index++] = "-";
      TokenRelatedFees[index++] = "-";
    }
    else{
      for(let i=0; i < values[0].length; i++){
        TokenRelatedFees[index++] = (values[0][i] < PaymentsFunc.TokenSymbols.length)? PaymentsFunc.TokenSymbols[values[0][i]] : "NOT-DEFINED";
        TokenRelatedFees[index++] = values[1][i].toString();
        TokenRelatedFees[index++] = values[2][i].toString();
        TokenRelatedFees[index++] = values[3][i].toString();
        TokenRelatedFees[index++] = values[4][i].toString();
        TokenRelatedFees[index++] = "";
      }
    }

    let factor = (values[6].toString() != "-")? (new BigNumber(10)).pow(values[6]) : new BigNumber(1);
    TokenRelatedFees[index++] = (values[5].toString() != "-")? values[5].div(factor).toString() : values[5].toString();
    factor = (values[8].toString() != "-")? (new BigNumber(10)).pow(values[8]) : new BigNumber(1);
    TokenRelatedFees[index++] = (values[7].toString() != "-")? values[7].div(factor).toString() : values[7].toString();
    TokenRelatedFees[index++] = values[9].toString();

    return TokenRelatedFees;
  }

  getAllDataTypesDynamic(list){
    let TokenRelatedDataType = [Constants.intDataType,
      Constants.numberDataType,
      Constants.numberDataType,
      Constants.numberDataType,
      Constants.numberDataType];

    let index = TokenRelatedDataType.length;

    for(let i=1; i < list.length; i++){
      for(let j=0; j < 5; j++){
        if(j == 0) TokenRelatedDataType[index++] = Constants.intDataType;
        else TokenRelatedDataType[index++] = Constants.numberDataType;
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

  getAllTypesDynamic(){
    return ["number",
    "string",
    "string",
    "string",
    "string"];
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
                names={this.getAllNamesDynamic(func.NewIssuerFee, "").concat(this.getAllNamesFix(""))}
                values={
                  this.getAllValues([func.PaymentTokenId,
                    func.NewIssuerFee, 
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
                  DynamicNames={this.getAllNamesDynamic([], "")}
                  DynamicTypes={this.getAllTypesDynamic()}
                  DynamicDataType={this.getAllDataTypesDynamic([])}
                  FixNames={this.getAllNamesFix2("")}
                  FixTypes={this.getAllTypesFix()}
                  FixDataType={this.getAllDataTypesFix()}
                  Treasury={true}/>
                  <br />

                <ListPendingPropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Check Pending Prices"
                  headers={this.getAllNamesDynamic(func.PendingNewIssuerFee, "Pending").concat(this.getAllNamesFix("Pending"))}
                  values={this.getAllValues([func.PendingPaymentTokenId,
                    func.PendingNewIssuerFee, 
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