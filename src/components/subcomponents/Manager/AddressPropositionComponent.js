import React from 'react';
import ListPendingPropositionComponent from '../Vote/ListPendingPropositionComponent.js';
import UpgradePropositionComponent from '../Vote/UpgradePropositionComponent.js';
import ConfigurationComponent from '../Configuration/ConfigurationComponent.js';

const ManagerFunc = require("../../../functions/ManagerFunctions.js");
const originalsFunc = require("../../../functions/OriginalsFunctions.js");
const address_0 = "0x0000000000000000000000000000000000000000";
const loadFunc = require("../../../functions/LoadFunctions.js");
const Constants = require("../../../functions/Constants.js");
const VoteFunc = require("../../../functions/VoteFunctions.js");
const VarDataType=[Constants.intDataType,
  Constants.intDataType,
  Constants.addressDataType,
  Constants.addressDataType,
  Constants.addressDataType,
  Constants.addressDataType,
  Constants.addressDataType,
  Constants.addressDataType,
  Constants.addressDataType,
  Constants.bytesDataType,
  Constants.bytesDataType,
  Constants.bytesDataType,
  Constants.bytesDataType,
  Constants.bytesDataType,
  Constants.bytesDataType]


class AddressPropositionComponent extends React.Component {
  constructor(props) {
    super(props)
    loadFunc.LoadManagerFunc(this.props.contract);
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
    await loadFunc.LoadManagerFunc(this.props.contract);
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
                  text="Contract Proxies Addresses"
                  names={["Proxy Admin",
                    "Manager Address",
                    "Public Address", 
                    "Treasury Address", 
                    "Originals Token Address",
                    "Proposition Settings Address", 
                    "Piggy Bank Address"
                   ]}
                  values={[ManagerFunc.ProxyAdminAddress,
                    ManagerFunc.ManagerAddressProxy,
                    ManagerFunc.publicPoolAddressProxy,
                    ManagerFunc.TreasuryAddressProxy,
                    ManagerFunc.OriginalsTokenAddressProxy,
                    ManagerFunc.PropositionSettingsAddressProxy,
                    ManagerFunc.PiggyBankAddressProxy
                   ]}/>

          <ConfigurationComponent refresh={this.refresh}
                  text="Contract Implementation Addresses"
                  names={["Manager Address",
                    "Public Address", 
                    "Treasury Address", 
                    "Originals Token Address",
                    "Proposition Settings Address", 
                    "Piggy Bank Address",
                    "NFT Market Address"
                    ]}
                  values={[ManagerFunc.ManagerAddress,
                    ManagerFunc.publicPoolAddress,
                    ManagerFunc.TreasuryAddress,
                    ManagerFunc.OriginalsTokenAddress,
                    ManagerFunc.PropositionSettingsAddress,
                    ManagerFunc.PiggyBankAddress,
                    ManagerFunc.nftMarketImplAddress
                    ]}/>

          {originalsFunc.isOwner ? (
              <div>
                <UpgradePropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Manage Contracts"
                  textButton="Submit Contracts"
                  names={["NewTransparent",
                   "NewBeacons",
                   "NewManagerAddress", 
                   "NewPublicPoolAddress", 
                   "NewTreasuryAddress",               
                   "NewOriginalsTokenAddress",
                   "NewPropositionSettingsAddress",
                   "NewPiggyBankAddress",
                   "NewNFTMarketAddress",
                   "ManagerInit",
                   "PublicInit",
                   "TreasuryInit",
                   "OriginalsInit",
                   "PropositionInit",
                   "PiggyBankInit"
                  ]}
                  types={["hidden", "hidden",
                    "text", "text", "text", "text", "text", "text", "text",
                   "text", "text", "text", "text", "text", "text"]}
                  dataType={VarDataType}/>

                  <br />

                <ListPendingPropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Check Pending Contracts"
                  headers={["Pending Manager Address", 
                  "ManagerInit",
                  "Pending Public Address", 
                  "PublicInit",
                  "Pending Treasury Address",   
                  "TreasuryInit",            
                  "Pending Originals Token Address",
                  "OriginalsInit",
                  "Pending NFT Market Address",
                  "Pending Proposition Settings Address",
                  "PropositionInit",
                  "Pending Piggy Bank Address",
                  "PiggyBankInit"]}
                  values={[ManagerFunc.PendingManagerAddress, 
                    ManagerFunc.PendingManagerInit,
                    ManagerFunc.PendingPublicPoolAddress, 
                    ManagerFunc.PendingPublicPoolInit,
                    ManagerFunc.PendingTreasuryAddress, 
                    ManagerFunc.PendingTreasuryInit,
                    ManagerFunc.PendingOriginalsTokenAddress,
                    ManagerFunc.PendingOriginalsTokenInit,
                    ManagerFunc.PendingnftMarketImplAddress,
                    ManagerFunc.PendingPropositionSettingsAddress,
                    ManagerFunc.PendingPropositionSettingsInit,
                    ManagerFunc.PendingPiggyBankAddress,
                    ManagerFunc.PendingPiggyBankInit
                ]}
                  PropStatus={this.state.PropStatus}
                  RemainingVotes={this.state.RemainingVotes}
                  dataType={VarDataType}/>

              </div>):null}
              <hr class="bg-secondary"/>
        </div>
      );
    }
  }
  
export default AddressPropositionComponent;