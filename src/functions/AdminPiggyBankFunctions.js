const Aux = require("./AuxiliaryFunctions.js");
const Manager = require("./ManagerFunctions.js");
const PaymentsFunc = require("./PaymentsFunctions.js");

const BigNumber = require('bignumber.js');


export var PiggyBankBalances = [];

export var TransferTo = "";
export var TransferAmount = "";
export var TransferPaymentTokenSymbol = "";
export var TransferValidations = "";
export var TransferRejections = "";
const address_0 = "0x0000000000000000000000000000000000000000";


export async function RetrieveTransferInfo(contract){
    try{
      let response = await contract.methods.retrieveTransferInfo().call();
      if(response[0] != address_0){
        TransferTo = response[0];
        let TransferPaymentTokenID = parseInt(response[2]);
        let factor = PaymentsFunc.TokenDecimalsFactors[TransferPaymentTokenID];
        TransferAmount = new BigNumber(response[1]).dividedBy(factor).toString();
        TransferPaymentTokenSymbol = PaymentsFunc.TokenSymbols[TransferPaymentTokenID];
        TransferValidations = parseInt(response[3]);
        TransferRejections = parseInt(response[4]);
      }
      else{
        TransferTo = "-";
        TransferAmount = "-";
        TransferPaymentTokenSymbol = "-";
        TransferValidations = "-";
        TransferRejections = "-";
      }
      
    }
    catch(e){
      window.alert("error retrieving the transfer info : " + JSON.stringify(e))
    }
}

export async function AddTransfer(contract, receiver, amount, paymentTokenID){
    if(paymentTokenID < PaymentsFunc.TokenDecimalsFactors.length){
      let factor = PaymentsFunc.TokenDecimalsFactors[paymentTokenID];
      amount = new BigNumber(amount).multipliedBy(factor).toString();
      await Aux.CallBackFrame(contract.methods.transfer(receiver, amount, paymentTokenID).send({from: Aux.account }));
    }
    else{
      window.alert("The token ID is not accepted")
    }
}

export async function ApproveTransfer(contract){
    await Aux.CallBackFrame(contract.methods.approve().send({from: Aux.account }));
}

export async function RejectTransfer(contract){
    await Aux.CallBackFrame(contract.methods.reject().send({from: Aux.account }));
}

export async function RetrievePiggyBankBalance(){
  try{
    PiggyBankBalances = []
    for(let i=0; i < PaymentsFunc.TokenDecimalsFactors.length; i++){
      PiggyBankBalances[i] = new BigNumber(await PaymentsFunc.GetBalanceOf(Manager.PiggyBankAddressProxy, i)).dividedBy(PaymentsFunc.TokenDecimalsFactors[i]);
    }
  }
  catch(e){
    window.alert("error retrieving the piggy bank balances : " + JSON.stringify(e))
  }
}