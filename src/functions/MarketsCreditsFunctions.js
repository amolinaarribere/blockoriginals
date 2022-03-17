const BigNumber = require('bignumber.js');
const Aux = require("./AuxiliaryFunctions.js");
const PaymentsFunc = require("./PaymentsFunctions.js");
const ContractsFunc = require("./Contracts.js");
const ValidationFunc = require("./ValidationFunctions.js");


export var Credits = []



export async function SendCredit(receiver, amount, contract, paymentTokenID){
    let CheckReceiver = ValidationFunc.validateAddress(receiver);
    let CheckAmount = ValidationFunc.validatePositiveFloat(amount);
    let CheckPaymentID = ValidationFunc.validatePositiveInteger(paymentTokenID);
    let success = true;

    if(true == CheckReceiver &&
        true == CheckAmount[1] &&
        true == CheckPaymentID[1]){
        if(CheckPaymentID[0] < PaymentsFunc.TokenAddresses.length &&
            PaymentsFunc.TokenAddresses[CheckPaymentID[0]].active == true){
            let factor = PaymentsFunc.TokenDecimalsFactors[CheckPaymentID[0]];
            CheckAmount[0] = CheckAmount[0].multipliedBy(factor);
            success = await PaymentsFunc.CheckAllowance(Aux.account, ContractsFunc.Payments._address, CheckAmount[0], CheckPaymentID[0]);
            if(success)await Aux.CallBackFrame(contract.methods.sendCredit(receiver, CheckAmount[0].toString(), CheckPaymentID[0]).send({from: Aux.account }));
        }
        else{
            window.alert("The token ID is not accepted : " + CheckPaymentID[0])
        }
    }
    else{
        ValidationFunc.FormatErrorMessage([CheckReceiver, CheckAmount[1], CheckPaymentID[1]], ["Receiver", "Amount", "Payment ID"]);
    }
}
  
export async function WithdrawCredit(amount, contract, paymentTokenID){
    let CheckAmount = ValidationFunc.validatePositiveFloat(amount);
    let CheckPaymentID = ValidationFunc.validatePositiveInteger(paymentTokenID);

    if(true == CheckAmount[1] &&
        true == CheckPaymentID[1]){
        if(CheckPaymentID[0] < PaymentsFunc.TokenAddresses.length){
            let factor = PaymentsFunc.TokenDecimalsFactors[CheckPaymentID[0]];
            CheckAmount[0] = CheckAmount[0].multipliedBy(factor).toString();
            await Aux.CallBackFrame(contract.methods.withdraw(CheckAmount[0], CheckPaymentID[0]).send({from: Aux.account }));
        }
        else{
            window.alert("Token ID not supported")
        }
    }
    else{
        ValidationFunc.FormatErrorMessage([CheckAmount[1], CheckPaymentID[1]], ["Amount", "Payment ID"]);
    }
}

export async function WithdrawAllCredit(contract, paymentTokenID){
    let CheckPaymentID = ValidationFunc.validatePositiveInteger(paymentTokenID);
    if(true == CheckPaymentID[1]){
        await Aux.CallBackFrame(contract.methods.withdrawAll(paymentTokenID).send({from: Aux.account }));
    }
    else{
        ValidationFunc.FormatErrorMessage([CheckPaymentID[1]], ["Payment ID"]);
    }
}

export async function RetrieveCredit(contract){
    try{
        Credits = [];
        if(Aux.account){
            for(let i=0; i < PaymentsFunc.TokenDecimalsFactors.length; i++){
                Credits[i] = new BigNumber(await contract.methods.retrieveCredit(Aux.account, i).call()).dividedBy(PaymentsFunc.TokenDecimalsFactors[i]);
            }
        }
    }
    catch(e){
      window.alert("error retrieving the credits : " + JSON.stringify(e))
    }
    
}

export async function RetrieveUnassignedCredit(MarketId, TokenId, contract){
  let CheckTokenId = ValidationFunc.validatePositiveLargeInteger(TokenId);
  let CheckMarketId = ValidationFunc.validatePositiveLargeInteger(MarketId);

  if(true == CheckTokenId[1] &&
    true == CheckMarketId[1]){
        return await contract.methods.retrieveUnAssignedCredit(CheckMarketId[0], CheckTokenId[0]).call();
  }
  else{
    ValidationFunc.FormatErrorMessage([CheckMarketId[1], CheckTokenId[1]], ["Market ID", "Token ID"]);
  }
}


