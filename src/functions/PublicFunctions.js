import { NFTMARKET_ABI } from '../config'

const Aux = require("./AuxiliaryFunctions.js");
const PaymentsFunc = require("./PaymentsFunctions.js");
const ContractsFunc = require("./Contracts.js");
const ValidationFunc = require("./ValidationFunctions.js");
const TreasuryFunc = require("./TreasuryFunctions.js");


export var Markets = ""
export var pendingMarkets = ""
export var Credits = ""



export async function AddMarket(owner, name, symbol, feeAmount, feeDecimals, payment, FromCredit, contract, paymentTokenID){
    let CheckOwner = ValidationFunc.validateAddress(owner);
    let CheckName = ValidationFunc.validateString(name);
    let CheckSymbol = ValidationFunc.validateString(symbol);
    let CheckFeeAmount = ValidationFunc.validatePositiveLargeInteger(feeAmount);
    let CheckFeeDecimals = ValidationFunc.validatePositiveInteger(feeDecimals);
    let CheckPayment = ValidationFunc.validatePositiveInteger(payment);
    let CheckCredit = ValidationFunc.validateBoolean(FromCredit);
    let CheckPaymentID = ValidationFunc.validatePositiveInteger(paymentTokenID);

    if(true == CheckOwner &&
        true == CheckFeeAmount[1] &&
        true == CheckFeeDecimals[1] &&
        true == CheckPayment[1] &&
        true == CheckCredit &&
        true == CheckPaymentID[1]){

          if(CheckPaymentID[0] < PaymentsFunc.TokenAddresses.length  &&
            PaymentsFunc.TokenAddresses[CheckPaymentID[0]].active == true){
                let price = (TreasuryFunc.NewIssuerFee[CheckPaymentID[0]].plus(TreasuryFunc.AdminNewIssuerFee[CheckPaymentID[0]])).multipliedBy(PaymentsFunc.TokenDecimalsFactors[CheckPaymentID[0]]);
                if(FromCredit == false)await PaymentsFunc.CheckAllowance(Aux.account, ContractsFunc.Payments._address, price, CheckPaymentID[0]);
                await Aux.CallBackFrame(contract.methods.requestIssuer(Aux.returnIssuerObject(owner, CheckName, CheckSymbol, CheckFeeAmount[0].toString(), CheckFeeDecimals[0], CheckPayment[0]), FromCredit, CheckPaymentID[0]).send({from: Aux.account}));
          }
          else{
            window.alert("The token ID is not accepted : " + CheckPaymentID[0])
          }

      }
      else{
        ValidationFunc.FormatErrorMessage([CheckOwner, CheckFeeAmount[1], CheckFeeDecimals[1], CheckPayment[1], CheckCredit, CheckPaymentID[1]], ["Owner", "Fee", "Decimals", "Payment Type", "From Credit", "Payment ID"]);
      }
 }
  
export async function ValidateMarket(marketid, contract){
    let CheckMarketId = ValidationFunc.validatePositiveLargeInteger(marketid);

    if(true == CheckMarketId[1]){
        await Aux.CallBackFrame(contract.methods.validateIssuer(CheckMarketId[0]).send({from: Aux.account }));
    }
    else{
        ValidationFunc.FormatErrorMessage([CheckMarketId[1]], ["Market ID"]);
    }
}
    
export async function RejectMarket(marketid, contract){
  let CheckMarketId = ValidationFunc.validatePositiveLargeInteger(marketid);

  if(true == CheckMarketId[1]){
    await Aux.CallBackFrame(contract.methods.rejectIssuer(CheckMarketId[0]).send({from: Aux.account }));
  }
  else{
    ValidationFunc.FormatErrorMessage([CheckMarketId[1]], ["Market ID"]);
  }
}

export async function RetrieveMarkets(contract){
    try{
        let issuers = await contract.methods.retrieveIssuers().call();
        Markets = [];

        for (let i = 0; i < issuers.length; i++) {
            let marketAddress = await contract.methods.retrieveNFTMarketForIssuer(issuers[i]).call();
            let market = await new Aux.web3.eth.Contract(NFTMARKET_ABI, marketAddress);
            let issuer = await market.methods.retrieveIssuer().call();
            Markets[i] = [issuers[i], marketAddress, issuer[0]._owner, issuer[0]._name, issuer[0]._symbol, issuer[0]._feeAmount, issuer[0]._feeDecimals, issuer[0]._paymentPlan, issuer[1]];
        }

        let pendingIssuers = await contract.methods.retrievePendingIssuers().call();
        pendingMarkets = [];

        for (let i = 0; i < pendingIssuers.length; i++) {
            let pendingIssuer = await contract.methods.retrievePendingIssuer(pendingIssuers[i]).call();
            pendingMarkets[i] = [pendingIssuers[i], pendingIssuer._issuer._owner, pendingIssuer._issuer._name, pendingIssuer._issuer._symbol, pendingIssuer._issuer._feeAmount, pendingIssuer._issuer._feeDecimals, pendingIssuer._issuer._paymentPlan];
        }
    }
    catch(e){
      window.alert("error retrieving the markets : " + JSON.stringify(e))
    }
    
}



