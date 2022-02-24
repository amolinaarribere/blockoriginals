// Manager
const Aux = require("./AuxiliaryFunctions.js");

export var ProxyAdminAddress = ""
export var ManagerAddress = ""
export var ManagerAddressProxy = ""
export var publicPoolAddress = ""
export var publicPoolAddressProxy = ""
export var nftMarketImplAddress = "";
export var TreasuryAddress = ""
export var TreasuryAddressProxy = ""
export var OriginalsTokenAddress = ""
export var OriginalsTokenAddressProxy = ""
export var PropositionSettingsAddress = ""
export var PropositionSettingsAddressProxy = ""
export var PiggyBankAddress = ""
export var PiggyBankAddressProxy = ""
export var PaymentsAddress = ""
export var PaymentsAddressProxy = ""

export var PendingManagerAddress = ""
export var PendingManagerInit = ""
export var PendingPublicPoolAddress = ""
export var PendingPublicPoolInit = ""
export var PendingnftMarketImplAddress = "";
export var PendingTreasuryAddress = ""
export var PendingTreasuryInit = ""
export var PendingOriginalsTokenAddress = ""
export var PendingOriginalsTokenInit = ""
export var PendingPropositionSettingsAddress = ""
export var PendingPropositionSettingsInit = ""
export var PendingPiggyBankAddress = ""
export var PendingPiggyBankInit = ""
export var PendingPaymentsAddress = ""
export var PendingPaymentsInit = ""


export async function RetrieveContractsAddresses(contract){
  let TransparentProxies = await contract.methods.retrieveTransparentProxies().call();
  let TransparentImpl = await contract.methods.retrieveTransparentProxiesImpl().call();
  let BeaconsImpl = await contract.methods.retrieveBeaconsImpl().call();
  ProxyAdminAddress = await contract.methods.retrieveProxyAdmin().call();

  let i=0;
  ManagerAddress = TransparentImpl[i];
  ManagerAddressProxy =  TransparentProxies[i++];
  publicPoolAddress = TransparentImpl[i];
  publicPoolAddressProxy =  TransparentProxies[i++];
  TreasuryAddress = TransparentImpl[i];
  TreasuryAddressProxy = TransparentProxies[i++];
  OriginalsTokenAddress = TransparentImpl[i];
  OriginalsTokenAddressProxy = TransparentProxies[i++];
  PropositionSettingsAddress = TransparentImpl[i];
  PropositionSettingsAddressProxy = TransparentProxies[i++];
  PiggyBankAddress = TransparentImpl[i];
  PiggyBankAddressProxy = TransparentProxies[i++];
  PaymentsAddress = TransparentImpl[i];
  PaymentsAddressProxy = TransparentProxies[i++];

  let j=0;
  nftMarketImplAddress = BeaconsImpl[j++];
}
  
  
  export async function RetrievePendingContractsAddresses(contract){
    try{
      let result = await contract.methods.retrieveProposition().call();
      PendingManagerAddress = "-";
      PendingPublicPoolAddress = "-";
      PendingTreasuryAddress = "-";
      PendingOriginalsTokenAddress = "-";
      PendingPropositionSettingsAddress = "-";
      PendingPiggyBankAddress = "-";
      PendingPaymentsAddress = "-";
      PendingnftMarketImplAddress = "-";

      PendingManagerInit = "-";
      PendingPublicPoolInit = "-";
      PendingTreasuryInit = "-";
      PendingOriginalsTokenInit = "-";
      PendingPropositionSettingsInit = "-";
      PendingPiggyBankInit = "-";
      PendingPaymentsInit = "-"

      let i=2;
      if(result[i] != undefined)PendingManagerAddress = Aux.Bytes32ToAddress(result[i++]);
      if(result[i] != undefined)PendingPublicPoolAddress = Aux.Bytes32ToAddress(result[i++]);
      if(result[i] != undefined)PendingTreasuryAddress = Aux.Bytes32ToAddress(result[i++]);
      if(result[i] != undefined)PendingOriginalsTokenAddress = Aux.Bytes32ToAddress(result[i++]);
      if(result[i] != undefined)PendingPropositionSettingsAddress = Aux.Bytes32ToAddress(result[i++]);
      if(result[i] != undefined)PendingPiggyBankAddress = Aux.Bytes32ToAddress(result[i++]);
      if(result[i] != undefined)PendingPaymentsAddress = Aux.Bytes32ToAddress(result[i++]);
      if(result[i] != undefined)PendingnftMarketImplAddress = Aux.Bytes32ToAddress(result[i++]);

      if(result[i] != undefined)PendingManagerInit = result[i++];
      if(result[i] != undefined)PendingPublicPoolInit = result[i++];
      if(result[i] != undefined)PendingTreasuryInit = result[i++];
      if(result[i] != undefined)PendingOriginalsTokenInit = result[i++];
      if(result[i] != undefined)PendingPropositionSettingsInit = result[i++];
      if(result[i] != undefined)PendingPiggyBankInit = result[i++];
      if(result[i] != undefined)PendingPaymentsInit = result[i++];

    }
    catch(e){
      window.alert("error retrieving the pending contract addresses : " + JSON.stringify(e))
    }
    
  }
