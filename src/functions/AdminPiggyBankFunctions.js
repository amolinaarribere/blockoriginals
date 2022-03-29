const Aux = require("./AuxiliaryFunctions.js");
const Manager = require("./ManagerFunctions.js");
const PaymentsFunc = require("./PaymentsFunctions.js");
const ValidationFunc = require("./ValidationFunctions.js");


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
  let CheckReceiver = ValidationFunc.validateAddress(receiver);
  let CheckAmount = ValidationFunc.validatePositiveFloat(amount);
  let CheckPaymentID = ValidationFunc.validatePositiveInteger(paymentTokenID);

  if(true == CheckReceiver &&
    true == CheckAmount[1] &&
    true == CheckPaymentID[1]){
      if(CheckPaymentID[0] < PaymentsFunc.TokenDecimalsFactors.length){
        let factor = PaymentsFunc.TokenDecimalsFactors[CheckPaymentID[0]];
        CheckAmount[0] = CheckAmount[0].multipliedBy(factor).toFixed(0).toString();
        await Aux.CallBackFrame(contract.methods.transfer(receiver, CheckAmount[0], CheckPaymentID[0]).send({from: Aux.account }));
      }
      else{
        window.alert("The token ID is not accepted : " + CheckPaymentID[0])
      }
    }
  else{
    ValidationFunc.FormatErrorMessage([CheckReceiver, CheckAmount[1], CheckPaymentID[1]], ["Receiver", "Amount", "Payment ID"]);
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