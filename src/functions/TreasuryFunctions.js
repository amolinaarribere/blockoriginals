// Treasury
const Aux = require("./AuxiliaryFunctions.js");
const Manager = require("./ManagerFunctions.js");
const BigNumber = require('bignumber.js');
const PaymentsFunc = require("./PaymentsFunctions.js");
const ValidationFunc = require("./ValidationFunctions.js");


export var AccountBalance = "";
export var TreasuryBalance = "";
export var TreasuryAggregatedBalance = "";

export var PaymentTokenId = "";
export var NewIssuerFee = "";
export var AdminNewIssuerFee = "";
export var MintingFee = "";
export var AdminMintingFee = "";
export var TransferFeeAmount = "";
export var TransferFeeDecimals = "";
export var AdminTransferFeeAmount = "";
export var AdminTransferFeeDecimals = "";
export var OffersLifeTime = "";

export var PendingPaymentTokenId = "";
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

      PaymentTokenId = []
      NewIssuerFee = []
      AdminNewIssuerFee = []
      MintingFee = []
      AdminMintingFee = []

      for(let i=0; i < response[0].length; i++){
        PaymentTokenId[i] = i;
        let Factor = (i < PaymentsFunc.TokenDecimalsFactors.length) ? PaymentsFunc.TokenDecimalsFactors[i] : PaymentsFunc.TokenDecimalsFactors[0];
        NewIssuerFee[i] = new BigNumber(response[0][i][0]).dividedBy(Factor);
        AdminNewIssuerFee[i] = new BigNumber(response[0][i][1]).dividedBy(Factor);
        MintingFee[i] = new BigNumber(response[0][i][2]).dividedBy(Factor);
        AdminMintingFee[i] = new BigNumber(response[0][i][3]).dividedBy(Factor);
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

      PendingPaymentTokenId = []
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
      PendingPaymentTokenId[i] = parseInt(response[count++]);
      let Factor = (PendingPaymentTokenId[i] < PaymentsFunc.TokenDecimalsFactors.length) ? PaymentsFunc.TokenDecimalsFactors[PendingPaymentTokenId[i]] : PaymentsFunc.TokenDecimalsFactors[0];
      PendingNewIssuerFee[i] = new BigNumber(response[count++]).dividedBy(Factor);
      PendingAdminNewIssuerFee[i] = new BigNumber(response[count++]).dividedBy(Factor);
      PendingMintingFee[i] = new BigNumber(response[count++]).dividedBy(Factor);
      PendingAdminMintingFee[i] = new BigNumber(response[count++]).dividedBy(Factor);
      }

      if(response[count] != undefined) PendingTransferFeeAmount = new BigNumber(response[count++]);
      if(response[count] != undefined) PendingTransferFeeDecimals = new BigNumber(response[count++]);
      if(response[count] != undefined) PendingAdminTransferFeeAmount = new BigNumber(response[count++]);
      if(response[count] != undefined) PendingAdminTransferFeeDecimals = new BigNumber(response[count++]);
      if(response[count] != undefined) PendingOffersLifeTime = new BigNumber(response[count++]);
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
    let CheckTokenId = ValidationFunc.validatePositiveLargeInteger(TokenID);
    let CheckAmount = ValidationFunc.validatePositiveFloat(amount);

    if(true == CheckTokenId[1] &&
      true == CheckAmount[1]){
        if(CheckTokenId[0] < PaymentsFunc.TokenDecimalsFactors.length){
          let factor = PaymentsFunc.TokenDecimalsFactors[CheckTokenId[0]];
          CheckAmount[0] = CheckAmount[0].multipliedBy(factor).toFixed(0).toString();
          await Aux.CallBackFrame(contract.methods.withdraw(CheckAmount[0], CheckTokenId[0]).send({from: Aux.account }));
        }
        else{
          window.alert("The token ID is not accepted")
        }
    }
    else{
      ValidationFunc.FormatErrorMessage([CheckTokenId[1], CheckAmount[1]], ["Token ID", "Amount"]);
    }
    
  }

  export async function WithdrawAll(contract, TokenID){
    let CheckTokenId = ValidationFunc.validatePositiveLargeInteger(TokenID);

    if(true == CheckTokenId[1]){
        if(CheckTokenId[0] < PaymentsFunc.TokenAddresses.length){
          await Aux.CallBackFrame(contract.methods.withdrawAll(CheckTokenId[0]).send({from: Aux.account }));
        }
        else{
            window.alert("Token ID not supported")
        }
    }
    else{
      ValidationFunc.FormatErrorMessage([CheckTokenId[1]], ["Token ID"]);
    }
}