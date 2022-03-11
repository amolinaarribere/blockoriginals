const BigNumber = require('bignumber.js');
const Aux = require("./AuxiliaryFunctions.js");
const PaymentsFunc = require("./PaymentsFunctions.js");
const ContractsFunc = require("./Contracts.js");


export var Credits = []



export async function SendCredit(receiver, amount, contract, paymentTokenID){
    await PaymentsFunc.CheckAllowance(Aux.account, ContractsFunc.Payments._address, amount, paymentTokenID);
    await Aux.CallBackFrame(contract.methods.sendCredit(receiver, amount.multipliedBy(PaymentsFunc.TokenDecimalsFactors[paymentTokenID]), paymentTokenID).send({from: Aux.account }));
}
  
export async function WithdrawCredit(amount, contract, paymentTokenID){
    await Aux.CallBackFrame(contract.methods.withdraw(amount, paymentTokenID).send({from: Aux.account }));
}

export async function WithdrawAllCredit(contract, paymentTokenID){
    await Aux.CallBackFrame(contract.methods.withdrawAll(paymentTokenID).send({from: Aux.account }));
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
    return await contract.methods.retrieveUnAssignedCredit(MarketId, TokenId).call();
}


