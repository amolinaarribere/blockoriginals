import { NFTMARKET_ABI, ETHFactor, PaymentPlansMinting, PaymentPlansTransferFee } from '../config'


const Aux = require("./AuxiliaryFunctions.js");
const BigNumber = require('bignumber.js');
const TreasuryFunc = require("./TreasuryFunctions.js");


export var IssuerOwner = "";
export var IssuerName = "";
export var IssuerSymbol = "";
export var IssuerTransferFeeAmount = "";
export var IssuerTransferFeeDecimals = "";
export var IssuerPaymentPlan = "";
export var IssuerOfferLifeTime = "";

export var TokenID = "-";
export var MarketID = "-";
export var TokenPaymentPlan = "-";
export var TokenPrice = "-";
export var TokenOwner = "-";

export var OfferOffer = "-";
export var OfferSender = "-";
export var OfferBidder = "-";
export var OfferDeadline = "-";




export async function changeOwner(contract, newOwner){
    await Aux.CallBackFrame(contract.methods.changeOwner(newOwner).send({from: Aux.account }));
}

export async function changePaymentPlan(contract, newPaymentPlan){
    await Aux.CallBackFrame(contract.methods.changePaymentPlan(newPaymentPlan).send({from: Aux.account }));
}

export async function changeOffersLifeTime(contract, newLifeTime){
    await Aux.CallBackFrame(contract.methods.changeOffersLifeTime(newLifeTime).send({from: Aux.account }));
}

export async function changeOwnerTransferFees(contract, newAmount, newDecimals){
    await Aux.CallBackFrame(contract.methods.changeOwnerTransferFees(newAmount, newDecimals).send({from: Aux.account }));
}

export async function mintToken(contract, marketId, tokenId, receiver, price){
  let marketContract = await RetrieveNFTMarket(contract, marketId);
  await mintTokenForMarket(marketContract, tokenId, receiver, price);
}

async function mintTokenForMarket(contract, tokenId, receiver, price){
    let priceWei = price.multipliedBy(ETHFactor);
    let paymentplan = await PaymentPlanForMarket(contract);
    let payment = new BigNumber(0);
    if(paymentplan == PaymentPlansMinting) payment = TreasuryFunc.MintingFee.plus(TreasuryFunc.AdminMintingFee).multipliedBy(ETHFactor);
    await Aux.CallBackFrame(contract.methods.mintToken(tokenId, receiver, priceWei).send({from: Aux.account, value: payment }));
}

async function PaymentPlanForMarket(contract){
  try{
    let response = await contract.methods.retrieveIssuer().call();
    return response[0]._paymentPlan;
  }
  catch(e){
    window.alert("error retrieving the payment plan for market : " + JSON.stringify(e))
  }
}

export async function setTokenPrice(contract, tokenId, price){
    await Aux.CallBackFrame(contract.methods.setTokenPrice(tokenId, price).send({from: Aux.account }));
}

export async function replyOffer(contract, marketId, tokenId, validateOrReject){
  let marketContract = await RetrieveNFTMarket(contract, marketId);
  if(validateOrReject) await acceptOffer(marketContract, tokenId);
  else await rejectOffer(marketContract, tokenId);
}

async function acceptOffer(contract, tokenId){
    await Aux.CallBackFrame(contract.methods.acceptOffer(tokenId).send({from: Aux.account }));
}

async function rejectOffer(contract, tokenId){
    await Aux.CallBackFrame(contract.methods.rejectOffer(tokenId).send({from: Aux.account }));
}

export async function submitOffer(contract, marketId, tokenId, bidder, offer, FromCredit){
  let marketContract = await RetrieveNFTMarket(contract, marketId);
  await submitOfferForMarket(marketContract, tokenId, bidder, offer, FromCredit);
}

async function submitOfferForMarket(contract, tokenId, bidder, offer, FromCredit){
    let offerValue = new BigNumber(0);
    let offerSent = new BigNumber(offer).multipliedBy(ETHFactor);
    if (! FromCredit) offerValue = offerSent;
    await Aux.CallBackFrame(contract.methods.submitOffer(tokenId, bidder, offerSent, FromCredit).send({from: Aux.account, value: offerValue }));
}

export async function withdrawOffer(contract, marketId, tokenId){
  let marketContract = await RetrieveNFTMarket(contract, marketId);
  await withdrawOfferForMarket(marketContract, tokenId);
}

async function withdrawOfferForMarket(contract, tokenId){
    await Aux.CallBackFrame(contract.methods.withdrawOffer(tokenId).send({from: Aux.account }));
}

export async function transferToken(contract, tokenId, from, to){
    await Aux.CallBackFrame(contract.methods.safeTransferFrom(from, to, tokenId).send({from: Aux.account }));
}

export async function RetrieveIssuer(contract){
    try{
      let response = await contract.methods.retrieveIssuer().call();

      IssuerOwner = response[0]._owner;
      IssuerName = response[0]._name;
      IssuerSymbol = response[0]._symbol;
      IssuerTransferFeeAmount = new BigNumber(response[0]._feeAmount);
      IssuerTransferFeeDecimals = new BigNumber(response[0]._feeDecimals);
      IssuerPaymentPlan = response[0]._paymentPlan;
      IssuerOfferLifeTime = new BigNumber(response[1]);

    }
    catch(e){
      window.alert("error retrieving the issuer info : " + JSON.stringify(e))
    }
}

export async function RetrieveToken(contract, marketId, tokenId){
  let marketContract = await RetrieveNFTMarket(contract, marketId);
  TokenID = tokenId.toString();
  await RetrieveTokenForMarket(marketContract, tokenId);
}

async function RetrieveTokenForMarket(contract, tokenId){
    try{
      let response = await contract.methods.retrieveToken(tokenId).call();

      TokenPaymentPlan = response[0]._paymentPlan;
      TokenPrice = new BigNumber(response[0]._price).dividedBy(ETHFactor);
      TokenOwner = response[1];
      
    }
    catch(e){
      window.alert("error retrieving the token info : " + JSON.stringify(e))
    }
}

export async function RetrieveOffer(contract, marketId, tokenId){
  let marketContract = await RetrieveNFTMarket(contract, marketId);
  TokenID = tokenId.toString();
  await RetrieveOfferForMarket(marketContract, tokenId);
}

async function RetrieveOfferForMarket(contract, tokenId){
    try{
      let response = await contract.methods.retrieveOffer(tokenId).call();
      OfferOffer = new BigNumber(response._offer).dividedBy(ETHFactor);
      OfferSender = response._sender;
      OfferBidder = response._bidder;
      let deadline = response._deadline;
      var t = new Date(1970, 0, 1); // Epoch
      OfferDeadline = t.setSeconds(deadline);
    }
    catch(e){
      window.alert("error retrieving the offer info : " + JSON.stringify(e))
    }
}

async function RetrieveNFTMarket(contract, marketId){
  try{
    let marketAddress = await contract.methods.retrieveNFTMarketForIssuer(marketId).call();
    let marketContract = await new Aux.web3.eth.Contract(NFTMARKET_ABI, marketAddress);
    MarketID = marketId.toString();
    return marketContract;
  }
  catch(e){
    window.alert("error retrieving the market contract : " + JSON.stringify(e))
  }
}