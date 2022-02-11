import { ETHFactor } from '../config'

const Aux = require("./AuxiliaryFunctions.js");
const Manager = require("./ManagerFunctions.js");
const BigNumber = require('bignumber.js');


export var PiggyBankBalanceWei = new BigNumber(0);

export var TransferTo = "";
export var TransferAmount = "";
export var TransferValidations = "";
export var TransferRejections = "";


export async function RetrieveTransferInfo(contract){
    try{
      let response = await contract.methods.retrieveTransferInfo().call();

      TransferTo = response[0]._to;
      TransferAmount = ((response[0]._amount) ? new BigNumber(response[0]._amount).toString() : response[0]._amount);
      TransferValidations = ((response[0]._validations) ? new BigNumber(response[0]._validations).toString() : response[0]._validations);
      TransferRejections = ((response[0]._rejections) ? new BigNumber(response[0]._rejections).toString() : response[0]._rejections);
    }
    catch(e){
      window.alert("error retrieving the transfer info : " + JSON.stringify(e))
    }
}

export async function AddTransfer(contract, receiver, amount){
    await Aux.CallBackFrame(contract.methods.transfer(receiver, amount).send({from: Aux.account }));
}

export async function ApproveTransfer(contract){
    await Aux.CallBackFrame(contract.methods.approve().send({from: Aux.account }));
}

export async function RejectTransfer(contract){
    await Aux.CallBackFrame(contract.methods.reject().send({from: Aux.account }));
}

export async function RetrievePiggyBankBalance(){
  try{
    PiggyBankBalanceWei = new BigNumber(await Aux.web3.eth.getBalance(Manager.PiggyBankAddressProxy)).dividedBy(ETHFactor);
  }
  catch(e){
    window.alert("error retrieving the piggy bank balance : " + JSON.stringify(e))
  }
}