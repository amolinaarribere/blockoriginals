import { NFTMARKET_ABI } from '../config'

const BigNumber = require('bignumber.js');
const Aux = require("./AuxiliaryFunctions.js");
const PaymentsFunc = require("./PaymentsFunctions.js");
const ContractsFunc = require("./Contracts.js");


export var Markets = ""
export var pendingMarkets = ""
export var Credits = ""

export async function AddMarket(owner, name, symbol, feeAmount, feeDecimals, payment, price, FromCredit, contract, paymentTokenID){
    if(!FromCredit)await PaymentsFunc.CheckAllowance(Aux.account, ContractsFunc.Payments._address, price, paymentTokenID);
    await Aux.CallBackFrame(contract.methods.requestIssuer(Aux.returnIssuerObject(owner, name, symbol, feeAmount, feeDecimals, payment), FromCredit, paymentTokenID).send({from: Aux.account}));
 }
  
export async function ValidateMarket(marketid, contract){
    await Aux.CallBackFrame(contract.methods.validateIssuer(marketid).send({from: Aux.account }));
}
    
export async function RejectMarket(marketid, contract){
    await Aux.CallBackFrame(contract.methods.rejectIssuer(marketid).send({from: Aux.account }));
}

export async function RetrieveMarkets(contract){
    try{
        let issuers = await contract.methods.retrieveIssuers().call();
        Markets = [];

        for (let i = 0; i < issuers.length; i++) {
            let marketAddress = await contract.methods.retrieveNFTMarketForIssuer(issuers[i]).call();
            let market = await new Aux.web3.eth.Contract(NFTMARKET_ABI, marketAddress);
            let issuer = await market.methods.retrieveIssuer().call();
            Markets[i] = [issuers[i], marketAddress, issuer[0]._owner, issuer[0]._name, issuer[0]._symbol, issuer[0]._feeAmount, issuer[0]._feeDecimals, issuer[0]._paymentPlan, issuer[1]];
        }

        let pendingIssuers = await contract.methods.retrievePendingIssuers().call();
        pendingMarkets = [];

        for (let i = 0; i < pendingIssuers.length; i++) {
            let pendingIssuer = await contract.methods.retrievePendingIssuer(pendingIssuers[i]).call();
            pendingMarkets[i] = [pendingIssuers[i], pendingIssuer._issuer._owner, pendingIssuer._issuer._name, pendingIssuer._issuer._symbol, pendingIssuer._issuer._feeAmount, pendingIssuer._issuer._feeDecimals, pendingIssuer._issuer._paymentPlan];
        }
    }
    catch(e){
      window.alert("error retrieving the markets : " + JSON.stringify(e))
    }
    
}



