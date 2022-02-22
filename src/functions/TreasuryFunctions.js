// Treasury
const Aux = require("./AuxiliaryFunctions.js");
const Manager = require("./ManagerFunctions.js");
const BigNumber = require('bignumber.js');
const PaymentsFunc = require("./PaymentsFunctions.js");


export var AccountBalance = new BigNumber(0);
export var TreasuryBalance = new BigNumber(0);
export var TreasuryAggregatedBalance = new BigNumber(0);

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

      NewIssuerFee = new BigNumber(response[0]).dividedBy(PaymentsFunc.TokenDecimalsFactor);
      AdminNewIssuerFee = new BigNumber(response[1]).dividedBy(PaymentsFunc.TokenDecimalsFactor);
      MintingFee = new BigNumber(response[2]).dividedBy(PaymentsFunc.TokenDecimalsFactor);
      AdminMintingFee = new BigNumber(response[3]).dividedBy(PaymentsFunc.TokenDecimalsFactor);
      TransferFeeAmount = new BigNumber(response[4]);
      TransferFeeDecimals = new BigNumber(response[5]);
      AdminTransferFeeAmount = new BigNumber(response[6]);
      AdminTransferFeeDecimals = new BigNumber(response[7]);
      OffersLifeTime = new BigNumber(response[8]);
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

      if(response[0] != undefined)PendingNewIssuerFee = new BigNumber(response[0]).dividedBy(PaymentsFunc.TokenDecimalsFactor);
      if(response[1] != undefined)PendingAdminNewIssuerFee = new BigNumber(response[1]).dividedBy(PaymentsFunc.TokenDecimalsFactor);
      if(response[2] != undefined)PendingMintingFee = new BigNumber(response[2]).dividedBy(PaymentsFunc.TokenDecimalsFactor);
      if(response[3] != undefined)PendingAdminMintingFee = new BigNumber(response[3]).dividedBy(PaymentsFunc.TokenDecimalsFactor);
      if(response[4] != undefined)PendingTransferFeeAmount = new BigNumber(response[4]);
      if(response[5] != undefined)PendingTransferFeeDecimals = new BigNumber(response[5]);
      if(response[6] != undefined)PendingAdminTransferFeeAmount = new BigNumber(response[6]);
      if(response[7] != undefined)PendingAdminTransferFeeDecimals = new BigNumber(response[7]);
      if(response[8] != undefined)PendingOffersLifeTime = new BigNumber(response[8]);

    }
    catch(e){
      window.alert("error retrieving the pending prices : " + JSON.stringify(e))
    }
    
  }

  export async function RetrieveBalance(address, contract){
    try{
      AccountBalance = new BigNumber(0);
      if(address)AccountBalance = new BigNumber(await contract.methods.retrieveFullBalance(address).call()).dividedBy(PaymentsFunc.TokenDecimalsFactor);
    }
    catch(e){
      window.alert("error retrieving the account's balance : " + JSON.stringify(e))
    }
  }

  export async function RetrieveTreasuryBalance(contract){
    try{
      TreasuryBalance = new BigNumber(await PaymentsFunc.GetBalanceOf(Manager.TreasuryAddressProxy)).dividedBy(PaymentsFunc.TokenDecimalsFactor);
      TreasuryAggregatedBalance = new BigNumber(await contract.methods.retrieveAggregatedAmount().call()).dividedBy(PaymentsFunc.TokenDecimalsFactor);
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