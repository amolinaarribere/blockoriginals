// Proposition
const Aux = require("./AuxiliaryFunctions.js");
const BigNumber = require('bignumber.js');

export var CurrentPropositionID = ""

export var PropositionLifeTime = "";
export var PropositionThreshold = "";
export var MinToPropose = "";

export var PendingPropositionLifeTime = "";
export var PendingPropositionThreshold = "";
export var PendingMinToPropose = "";

export var ContractName = ""
export var ContractVersion = ""
  
  export async function RetrievePendingProposition(contract){
    try{
      let response = await contract.methods.retrieveProposition().call();
      PendingPropositionLifeTime = "-";
      PendingPropositionThreshold = "-";
      PendingMinToPropose = "-";

      if(response[0] != undefined)PendingPropositionLifeTime = new BigNumber(response[0]).toString();
      if(response[1] != undefined)PendingPropositionThreshold = new BigNumber(response[1]).toString();
      if(response[2] != undefined)PendingMinToPropose = new BigNumber(response[2]).toString();
    }
    catch(e) { 
      window.alert("error retrieving the pending propositions : " + JSON.stringify(e)); 
    }
    
  }
  
  export async function RetrieveProposition(contract){
    try{
      let response = await contract.methods.retrieveSettings().call();
      PropositionLifeTime = new BigNumber(response[0]).toString();
      PropositionThreshold = new BigNumber(response[1]).toString();
      MinToPropose = new BigNumber(response[2]).toString();
    }
    catch(e) { 
      window.alert("error retrieving the propositions : " + JSON.stringify(e)); 
    }
    
  }

  export async function RetrievePropositionID(contract){
    try{
      let response = await contract.methods.retrieveNextPropId().call();
      if(response > 0) CurrentPropositionID = response - 1;
    }
    catch(e) { 
      window.alert("error retrieving the current proposition ID : " + JSON.stringify(e)); 
    }
    
  }


  
