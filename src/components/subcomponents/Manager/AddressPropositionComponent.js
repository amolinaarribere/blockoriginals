import React from 'react';
import ListPendingPropositionComponent from '../Vote/ListPendingPropositionComponent.js';
import UpgradePropositionComponent from '../Vote/UpgradePropositionComponent.js';
import ConfigurationComponent from '../Configuration/ConfigurationComponent.js';

const ManagerFunc = require("../../../functions/ManagerFunctions.js");
const certFunc = require("../../../functions/OriginalsFunctions.js");
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
  Constants.addressDataType,
  Constants.addressDataType,
  Constants.addressDataType,
  Constants.addressDataType,
  Constants.bytesDataType,
  Constants.bytesDataType,
  Constants.bytesDataType,
  Constants.bytesDataType,
  Constants.bytesDataType,
  Constants.bytesDataType,
  Constants.bytesDataType,
  Constants.bytesDataType,
  Constants.bytesDataType,
  Constants.stringDataType,
  Constants.stringDataType]


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
    if(certFunc.isOwner){
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
                    "Certis Token Address",
                    "Private Factory Address", 
                    "Provider Factory Address",
                    "Price Converter Address",
                    "Proposition Settings Address", 
                    "ENS Address"
                   ]}
                  values={[ManagerFunc.ProxyAdminAddress,
                    ManagerFunc.ManagerAddressProxy,
                    ManagerFunc.publicPoolAddressProxy,
                    ManagerFunc.TreasuryAddressProxy,
                    ManagerFunc.CertisTokenAddressProxy,
                    ManagerFunc.privatePoolFactoryAddressProxy,
                    ManagerFunc.providerFactoryAddressProxy,
                    ManagerFunc.PriceConverterAddressProxy,
                    ManagerFunc.PropositionSettingsAddressProxy,
                    ManagerFunc.ENSAddressProxy
                   ]}/>

          <ConfigurationComponent refresh={this.refresh}
                  text="Contract Implementation Addresses"
                  names={["Manager Address",
                    "Public Address", 
                    "Treasury Address", 
                    "Certis Token Address",
                    "Private Factory Address", 
                    "Provider Factory Address",
                    "Price Converter Address",
                    "Proposition Settings Address", 
                    "ENS Address",
                    "Private Address",
                    "Provider Address",
                    ]}
                  values={[ManagerFunc.ManagerAddress,
                    ManagerFunc.publicPoolAddress,
                    ManagerFunc.TreasuryAddress,
                    ManagerFunc.CertisTokenAddress,
                    ManagerFunc.privatePoolFactoryAddress,
                    ManagerFunc.providerFactoryAddress,
                    ManagerFunc.PriceConverterAddress,
                    ManagerFunc.PropositionSettingsAddress,
                    ManagerFunc.ENSAddress,
                    ManagerFunc.privatePoolImplAddress,
                    ManagerFunc.providerImplAddress
                    ]}/>

          {certFunc.isOwner ? (
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
                   "NewCertisTokenAddress",
                   "NewPrivatePoolFactoryAddress",
                   "NewProviderFactoryAddress",
                   "NewPriceConverterAddress",
                   "NewPropositionSettingsAddress",
                   "NewENSAddress",
                   "NewPrivatePoolAddress",
                   "NewProviderAddress",
                   "ManagerInit",
                   "PublicInit",
                   "TreasuryInit",
                   "CertisInit",
                   "PriceConverterInit",
                   "PropositionInit",
                   "ENSInit",
                   "PrivatePoolFactoryInit",
                   "ProviderFactoryInit",
                   "NewPrivateContractName",
                   "NewPrivateContractVersion"
                   ]}
                  types={["hidden", "hidden",
                    "text", "text", "text", "text", "text", "text", "text", "text", "text",
                   "text", "text", "text",
                   "text", "text", "text", "text", "text", "text",
                   "text", "text",
                   "hidden", "hidden"]}
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
                  "Pending Certis Token Address",
                  "CertisInit",
                  "Pending Private Pool Factory Address",
                  "PrivatePoolFactoryInit",
                  "Pending Private Pool Address",
                  "Pending Provider Factory Address",
                  "ProviderFactoryInit",
                  "Pending Provider Address",
                  "Pending Price Converter Address",
                  "PriceConverterInit",
                  "Pending Proposition Settings Address",
                  "PropositionInit",
                  "Pending ENS Address",
                  "ENSInit"]}
                  values={[ManagerFunc.PendingManagerAddress, 
                    ManagerFunc.PendingManagerInit,
                    ManagerFunc.PendingPublicPoolAddress, 
                    ManagerFunc.PendingPublicPoolInit,
                    ManagerFunc.PendingTreasuryAddress, 
                    ManagerFunc.PendingTreasuryInit,
                    ManagerFunc.PendingCertisTokenAddress,
                    ManagerFunc.PendingCertisTokenInit,
                    ManagerFunc.PendingPrivatePoolFactoryAddress,
                    ManagerFunc.PendingPrivatePoolFactoryInit,
                    ManagerFunc.PendingPrivatePoolImplAddress,
                    ManagerFunc.PendingProviderFactoryAddress,
                    ManagerFunc.PendingProviderFactoryInit,
                    ManagerFunc.PendingProviderImplAddress,
                    ManagerFunc.PendingPriceConverterAddress,
                    ManagerFunc.PendingPriceConverterInit,
                    ManagerFunc.PendingPropositionSettingsAddress,
                    ManagerFunc.PendingPropositionSettingsInit,
                    ManagerFunc.PendingENSAddress,
                    ManagerFunc.PendingENSInit
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