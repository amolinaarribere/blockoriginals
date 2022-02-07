const Aux = require("./AuxiliaryFunctions.js");
const BigNumber = require('bignumber.js');

export var TransferTo = "";
export var TransferAmount = "";
export var TransferValidations = "";
export var TransferRejections = "";


export async function RetrieveTransferInfo(contract){
    try{
      let response = await contract.methods.retrieveTransferInfo().call();

      TransferTo = response[0]._to;
      TransferAmount = new BigNumber(response[0]._amount);
      TransferValidations = new BigNumber(response[0]._validations);
      TransferRejections = new BigNumber(response[0]._rejections);

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