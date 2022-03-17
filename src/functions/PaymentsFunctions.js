import { ERC20_ABI } from '../config'

const Aux = require("./AuxiliaryFunctions.js");
const BigNumber = require('bignumber.js');
const ValidationFunc = require("./ValidationFunctions.js");


export var TokenAddresses = "";
export var PendingTokenIndex = "";
export var PendingTokenAddresses = "";
export var TokenSymbols = "";
export var TokenDecimalsFactors = "";
var TokenContracts = ""

export async function RetrieveTokenAddresses(contract){
    try{
      TokenAddresses = await contract.methods.retrieveSettings().call();
      TokenContracts = [];
      TokenSymbols = [];
      TokenDecimalsFactors = [];

      for(let i=0; i < TokenAddresses.length; i++){
        TokenContracts[i] = await GetTokenContract(i);
        let TokenFeatures = await GetTokenFeatures(i);
        TokenSymbols[i] = TokenFeatures[0];
        TokenDecimalsFactors[i] = TokenFeatures[1];
      }
    }
    catch(e) { 
      window.alert("error retrieving the token addresses : " + JSON.stringify(e)); 
    }
    
  }

  export async function RetrievePendingTokenAddresses(contract){
    try{
      let result = await contract.methods.retrieveProposition().call();
      PendingTokenIndex = []
      PendingTokenAddresses = []
      
      if(result){
        for(let i=0; i < (result.length / 2); i++){
          PendingTokenIndex[i] = parseInt(result[2 * i]);
          PendingTokenAddresses[i] = Aux.Bytes32ToAddress(result[(2 * i) + 1]);
        }
      }
    }
    catch(e) { 
      window.alert("error retrieving the pending token address : " + JSON.stringify(e)); 
    }
    
  }

  async function SetApprove(spender, amount, TokenID){
    if(TokenID < TokenContracts.length) return (await Aux.CallBackFrame(TokenContracts[TokenID].methods.approve(spender, amount).send({from: Aux.account })) != false);
    else {
      window.alert("TokenID provided is not available in the system");
      return false;
    }
  }

  async function GetAllowance(owner, spender, TokenID){
    try{
      if(TokenID < TokenContracts.length) return await TokenContracts[TokenID].methods.allowance(owner, spender).call();
      else return 0;
    }
    catch(e) { 
      window.alert("error returning the token allowance : " + JSON.stringify(e)); 
    }
  }

  export async function GetBalanceOf(account, TokenID){
    let CheckAccount = ValidationFunc.validateAddress(account);
    let CheckTokenID = ValidationFunc.validatePositiveInteger(TokenID);

    if(true == CheckTokenID[1] &&
      true == CheckAccount){
        try{
          if(CheckTokenID[0] < TokenContracts.length) return await TokenContracts[CheckTokenID[0]].methods.balanceOf(account).call();
          else return 0;
        }
        catch(e) { 
          window.alert("error returning the token balance Of : " + JSON.stringify(e)); 
        }
    }
    else{
      ValidationFunc.FormatErrorMessage([CheckTokenID[1], CheckAccount], ["Token ID", "Account"]);
    }
  }

  async function GetTokenFeatures(TokenID){
    try{
      let TokenSymbol = "-";
      let TokenDecimals = 0;
      let TokenDecimalsFactor = new BigNumber(1);

      if(TokenID < TokenContracts.length){
        TokenSymbol = await TokenContracts[TokenID].methods.symbol().call();
        TokenDecimals = await TokenContracts[TokenID].methods.decimals().call();
        TokenDecimalsFactor = new BigNumber(10**TokenDecimals);
      }
      
      return[TokenSymbol, TokenDecimalsFactor];
    }
    catch(e) { 
      window.alert("error retrieving the token features : " + JSON.stringify(e)); 
    }
  }

  export async function CheckAllowance(owner, spender, amount, TokenID){
    if(TokenID < TokenDecimalsFactors.length){
      try{
        let allowance = new BigNumber(await GetAllowance(owner, spender, TokenID));
        if(allowance.isLessThan(amount)){
          window.alert("You first need to allow Blockoriginals to spend at least " + amount.dividedBy(TokenDecimalsFactors[TokenID]).toString() + " " + TokenSymbols[TokenID] + " on your behalf" );
          return await SetApprove(spender, amount, TokenID);
        }
        else {
          return true;
        }
      }
      catch(e){
        console.error("Cannot check Allowance for that token")
        return false;
      }
    }
    else return false;
  }

  async function GetTokenContract(TokenID){
    if(TokenID < TokenAddresses.length){
      let TokenContract = await new Aux.web3.eth.Contract(ERC20_ABI, TokenAddresses[TokenID].TokenContract);
      return TokenContract;
    }
    else console.error("Cannot check Allowance for that token")
  }
    