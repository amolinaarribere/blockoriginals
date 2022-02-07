import { ADMIN_ABI, 
  MANAGER_PROXY_ADDRESS, 
  CERTIFICATE_POOL_MANAGER_ABI, 
  PUBLIC_ABI, 
  PRIVATEFACTORY_ABI, 
  PROVIDERFACTORY_ABI, 
  TREASURY_ABI, 
  CERTIS_ABI, 
  PRICECONVERTER_ABI, 
  PROPOSITIONSETTINGS_ABI,
  ENS_ABI,
  AdminRights,
  MumbaiNode } from '../config'

const ProviderPoolFunc = require("./ProviderPoolFunctions.js");
const OwnersFunc = require("./OwnerFunctions.js");
const FactoriesFunc = require("./FactoriesFunctions.js");
const TreasuryFunc = require("./TreasuryFunctions.js");
const PropositionFunc = require("./PropositionFunctions.js");
const CertisFunc = require("./OriginalsFunctions.js");
const CertificateFunc = require("./CertificateFunctions.js");
const Contracts = require("./Contracts.js");
const ManagerFunc = require("./ManagerFunctions.js");
const PriceConverterFunc = require("./PriceConverterFunctions.js");
const ENSFunc = require("./ENSFunctions.js");
const BrowserStorageFunc = require("./BrowserStorageFunctions.js");


const Aux = require("./AuxiliaryFunctions.js");

export var chairPerson = ""
export var balance = ""
export var Network = ""
export var Admin = AdminRights;

export async function LoadProvider(){
  try{
    console.log("web3 loading provider")
    if(window.ethereum){

      window.ethereum.on('chainChanged', async function (chainId) {
        console.log("chain changed to : " + chainId)
        BrowserStorageFunc.WriteKey(BrowserStorageFunc.privatePoolKey, "");
        BrowserStorageFunc.WriteKey(BrowserStorageFunc.providerKey, "");
        window.location.reload();
      });
      window.ethereum.on('accountsChanged', async function (accounts) {
        if(Aux.account){
          console.log("account changed to : " + accounts[0])
          await ConnectNewAccount(accounts[0]);
          window.location.reload();
        }
      })

      Aux.LoadWeb3();
    }
   else{
     Aux.LoadWeb3ToNode(MumbaiNode);
   }
  }
  catch(e){
    window.alert("Error Loading the Provider " + JSON.stringify(e));
  }
}

export async function ReadAccount(){
  try{
    console.log("reading account from wallet")
    if(window.ethereum){
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await ConnectNewAccount(accounts[0]);
    }
   else{
     window.alert('Metamask not detected');
   }
  }
  catch(e){
    if (e.code === 4001) {
      window.alert('Please connect to a Wallet in order to use the dApp.');
    } else {
      window.alert(e);
    }
  }
  
}

export async function ConnectNewAccount(account){
  await Aux.setAccount(account);
  await ResetAccount();
  console.log("account " + account + " connected")
}

export async function DisconnectAccount(){
  try{
    console.log("disconnecting account from wallet")
    if(window.ethereum){
      Aux.removeAccount();
      await ResetAccount();
      console.log("wallet disconnected")
    }
   else{
     window.alert('Metamask not detected');
   }
  }
  catch(e){
    if (e.code === 4001) {
      window.alert('Please connect to a Wallet in order to use the dApp.');
    } else {
      window.alert(e);
    }
  }
  
}

async function ResetAccount(){
  await LoadCertisFunc(Contracts.CertisToken)
  await LoadTreasuryStateFunc(Contracts.Treasury);
}

async function LoadNetwork(){
  console.log("loading network")
  Network = await Aux.web3.eth.net.getNetworkType();

  if("rinkeby" == Network) Contracts.setCertificatePoolManager(await new Aux.web3.eth.Contract(CERTIFICATE_POOL_MANAGER_ABI, MANAGER_PROXY_ADDRESS.rinkeby))
  else if("ropsten" == Network) Contracts.setCertificatePoolManager(await new Aux.web3.eth.Contract(CERTIFICATE_POOL_MANAGER_ABI, MANAGER_PROXY_ADDRESS.ropsten))
  else if("kovan" == Network) Contracts.setCertificatePoolManager(await new Aux.web3.eth.Contract(CERTIFICATE_POOL_MANAGER_ABI, MANAGER_PROXY_ADDRESS.kovan))
  //else if("private" == Network) Contracts.setCertificatePoolManager(await new Aux.web3.eth.Contract(CERTIFICATE_POOL_MANAGER_ABI, MANAGER_PROXY_ADDRESS.ganache))
  else{
      Network = "Mumbai";
      Contracts.setCertificatePoolManager(await new Aux.web3.eth.Contract(CERTIFICATE_POOL_MANAGER_ABI, MANAGER_PROXY_ADDRESS.mumbai))
  }
  console.log("network loaded : " + Network)
}

async function LoadContracts(){
  console.log("loading contracts")

  await LoadManagerFunc(Contracts.certificatePoolManager);

  Contracts.setPublicPool(await new Aux.web3.eth.Contract(PUBLIC_ABI, ManagerFunc.publicPoolAddressProxy))
  Contracts.setPrivatePoolFactory(await new Aux.web3.eth.Contract(PRIVATEFACTORY_ABI, ManagerFunc.privatePoolFactoryAddressProxy))
  Contracts.setProviderFactory(await new Aux.web3.eth.Contract(PROVIDERFACTORY_ABI, ManagerFunc.providerFactoryAddressProxy))
  Contracts.setTreasury(await new Aux.web3.eth.Contract(TREASURY_ABI, ManagerFunc.TreasuryAddressProxy))
  Contracts.setCertisToken(await new Aux.web3.eth.Contract(CERTIS_ABI, ManagerFunc.CertisTokenAddressProxy))
  Contracts.setPriceConverter(await new Aux.web3.eth.Contract(PRICECONVERTER_ABI, ManagerFunc.PriceConverterAddressProxy))
  Contracts.setPropositionSettings(await new Aux.web3.eth.Contract(PROPOSITIONSETTINGS_ABI, ManagerFunc.PropositionSettingsAddressProxy))
  Contracts.setENS(await new Aux.web3.eth.Contract(ENS_ABI, ManagerFunc.ENSAddressProxy))

  console.log("contracts loaded")
}

export async function LoadBlockchain() {
  try {
    console.log("loading blockchain")
    await LoadProvider();
    await LoadNetwork();
    await LoadContracts();
    
    await LoadPropositionFunc(Contracts.PropositionSettings);
    await LoadPriceConverterFunc(Contracts.PriceConverter);
    await LoadTreasuryConfigFunc(Contracts.Treasury)
    await LoadCertisFunc(Contracts.CertisToken)
    await LoadENSFunc(Contracts.ENS);
    console.log("blockchain loaded")

  } catch (e) {
    window.alert("error retrieving the main contract addresses " + JSON.stringify(e));
  }
  
}

export async function LoadManagerFunc(contract) {
  console.log("loading Manager Contract State");

  await Promise.all([ManagerFunc.RetrieveContractsAddresses(contract), 
    ManagerFunc.RetrievePendingContractsAddresses(contract)]);

  console.log("Manager Contract State Loaded");
}

export async function LoadCertisFunc(contract) {
  console.log("loading Certis Contract State");

  await Promise.all([CertisFunc.isTokenOwner(Aux.account, contract), 
    CertisFunc.totalSupply(contract),
    CertisFunc.balanceOf(Aux.account, contract)]);

  console.log("Certis Contract State Loaded");
}

export async function LoadPropositionFunc(contract) {
  console.log("loading Proposition Contract State");

  await Promise.all([PropositionFunc.RetrieveProposition(contract),
    PropositionFunc.RetrievePendingProposition(contract)]);

    console.log("Proposition Contract State Loaded");
}

export async function LoadTreasuryStateFunc(contract) {
  console.log("loading Treasury Contract State");

  await Promise.all([TreasuryFunc.RetrievePricesTreasury(contract), 
    TreasuryFunc.RetrievePendingPricesTreasury(contract),
    TreasuryFunc.RetrieveBalance(Aux.account, contract),
    TreasuryFunc.RetrieveTreasuryBalance(contract)]);

  console.log("Treasury Contract State Loaded");
}

export async function LoadTreasuryConfigFunc(contract) {
  console.log("loading Treasury Configuration only");

  await Promise.all([TreasuryFunc.RetrievePricesTreasury(contract), 
    TreasuryFunc.RetrievePendingPricesTreasury(contract)]);
  
    console.log("Treasury Configuration Loaded");
}

export async function LoadTreasuryPrices(contract) {
  console.log("loading Treasury Prices only");

  await TreasuryFunc.RetrievePricesTreasury(contract);

  console.log("Treasury Prices Loaded");
}

export async function LoadPriceConverterFunc(contract) {
  console.log("loading Price Converter Contract State");

  await Promise.all([PriceConverterFunc.RetrieveRegistryAddress(contract),
    PriceConverterFunc.RetrievePendingRegistryAddress(contract)]);

  console.log("Price Converter Contract State Loaded");
}

export async function LoadENSFunc(contract) {
  console.log("loading ENS Contract State");

  await Promise.all([ENSFunc.RetrieveENSConfig(contract),
    ENSFunc.RetrievePendingENSConfig(contract)]);

  console.log("ENS Contract State Loaded");
}

export async function LoadProviderPoolFunc(contractType, contract) {
  console.log("loading Providers/Pools for contract " + contract._address);

  await ProviderPoolFunc.RetrieveProviderPool(contractType, contract);

  console.log("Providers/Pools for contract " + contract._address + " Loaded");
}

export async function LoadOwnersFunc(contract) {
  console.log("loading Owners for contract " + contract._address);

  await OwnersFunc.RetrieveOwners(contract);

  console.log("Owners for contract " + contract._address + " Loaded");
}

export async function LoadFactoriesFunc(contract, contractType) {
  console.log("loading Factories for contract " + contract._address);

  await FactoriesFunc.RetrieveFactories(contract, contractType);

  console.log("Factories for contract " + contract._address + " Loaded");
}

export async function LoadCertificateFunc(contract) {
  console.log("loading Pending Certificates for contract " + contract._address);

  await CertificateFunc.RetrievePendingCertificates(contract);

  console.log("Pending Certificates for contract " + contract._address + " Loaded");
}


  