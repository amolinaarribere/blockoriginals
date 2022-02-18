const Aux = require("./AuxiliaryFunctions.js");


export var TokenAddress = "";
export var PendingTokenAddress = "";

export async function RetrieveTokenAddress(contract){
    try{
      TokenAddress = await contract.methods.retrieveSettings().call();
    }
    catch(e) { 
      window.alert("error retrieving the token address : " + JSON.stringify(e)); 
    }
    
  }

  export async function RetrievePendingTokenAddress(contract){
    try{
      let result = await contract.methods.retrieveProposition().call();
      PendingTokenAddress = "-"
      
      if(result[0] != undefined)PendingTokenAddress = Aux.Bytes32ToAddress(result[0])
    }
    catch(e) { 
      window.alert("error retrieving the pending token address : " + JSON.stringify(e)); 
    }
    
  }
    