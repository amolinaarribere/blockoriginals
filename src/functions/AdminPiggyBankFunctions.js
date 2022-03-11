const Aux = require("./AuxiliaryFunctions.js");
const Manager = require("./ManagerFunctions.js");
const PaymentsFunc = require("./PaymentsFunctions.js");

const BigNumber = require('bignumber.js');


export var PiggyBankBalances = [];

export var TransferTo = "";
export var TransferAmount = "";
var TransferPaymentTokenID = "";
export var TransferPaymentTokenSymbol = "";
export var TransferValidations = "";
export var TransferRejections = "";


export async function RetrieveTransferInfo(contract){
    try{
      let response = await contract.methods.retrieveTransferInfo().call();

      TransferTo = response[0]._to;
      TransferAmount = ((response[0]._amount) ? new BigNumber(response[0]._amount).toString() : response[0]._amount);
      TransferPaymentTokenID = parseInt(response[0]._paymentTokenID);
      TransferPaymentTokenSymbol = PaymentsFunc.TokenSymbols[TransferPaymentTokenID];
      TransferValidations = ((response[0]._validations) ? new BigNumber(response[0]._validations).toString() : response[0]._validations);
      TransferRejections = ((response[0]._rejections) ? new BigNumber(response[0]._rejections).toString() : response[0]._rejections);
    }
    catch(e){
      window.alert("error retrieving the transfer info : " + JSON.stringify(e))
    }
}

export async function AddTransfer(contract, receiver, amount, paymentTokenID){
    await Aux.CallBackFrame(contract.methods.transfer(receiver, amount, paymentTokenID).send({from: Aux.account }));
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