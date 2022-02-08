// Proposition
const Aux = require("./AuxiliaryFunctions.js");

export var CurrentPropositionID = ""

export var PropositionLifeTime = "";
export var PropositionThreshold = "";
export var MinToPropose = "";

export var PendingPropositionLifeTime = "";
export var PendingPropositionThreshold = "";
export var PendingMinToPropose = "";

export var ContractName = ""
export var ContractVersion = ""

export async function UpgradeProposition(NewPropositionLifeTime, NewPropositionThreshold, NewMinToPropose, contract){
  await Aux.CallBackFrame(contract.methods.sendProposition([Aux.IntToBytes32(NewPropositionLifeTime),
                            Aux.IntToBytes32(NewPropositionThreshold), 
                            Aux.IntToBytes32(NewMinToPropose)]).send({from: Aux.account }));
  }
  
  export async function VoteProposition(Vote, contract){
    await Aux.CallBackFrame(contract.methods.voteProposition(Vote).send({from: Aux.account }));
  }

  export async function CancelProposition(contract){
    await Aux.CallBackFrame(contract.methods.cancelProposition().send({from: Aux.account }));
  }

  export async function VotePropositionOnBehalfOf(voter, PropID, Vote, nonce, deadline, signature, contract){
    await Aux.CallBackFrame(contract.methods.votePropositionOnBehalfOf(voter, PropID, Vote, nonce, deadline, signature).send({from: Aux.account }));
  }
  
  export async function RetrievePendingProposition(contract){
    try{
      let response = await contract.methods.retrieveProposition().call();
      PendingPropositionLifeTime = "-";
      PendingPropositionThreshold = "-";
      PendingMinToPropose = "-";

      if(response[0] != undefined)PendingPropositionLifeTime = Number(response[0]);
      if(response[1] != undefined)PendingPropositionThreshold = Number(response[1]);
      if(response[2] != undefined)PendingMinToPropose = Number(response[2]);
    }
    catch(e) { 
      window.alert("error retrieving the pending propositions : " + JSON.stringify(e)); 
    }
    
  }
  
  export async function RetrieveProposition(contract){
    try{
      let response = await contract.methods.retrieveSettings().call();
      PropositionLifeTime = response[0];
      PropositionThreshold = response[1];
      MinToPropose = response[2];
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


  
