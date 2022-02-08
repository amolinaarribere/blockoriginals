  // Treasury
const Aux = require("./AuxiliaryFunctions.js");
const Manager = require("./ManagerFunctions.js");
const BigNumber = require('bignumber.js');

export var AccountBalanceWei = new BigNumber(0);
export var TreasuryBalanceWei = new BigNumber(0);
export var TreasuryAggregatedBalanceWei = new BigNumber(0);

export var NewIssuerFee = "";
export var AdminNewIssuerFee = "";
export var MintingFee = "";
export var AdminMintingFee = "";
export var TransferFeeAmount = "";
export var TransferFeeDecimals = "";
export var AdminTransferFeeAmount = "";
export var AdminTransferFeeDecimals = "";
export var OffersLifeTime = "";

export var PendingNewIssuerFee = "";
export var PendingAdminNewIssuerFee = "";
export var PendingMintingFee = "";
export var PendingAdminMintingFee = "";
export var PendingTransferFeeAmount = "";
export var PendingTransferFeeDecimals = "";
export var PendingAdminTransferFeeAmount = "";
export var PendingAdminTransferFeeDecimals = "";
export var PendingOffersLifeTime = "";


  export async function RetrievePricesTreasury(contract){
    try{
      let response = await contract.methods.retrieveSettings().call();

      NewIssuerFee = new BigNumber(response[0]).toString();
      AdminNewIssuerFee = new BigNumber(response[1]).toString();
      MintingFee = new BigNumber(response[2]).toString();
      AdminMintingFee = new BigNumber(response[3]).toString();
      TransferFeeAmount = new BigNumber(response[4]).toString();
      TransferFeeDecimals = new BigNumber(response[5]).toString();
      AdminTransferFeeAmount = new BigNumber(response[6]).toString();
      AdminTransferFeeDecimals = new BigNumber(response[7]).toString();
      OffersLifeTime = new BigNumber(response[8]).toString();


    }
    catch(e){
      window.alert("error retrieving the prices : " + JSON.stringify(e))
    }
  }

  export async function RetrievePendingPricesTreasury(contract){
    try{
      let response = await contract.methods.retrieveProposition().call();
      PendingNewIssuerFee = "-";
      PendingAdminNewIssuerFee = "-";
      PendingMintingFee = "-";
      PendingAdminMintingFee = "-";
      PendingTransferFeeAmount = "-";
      PendingTransferFeeDecimals = "-";
      PendingAdminTransferFeeAmount = "-";
      PendingAdminTransferFeeDecimals = "-";
      PendingOffersLifeTime = "-";

      if(response[0] != undefined)PendingNewIssuerFee = new BigNumber(response[0]).toString();
      if(response[1] != undefined)PendingAdminNewIssuerFee = new BigNumber(response[1]).toString();
      if(response[2] != undefined)PendingMintingFee = new BigNumber(response[2]).toString();
      if(response[3] != undefined)PendingAdminMintingFee = new BigNumber(response[3]).toString();
      if(response[4] != undefined)PendingTransferFeeAmount = new BigNumber(response[4]).toString();
      if(response[5] != undefined)PendingTransferFeeDecimals = new BigNumber(response[5]).toString();
      if(response[6] != undefined)PendingAdminTransferFeeAmount = new BigNumber(response[6]).toString();
      if(response[7] != undefined)PendingAdminTransferFeeDecimals = new BigNumber(response[7]).toString();
      if(response[8] != undefined)PendingOffersLifeTime = new BigNumber(response[8]).toString();

    }
    catch(e){
      window.alert("error retrieving the pending prices : " + JSON.stringify(e))
    }
    
  }

  export async function RetrieveBalance(address, contract){
    try{
      AccountBalanceWei = new BigNumber(0);
      if(address)AccountBalanceWei = new BigNumber(await contract.methods.retrieveFullBalance(address).call());
    }
    catch(e){
      window.alert("error retrieving the account's balance : " + JSON.stringify(e))
    }
  }

  export async function RetrieveTreasuryBalance(contract){
    try{
      TreasuryBalanceWei = new BigNumber(await Aux.web3.eth.getBalance(Manager.TreasuryAddressProxy));
      TreasuryAggregatedBalanceWei = new BigNumber(await contract.methods.retrieveAggregatedAmount().call());
    }
    catch(e){
      window.alert("error retrieving the treasury balance : " + JSON.stringify(e))
    }
  }

  export async function AssignDividends(contract){
    await Aux.CallBackFrame(contract.methods.AssignDividends().send({from: Aux.account }));
  }

  export async function WithdrawAmount(amount, contract){
    await Aux.CallBackFrame(contract.methods.withdraw(amount).send({from: Aux.account }));
  }

  export async function WithdrawAll(contract){
    await Aux.CallBackFrame(contract.methods.withdrawAll().send({from: Aux.account }));
  }