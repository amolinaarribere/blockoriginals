import { ERC20_ABI } from '../config'

const Aux = require("./AuxiliaryFunctions.js");
const BigNumber = require('bignumber.js');

export var TokenAddresses = "";
export var PendingTokenIndex = "";
export var PendingTokenAddresses = "";
export var TokenSymbols = "";
export var TokenDecimalsFactors = "";
export var CurrentPaymentID = 0;
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

  export async function SetApprove(spender, amount, TokenID){
    if(TokenID < TokenContracts.length) await Aux.CallBackFrame(TokenContracts[TokenID].methods.approve(spender, amount).send({from: Aux.account }));
    else window.alert("TokenID provided is not available in the system");
  }

  export async function GetAllowance(owner, spender, TokenID){
    try{
      if(TokenID < TokenContracts.length) return await TokenContracts[TokenID].methods.allowance(owner, spender).call();
      else return 0;
    }
    catch(e) { 
      window.alert("error returning the token allowance : " + JSON.stringify(e)); 
    }
  }

  export async function GetBalanceOf(account, TokenID){
    try{
      if(TokenID < TokenContracts.length) return await TokenContracts[TokenID].methods.balanceOf(account).call();
      else return 0;
    }
    catch(e) { 
      window.alert("error returning the token balance Of : " + JSON.stringify(e)); 
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
    let allowance = new BigNumber(await GetAllowance(owner, spender, TokenID));
    let ActualAmount = amount.multipliedBy(TokenDecimalsFactors[TokenID]);
    if(allowance.isLessThan(ActualAmount)){
        window.alert("You first need to allow Blockoriginals to spend at least " + amount.toString() + " " + TokenSymbols[TokenID] + " on your behalf" );
        await SetApprove(spender, ActualAmount);
    }
  }

  async function GetTokenContract(TokenID){
    let TokenContract = await new Aux.web3.eth.Contract(ERC20_ABI, TokenAddresses[TokenID].TokenContract);
    return TokenContract;
  }

  export function changeCurrentPaymentId(TokenID){
    CurrentPaymentID = TokenID;
  }
    