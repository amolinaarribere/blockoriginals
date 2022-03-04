// Treasury
const Aux = require("./AuxiliaryFunctions.js");
const Manager = require("./ManagerFunctions.js");
const BigNumber = require('bignumber.js');
const PaymentsFunc = require("./PaymentsFunctions.js");


export var AccountBalance = "";
export var TreasuryBalance = "";
export var TreasuryAggregatedBalance = "";

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
      NewIssuerFee = []
      AdminNewIssuerFee = []
      MintingFee = []
      AdminMintingFee = []

      for(let i=0; i < response[0].length; i++){
        NewIssuerFee[i] = new BigNumber(response[0][i][1]).dividedBy(PaymentsFunc.TokenDecimalsFactors[i]);
        AdminNewIssuerFee[i] = new BigNumber(response[0][i][2]).dividedBy(PaymentsFunc.TokenDecimalsFactors[i]);
        MintingFee[i] = new BigNumber(response[0][i][3]).dividedBy(PaymentsFunc.TokenDecimalsFactors[i]);
        AdminMintingFee[i] = new BigNumber(response[0][i][4]).dividedBy(PaymentsFunc.TokenDecimalsFactors[i]);
      }

      TransferFeeAmount = new BigNumber(response[1][0]);
      TransferFeeDecimals = new BigNumber(response[1][1]);
      AdminTransferFeeAmount = new BigNumber(response[1][2]);
      AdminTransferFeeDecimals = new BigNumber(response[1][3]);
      OffersLifeTime = new BigNumber(response[2][0]);
    }
    catch(e){
      window.alert("error retrieving the prices : " + JSON.stringify(e))
    }
  }

  export async function RetrievePendingPricesTreasury(contract){
    try{
      let response = await contract.methods.retrieveProposition().call();

      PendingNewIssuerFee = [];
      PendingAdminNewIssuerFee = [];
      PendingMintingFee = [];
      PendingAdminMintingFee = [];
      PendingTransferFeeAmount = "-";
      PendingTransferFeeDecimals = "-";
      PendingAdminTransferFeeAmount = "-";
      PendingAdminTransferFeeDecimals = "-";
      PendingOffersLifeTime = "-";

      let numberOfTokens = 0;
      let FeesPerToken = 0;
      let numberOfTransferFees = 0;

      let count = 0;

      if(response[count] != undefined)numberOfTokens = new BigNumber(response[count++]);
      if(response[count] != undefined)FeesPerToken = new BigNumber(response[count++]);
      if(response[count] != undefined)numberOfTransferFees = new BigNumber(response[count++]);

     for(let i=0; i < numberOfTokens; i++){
      PendingNewIssuerFee[i] = new BigNumber(response[count++]).dividedBy(PaymentsFunc.TokenDecimalsFactors[i]);
      PendingAdminNewIssuerFee[i] = new BigNumber(response[count++]).dividedBy(PaymentsFunc.TokenDecimalsFactors[i]);
      PendingMintingFee[i] = new BigNumber(response[count++]).dividedBy(PaymentsFunc.TokenDecimalsFactors[i]);
      PendingAdminMintingFee[i] = new BigNumber(response[count++]).dividedBy(PaymentsFunc.TokenDecimalsFactors[i]);
    }

     PendingTransferFeeAmount = new BigNumber(response[count++]);
     PendingTransferFeeDecimals = new BigNumber(response[count++]);
     PendingAdminTransferFeeAmount = new BigNumber(response[count++]);
     PendingAdminTransferFeeDecimals = new BigNumber(response[count++]);
     PendingOffersLifeTime = new BigNumber(response[count++]);

    }
    catch(e){
      window.alert("error retrieving the pending prices : " + JSON.stringify(e))
    }
    
  }

  export async function RetrieveBalance(address, contract){
    try{
      AccountBalance = [];
      if(address){
        for(let i=0; i < PaymentsFunc.TokenDecimalsFactors.length; i++){
          AccountBalance[i] = new BigNumber(await contract.methods.retrieveFullBalance(address, i).call()).dividedBy(PaymentsFunc.TokenDecimalsFactors[i]);
        }
      }
    }
    catch(e){
      window.alert("error retrieving the account's balance : " + JSON.stringify(e))
    }
  }

  export async function RetrieveTreasuryBalance(contract){
    try{
      TreasuryBalance = []
      TreasuryAggregatedBalance = []
      for(let i=0; i < PaymentsFunc.TokenDecimalsFactors.length; i++){
        TreasuryBalance[i] = new BigNumber(await PaymentsFunc.GetBalanceOf(Manager.TreasuryAddressProxy, i)).dividedBy(PaymentsFunc.TokenDecimalsFactors[i]);
        TreasuryAggregatedBalance[i] = new BigNumber(await contract.methods.retrieveAggregatedAmount(i).call()).dividedBy(PaymentsFunc.TokenDecimalsFactors[i]);
      }
    }
    catch(e){
      window.alert("error retrieving the treasury balance : " + JSON.stringify(e))
    }
  }

  export async function WithdrawAmount(amount, contract, TokenID){
    await Aux.CallBackFrame(contract.methods.withdraw(amount, TokenID).send({from: Aux.account }));
  }

  export async function WithdrawAll(contract, TokenID){
    await Aux.CallBackFrame(contract.methods.withdrawAll(TokenID).send({from: Aux.account }));
  }