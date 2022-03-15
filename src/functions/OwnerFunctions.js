// Owner
const Aux = require("./AuxiliaryFunctions.js");
const load = require("./LoadFunctions.js");
const ValidationFunc = require("./ValidationFunctions.js");

export var isOwner = false
export var MinOwners = ""
export var PendingMinOwners = ""
export var TotalOwners = ""
export var Owners = []
export var pendingOwnersAdd = []
export var pendingOwnersRemove = []

export async function AddOwner(address, contract){
  await ManageOwner(address, contract, 0);
}
  
  export async function RemoveOwner(address, contract){
    await ManageOwner(address, contract, 1);
  }

  export async function ValidateOwner(address, contract){
    await ManageOwner(address, contract, 2);
  }

  export async function RejectOwner(address, contract){
    await ManageOwner(address, contract, 3);
  }

  async function ManageOwner(address, contract, id){
    let CheckAddress = ValidationFunc.validateAddress(address);

    if(true == CheckAddress){
      if(id == 0) await Aux.CallBackFrame(contract.methods.addOwner(address).send({from: Aux.account }));
      else if(id == 1) await Aux.CallBackFrame(contract.methods.removeOwner(address).send({from: Aux.account }));
      else if(id == 2) await Aux.CallBackFrame(contract.methods.validateOwner(address).send({from: Aux.account }));
      else if(id == 3) await Aux.CallBackFrame(contract.methods.rejectOwner(address).send({from: Aux.account }));
    }
    else{
      ValidationFunc.FormatErrorMessage([CheckAddress], ["Address"]);
    }
  }

  export function resetOwners(){
    isOwner = false
    MinOwners = ""
    PendingMinOwners = ""
    TotalOwners = ""
    Owners = []
    pendingOwnersAdd = []
    pendingOwnersRemove = []
  }

  export async function RetrieveOwners(contract){
    try{
        MinOwners = await contract.methods.retrieveMinOwners().call()
        Owners = []
        let listOfOwners = await contract.methods.retrieveAllOwners().call()
        TotalOwners = listOfOwners.length
        isOwner = false;

        for (let i = 0; i < TotalOwners; i++) { 
          Owners.push(listOfOwners[i]);
          if(load.Admin && (Aux.account.toString().toUpperCase() == listOfOwners[i].toString().toUpperCase())){
            isOwner = true;
          }
        }

        if(!load.Admin) isOwner = true;

        pendingOwnersAdd = await contract.methods.retrievePendingOwners(true).call();
  
        pendingOwnersRemove = await contract.methods.retrievePendingOwners(false).call();
  
        PendingMinOwners = await contract.methods.retrievePendingMinOwners().call();
        
    }
    catch(e){
      window.alert("error retrieving the owners : " + JSON.stringify(e))
    }
  }

  export async function UpdateMinOwner(minOwner, contract){
    let CheckMinOwners = ValidationFunc.validatePositiveInteger(minOwner);

    if(true == CheckMinOwners[1]){
      await Aux.CallBackFrame(contract.methods.changeMinOwners(CheckMinOwners[0]).send({from: Aux.account }));
    }
    else{
      ValidationFunc.FormatErrorMessage([CheckMinOwners[1]], ["Min Owners"]);
    }
  }

  export async function ValidateMinOwner(contract){
    await Aux.CallBackFrame(contract.methods.validateMinOwners().send({from: Aux.account }));
  }

  export async function RejectMinOwner(contract){
    await Aux.CallBackFrame(contract.methods.rejectMinOwners().send({from: Aux.account }));
  }