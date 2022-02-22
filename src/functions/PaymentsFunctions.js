import { ERC20_ABI } from '../config'

const Aux = require("./AuxiliaryFunctions.js");
const BigNumber = require('bignumber.js');

export var TokenAddress = "";
export var PendingTokenAddress = "";
export var TokenContract = "";
export var TokenSymbol = "";
var TokenDecimals = "";
export var TokenDecimalsFactor = "";


export async function RetrieveTokenAddress(contract){
    try{
      TokenAddress = await contract.methods.retrieveSettings().call();

      TokenContract = await new Aux.web3.eth.Contract(ERC20_ABI, TokenAddress);

      await GetTokenFeatures();
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

  export async function SetApprove(spender, amount){
    await Aux.CallBackFrame(TokenContract.methods.approve(spender, amount).send({from: Aux.account }));
  }

  export async function GetAllowance(owner, spender){
    try{
      return await TokenContract.methods.allowance(owner, spender).call();
    }
    catch(e) { 
      window.alert("error returning the token allowance : " + JSON.stringify(e)); 
    }
  }

  export async function GetBalanceOf(account){
    try{
      return await TokenContract.methods.balanceOf(account).call();
    }
    catch(e) { 
      window.alert("error returning the token balance Of : " + JSON.stringify(e)); 
    }
  }

  export async function GetTokenFeatures(){
    try{
      TokenSymbol = "-";
      TokenDecimals = 0;
      TokenDecimalsFactor = new BigNumber(1);
      TokenSymbol = await TokenContract.methods.symbol().call();
      TokenDecimals = await TokenContract.methods.decimals().call();
      TokenDecimalsFactor = new BigNumber(10**TokenDecimals);
    }
    catch(e) { 
      window.alert("error retrieving the token features : " + JSON.stringify(e)); 
    }
  }

  export async function CheckAllowance(owner, spender, amount){
    let allowance = new BigNumber(await GetAllowance(owner, spender));
    let ActualAmount = amount.multipliedBy(TokenDecimalsFactor);
    if(allowance.isLessThan(ActualAmount)){
        window.alert("You first need to allow Blockoriginals to spend at least " + amount.toString() + " " + TokenSymbol + " on your behalf" );
        await SetApprove(spender, ActualAmount);
    }
  }
    