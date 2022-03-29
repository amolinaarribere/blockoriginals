import { MANAGER_PROXY_ADDRESS, 
  MANAGER_ABI, 
  PUBLIC_ABI,
  TREASURY_ABI, 
  ORIGINALS_ABI, 
  PROPOSITIONSETTINGS_ABI,
  ADMINPIGGYBANK_ABI,
  PAYMENTS_ABI,
  MARKETSCREDITS_ABI,
  AdminRights,
  MumbaiNode } from '../config'

const OwnersFunc = require("./OwnerFunctions.js");
const TreasuryFunc = require("./TreasuryFunctions.js");
const PropositionFunc = require("./PropositionFunctions.js");
const OriginalsFunc = require("./OriginalsFunctions.js");
const Contracts = require("./Contracts.js");
const ManagerFunc = require("./ManagerFunctions.js");
const PiggyBankFunc = require("./AdminPiggyBankFunctions.js");
const PublicFunc = require("./PublicFunctions.js");
const PaymentsFunc = require("./PaymentsFunctions.js");
const MarketsCreditsFunc = require("./MarketsCreditsFunctions.js");

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
        BrowserStorageFunc.WriteKey(BrowserStorageFunc.nftmarketKey, "");
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
     window.alert('Wallet not detected');
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
  await LoadOriginalsFunc(Contracts.OriginalsToken)
  await LoadTreasuryStateFunc(Contracts.Treasury);
}

async function LoadNetwork(){
  console.log("loading network")
  Network = await Aux.web3.eth.net.getNetworkType();

  if("rinkeby" == Network) Contracts.setManager(await new Aux.web3.eth.Contract(MANAGER_ABI, MANAGER_PROXY_ADDRESS.rinkeby))
  else if("ropsten" == Network) Contracts.setManager(await new Aux.web3.eth.Contract(MANAGER_ABI, MANAGER_PROXY_ADDRESS.ropsten))
  else if("kovan" == Network) Contracts.setManager(await new Aux.web3.eth.Contract(MANAGER_ABI, MANAGER_PROXY_ADDRESS.kovan))
  else if("private" == Network) Contracts.setManager(await new Aux.web3.eth.Contract(MANAGER_ABI, MANAGER_PROXY_ADDRESS.ganache))
  else{
      Network = "Mumbai";
      Contracts.setManager(await new Aux.web3.eth.Contract(MANAGER_ABI, MANAGER_PROXY_ADDRESS.mumbai))
  }
  console.log("network loaded : " + Network)
}

async function LoadContracts(){
  console.log("loading contracts")

  await LoadManagerFunc(Contracts.Manager);

  Contracts.setPublicPool(await new Aux.web3.eth.Contract(PUBLIC_ABI, ManagerFunc.publicPoolAddressProxy))
  Contracts.setTreasury(await new Aux.web3.eth.Contract(TREASURY_ABI, ManagerFunc.TreasuryAddressProxy))
  Contracts.setOriginalsToken(await new Aux.web3.eth.Contract(ORIGINALS_ABI, ManagerFunc.OriginalsTokenAddressProxy))
  Contracts.setPropositionSettings(await new Aux.web3.eth.Contract(PROPOSITIONSETTINGS_ABI, ManagerFunc.PropositionSettingsAddressProxy))
  Contracts.setPiggyBank(await new Aux.web3.eth.Contract(ADMINPIGGYBANK_ABI, ManagerFunc.PiggyBankAddressProxy))
  Contracts.setPayments(await new Aux.web3.eth.Contract(PAYMENTS_ABI, ManagerFunc.PaymentsAddressProxy))
  Contracts.setMarketsCredits(await new Aux.web3.eth.Contract(MARKETSCREDITS_ABI, ManagerFunc.MarketsCreditsAddressProxy))

  console.log("contracts loaded")
}

export async function LoadBlockchain() {
  try {
    console.log("loading blockchain")
    await LoadProvider();
    await LoadNetwork();
    await LoadContracts();
    
    await LoadPaymentsFunc(Contracts.Payments)
    await LoadPropositionFunc(Contracts.PropositionSettings);
    await LoadTreasuryConfigFunc(Contracts.Treasury)
    await LoadOriginalsFunc(Contracts.OriginalsToken)
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

export async function LoadOriginalsFunc(contract) {
  console.log("loading Originals Contract State");

  await Promise.all([OriginalsFunc.isTokenOwner(Aux.account, contract), 
    OriginalsFunc.totalSupply(contract),
    OriginalsFunc.balanceOf(Aux.account, contract)]);

  console.log("Originals Contract State Loaded");
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

export async function LoadOwnersFunc(contract) {
  console.log("loading Owners for contract " + contract._address);

  await OwnersFunc.RetrieveOwners(contract);

  console.log("Owners for contract " + contract._address + " Loaded");
}

export async function LoadPiggyBankFunc(contract) {
  console.log("loading Piggy Bank Contract State");

  await Promise.all([PiggyBankFunc.RetrieveTransferInfo(contract), 
    PiggyBankFunc.RetrievePiggyBankBalance()]);

  console.log("Piggy Bank Contract State Loaded");
}

export async function LoadPublicFunc(contract) {
  console.log("loading Public Contract State");

  await PublicFunc.RetrieveMarkets(contract);

  console.log("Public Contract State Loaded");
}

export async function LoadMarketsCreditsFunc(contract) {
  console.log("loading Markets Credits Contract State");

  await MarketsCreditsFunc.RetrieveCredit(contract);

  console.log("Markets Credits Contract State Loaded");
}

export async function LoadPaymentsFunc(contract) {
  console.log("loading Payments Contract State");

  await Promise.all([PaymentsFunc.RetrieveTokenAddresses(contract),
    PaymentsFunc.RetrievePendingTokenAddresses(contract)]);

  console.log("Payments Contract State Loaded");
}

  