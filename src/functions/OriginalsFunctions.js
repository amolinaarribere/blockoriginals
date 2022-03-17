 // Originals Tokens
const Aux = require("./AuxiliaryFunctions.js");
const load = require("./LoadFunctions.js");
const ValidationFunc = require("./ValidationFunctions.js");

export var TokensTotalSupply = "";
export var TokensBalance = "";
export var isOwner = false;

 export async function totalSupply(contract){
   try{
    TokensTotalSupply = await contract.methods.totalSupply().call();
   }
   catch(e){
    window.alert("error retrieving the total token supply : " + JSON.stringify(e))
  }
    
  }

  export async function balanceOf(address, contract){
    try{
      if(address) TokensBalance = await contract.methods.balanceOf(address).call();
      else TokensBalance = 0;
    }
    catch(e){
      window.alert("error retrieving the account's balance : " + JSON.stringify(e))
    }
  }

  export async function transfer(address, amount, contract){
    let CheckAmount = ValidationFunc.validatePositiveLargeInteger(amount);
    let CheckAddress = ValidationFunc.validateAddress(address);

    if(true == CheckAmount[1] &&
      true == CheckAddress){
        await Aux.CallBackFrame(contract.methods.transfer(address, CheckAmount[0]).send({from: Aux.account }));
    }
    else{
      ValidationFunc.FormatErrorMessage([CheckAmount[1], CheckAddress], ["Amount", "Recipient"]);
    }
  }

  export async function isTokenOwner(address, contract){
    try{
      isOwner = false;
      if(load.Admin){
        await balanceOf(address, contract);
        if(TokensBalance > 0 ) isOwner = true;
      }
      else {
        isOwner = true;
      }
    }
    catch(e){
      window.alert("error checking account's ownership : " + JSON.stringify(e))
    }
    
  }