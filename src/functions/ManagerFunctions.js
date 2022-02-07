// Manager
const Aux = require("./AuxiliaryFunctions.js");


export var ProxyAdminAddress = ""
export var ManagerAddress = ""
export var ManagerAddressProxy = ""
export var publicPoolAddress = ""
export var publicPoolAddressProxy = ""
export var privatePoolFactoryAddress = ""
export var privatePoolFactoryAddressProxy = ""
export var privatePoolImplAddress = "";
export var providerFactoryAddress = ""
export var providerFactoryAddressProxy = ""
export var providerImplAddress = "";
export var TreasuryAddress = ""
export var TreasuryAddressProxy = ""
export var CertisTokenAddress = ""
export var CertisTokenAddressProxy = ""
export var PriceConverterAddress = ""
export var PriceConverterAddressProxy = ""
export var PropositionSettingsAddress = ""
export var PropositionSettingsAddressProxy = ""
export var ENSAddress = ""
export var ENSAddressProxy = ""

export var PendingManagerAddress = ""
export var PendingManagerInit = ""
export var PendingPublicPoolAddress = ""
export var PendingPublicPoolInit = ""
export var PendingPrivatePoolFactoryAddress = ""
export var PendingPrivatePoolFactoryInit = ""
export var PendingPrivatePoolImplAddress = "";
export var PendingProviderFactoryAddress = ""
export var PendingProviderFactoryInit = ""
export var PendingProviderImplAddress = "";
export var PendingTreasuryAddress = ""
export var PendingTreasuryInit = ""
export var PendingCertisTokenAddress = ""
export var PendingCertisTokenInit = ""
export var PendingPriceConverterAddress = ""
export var PendingPriceConverterInit = ""
export var PendingPropositionSettingsAddress = ""
export var PendingPropositionSettingsInit = ""
export var PendingENSAddress = ""
export var PendingENSInit = ""



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
  CertisTokenAddress = TransparentImpl[i];
  CertisTokenAddressProxy = TransparentProxies[i++];
  privatePoolFactoryAddress = TransparentImpl[i];
  privatePoolFactoryAddressProxy = TransparentProxies[i++];
  providerFactoryAddress = TransparentImpl[i];
  providerFactoryAddressProxy = TransparentProxies[i++];
  PriceConverterAddress = TransparentImpl[i];
  PriceConverterAddressProxy = TransparentProxies[i++];
  PropositionSettingsAddress = TransparentImpl[i];
  PropositionSettingsAddressProxy = TransparentProxies[i++];
  ENSAddress = TransparentImpl[i];
  ENSAddressProxy = TransparentProxies[i++];

  let j=0;
  privatePoolImplAddress = BeaconsImpl[j++];
  providerImplAddress = BeaconsImpl[j++];
}
  
  
  export async function RetrievePendingContractsAddresses(contract){
    try{
      let result = await contract.methods.retrieveProposition().call();
      PendingManagerAddress = "-";
      PendingPublicPoolAddress = "-";
      PendingTreasuryAddress = "-";
      PendingCertisTokenAddress = "-";
      PendingPrivatePoolFactoryAddress = "-";
      PendingProviderFactoryAddress = "-";
      PendingPriceConverterAddress = "-";
      PendingPropositionSettingsAddress = "-";
      PendingENSAddress = "-";
      PendingPrivatePoolImplAddress = "-";
      PendingProviderImplAddress = "-";

      PendingManagerInit = "-";
      PendingPublicPoolInit = "-";
      PendingTreasuryInit = "-";
      PendingCertisTokenInit = "-";
      PendingPrivatePoolFactoryInit = "-";
      PendingProviderFactoryInit = "-";
      PendingPriceConverterInit = "-";
      PendingPropositionSettingsInit = "-";
      PendingENSInit = "-";

      let i=2;
      if(result[i] != undefined)PendingManagerAddress = Aux.Bytes32ToAddress(result[i++]);
      if(result[i] != undefined)PendingPublicPoolAddress = Aux.Bytes32ToAddress(result[i++]);
      if(result[i] != undefined)PendingTreasuryAddress = Aux.Bytes32ToAddress(result[i++]);
      if(result[i] != undefined)PendingCertisTokenAddress = Aux.Bytes32ToAddress(result[i++]);
      if(result[i] != undefined)PendingPrivatePoolFactoryAddress = Aux.Bytes32ToAddress(result[i++]);
      if(result[i] != undefined)PendingProviderFactoryAddress = Aux.Bytes32ToAddress(result[i++]);
      if(result[i] != undefined)PendingPriceConverterAddress = Aux.Bytes32ToAddress(result[i++]);
      if(result[i] != undefined)PendingPropositionSettingsAddress = Aux.Bytes32ToAddress(result[i++]);
      if(result[i] != undefined)PendingENSAddress = Aux.Bytes32ToAddress(result[i++]);
      if(result[i] != undefined)PendingPrivatePoolImplAddress = Aux.Bytes32ToAddress(result[i++]);
      if(result[i] != undefined)PendingProviderImplAddress = Aux.Bytes32ToAddress(result[i++]);

      if(result[i] != undefined)PendingManagerInit = result[i++];
      if(result[i] != undefined)PendingPublicPoolInit = result[i++];
      if(result[i] != undefined)PendingTreasuryInit = result[i++];
      if(result[i] != undefined)PendingCertisTokenInit = result[i++];
      if(result[i] != undefined)PendingPrivatePoolFactoryInit = result[i++];
      if(result[i] != undefined)PendingProviderFactoryInit = result[i++];
      if(result[i] != undefined)PendingPriceConverterInit = result[i++];
      if(result[i] != undefined)PendingPropositionSettingsInit = result[i++];
      if(result[i] != undefined)PendingENSInit = result[i++];

    }
    catch(e){
      window.alert("error retrieving the pending contract addresses : " + JSON.stringify(e))
    }
    
  }
