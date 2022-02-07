// auxiliary
import Web3 from 'web3';

const ENSFunc = require("./ENSFunctions.js");
const BrowserStorageFunctions = require("./BrowserStorageFunctions.js");

export var account = "";
export var accountResolved = "";
export var web3 = "";

export async function setAccount(_value){
  account = _value;
  accountResolved = await ENSFunc.ReverseResolution(account);
  BrowserStorageFunctions.WriteKey(BrowserStorageFunctions.accountConnectedKey, account);
}

export function removeAccount(){
  account = "";
  accountResolved = "";
  BrowserStorageFunctions.WriteKey(BrowserStorageFunctions.accountConnectedKey, "");
}

export function LoadWeb3(){
  web3 = new Web3(window.ethereum)
  console.log("web3 loaded ethereum")
}

export function LoadWeb3ToNode(node){
  web3 = new Web3(node)
  console.log("web3 loaded default")
}

export async function CallBackFrame(callback){
    try{
      let result = await callback;
      return result;
     }
     catch(e) { window.alert(JSON.stringify(e)); }
}
  
export function Bytes32ToAddress(bytes){
    return ("0x" + (bytes.toString()).substring(26));
}

export function AddressToBytes32(address){
  return ("0x000000000000000000000000" + (address.toString()).substring(2));
}

export function Bytes32ToInt(bytes){
  return parseInt(bytes, 16);
}

export function IntToBytes32(value){
  let returnValue = "0x";
  let valueHex = parseInt(value).toString(16);
  for(let i=0; i < 64 - valueHex.length; i++){
      returnValue = returnValue + "0";
  }
  returnValue = returnValue + valueHex;
  return returnValue;
}

export function StringToBytes(str) {
  return web3.utils.asciiToHex(str);
}

export function BytesToString(bytes) {
  return web3.utils.hexToAscii(bytes);
}


