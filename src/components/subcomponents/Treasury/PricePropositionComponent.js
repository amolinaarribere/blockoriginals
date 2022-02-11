import React from 'react';
import ListPendingPropositionComponent from '../Vote/ListPendingPropositionComponent.js';
import UpgradePropositionComponent from '../Vote/UpgradePropositionComponent.js';
import ConfigurationComponent from '../Configuration/ConfigurationComponent.js';

const func = require("../../../functions/TreasuryFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");
const originalsFunc = require("../../../functions/OriginalsFunctions.js");
const address_0 = "0x0000000000000000000000000000000000000000"
const VoteFunc = require("../../../functions/VoteFunctions.js");
const Constants = require("../../../functions/Constants.js");
const VarDataType=[Constants.numberDataType,
  Constants.numberDataType,
  Constants.numberDataType,
  Constants.numberDataType,
  Constants.numberDataType,
  Constants.numberDataType,
  Constants.numberDataType,
  Constants.numberDataType,
  Constants.numberDataType]



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

    
    render(){
      return (
        <div>
           <ConfigurationComponent refresh={this.refresh}
                text="Fees"
                names={["New Issuer Fee",
                  "New Issuer Fee (Admin)",
                  "Minting Fee",
                  "Minting Fee (Admin)",
                  "Transfer Fee Amount Percentage",
                  "Transfer Fee Decimals",
                  "Transfer Fee Amount (Admin) Percentage",
                  "Transfer Fee Decimals (Admin)",
                  "Offers Life Time Seconds"]}
                values={[func.NewIssuerFee.toString(),
                   func.AdminNewIssuerFee.toString(),
                   func.MintingFee.toString(),
                   func.AdminMintingFee.toString(),
                   func.TransferFeeAmount.toString(),
                   func.TransferFeeDecimals.toString(),
                   func.AdminTransferFeeAmount.toString(),
                   func.AdminTransferFeeDecimals.toString(),
                   func.OffersLifeTime.toString()
                ]}/>

          {originalsFunc.isOwner ? (
              <div>
                <UpgradePropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Manage Prices"
                  textButton="Upgrade Prices"
                  names={["NewIsserFee",
                   "NewIsserFee(Admin)",
                   "NewMintingFee",
                   "NewMintingFee(Admin)",
                   "NewTransferFeeAmountPercentage",
                   "NewTransferFeeDecimals",
                   "NewTransferFeeAmountPercentage(Admin)",
                   "NewTransferFeeDecimals(Admin)",
                   "NewOfferLifeTimeSeconds"]}
                  types={["number", "number", "number", "number", "number", "number", "number", "number", "number"]}
                  dataType={VarDataType}/>

                  <br />

                <ListPendingPropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Check Pending Prices"
                  headers={["Pending New Issuer Fee",
                   "Pending New Issuer Fee (Admin)",
                   "Pending Minting Fee",
                   "Pending Minting Fee (Admin)",
                   "Pending Transfer Fee Amount Percentage",
                    "Pending Transfer Fee Decimals",
                    "Pending Transfer Fee Amount Percentage (Admin)",
                    "Pending Transfer Fee Decimals (Admin)",
                    "Pending Offers Life Time Seconds"]}
                  values={[func.PendingNewIssuerFee.toString(),
                    func.PendingAdminNewIssuerFee.toString(),
                    func.PendingMintingFee.toString(),
                    func.PendingAdminMintingFee.toString(),
                    func.PendingTransferFeeAmount.toString(),
                    func.PendingTransferFeeDecimals.toString() ,
                    func.PendingAdminTransferFeeAmount.toString() ,
                    func.PendingAdminTransferFeeDecimals.toString(),
                    func.PendingOffersLifeTime.toString()]}
                  PropStatus={this.state.PropStatus}
                  RemainingVotes={this.state.RemainingVotes}
                  dataType={VarDataType}/>

              </div>):null}
              <hr class="bg-secondary"/>

        </div>
      );
    }
  }
  
export default PricePropositionComponent;