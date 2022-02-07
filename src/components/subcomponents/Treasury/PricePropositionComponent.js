import React from 'react';
import ListPendingPropositionComponent from '../Vote/ListPendingPropositionComponent.js';
import UpgradePropositionComponent from '../Vote/UpgradePropositionComponent.js';
import ConfigurationComponent from '../Configuration/ConfigurationComponent.js';

const func = require("../../../functions/TreasuryFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");
const certFunc = require("../../../functions/OriginalsFunctions.js");
const address_0 = "0x0000000000000000000000000000000000000000"
const VoteFunc = require("../../../functions/VoteFunctions.js");
const Constants = require("../../../functions/Constants.js");
const VarDataType=[Constants.numberDataType,
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
                  text="Prices (USD)"
                  names={["Submit New Provider to Public Pool Price",
                   "Create New Private Pool Price",
                   "Create New Provider Price",
                   "Send Certificate to Public Pool Price",
                   "Refund Fee"]}
                  values={[func.PublicPriceUSD,
                    func.PrivatePriceUSD,
                    func.ProviderPriceUSD,
                    func.CertificatePriceUSD,
                    func.OwnerRefundFeeUSD]}/>

          {certFunc.isOwner ? (
              <div>
                <UpgradePropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Manage Prices"
                  textButton="Upgrade Prices"
                  names={["NewPublicPriceUSD",
                   "NewPrivatePriceUSD",
                   "NewProviderPriceUSD",
                   "NewCertificatePriceUSD",
                   "NewOwnerRefundFeeUSD"]}
                  types={["number", "number", "number", "number", "number"]}
                  dataType={VarDataType}/>

                  <br />

                <ListPendingPropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Check Pending Prices"
                  headers={["Pending Public Price",
                   "Pending Private Price",
                   "Pending Provider Price",
                   "Pending Certificate Price",
                   "Pending Refund Fee"]}
                  values={[func.PendingPublicPriceUSD,
                    func.PendingPrivatePriceUSD,
                    func.PendingProviderPriceUSD,
                    func.PendingCertificatePriceUSD,
                    func.PendingOwnerRefundFeeUSD]}
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