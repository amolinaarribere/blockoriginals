
const Aux = require("./AuxiliaryFunctions.js");
const Contracts = require("./Contracts.js");

export var eventlogs = [];
export var eventNames = [];
export const ManagerId = 0
export const publicPoolId = 1
export const TreasuryId = 2
export const OriginalsTokenId = 3
export const PropositionSettingsId = 4
export const AdminPiggyBankId = 5
export const nftMarketId = 6

export async function StartEvents(blockId){
    eventNames = [];

    // Contracts

    const ListOfContracts = [Contracts.Manager,
      Contracts.publicPool,
      Contracts.Treasury,
      Contracts.OriginalsToken,
      Contracts.PropositionSettings,
      Contracts.AdminPiggyBank,
      Contracts.nftMarket]

    for(let i=0; i < ListOfContracts.length; i++){
      let contractABI = ListOfContracts[i]._jsonInterface;
      if(contractABI != undefined){
        let eventsList = []
        let abisList = []
    
        Object.keys(contractABI).forEach((key) => {
          if("event" == contractABI[key]["type"]){
            eventsList.push(contractABI[key]["name"]);
            abisList.push(contractABI[key]["inputs"])
          }
        });

        eventNames.push(eventsList);
    
        await GetEvents(i, 
          blockId, 
          ListOfContracts[i], 
          eventNames[i], 
          abisList);
        } 
    }
      
  
}

export async function GetEvents(eventLogId, _block, contract, eventsList, abisList){
  eventlogs[eventLogId] = []

  var options = {
      fromBlock: _block
  };

  if("" != contract && undefined != contract.events){
    for(let i=0; i < eventsList.length; i++){
      ConnectEvent(Reflect.get(contract.events, eventsList[i]), options, eventLogId, i, abisList[i])
    }
  }

}

function ConnectEvent(func, option, Id1, Id2, Abi){
  eventlogs[Id1][Id2] = []
  let eventFunction = func(option);

  eventFunction.on('data', event => {eventlogs[Id1][Id2][eventlogs[Id1][Id2].length] = event})
  eventFunction.on('changed', changed => console.log("event removed from blockchain : " + changed))
  eventFunction.on('error', err => console.log("event error : " + JSON.stringify(err)))
}

export async function StopEvents(){
  try{
    if(Aux.web3){
      await Aux.web3.eth.clearSubscriptions()
    }
  }
  catch(e){
    window.alert("error clearing subscription : " + e.message)
  }
    
}


