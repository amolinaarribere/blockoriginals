import { NFTMARKET_ABI, PaymentPlansMinting, PaymentPlansTransferFee } from '../config'


const Aux = require("./AuxiliaryFunctions.js");
const BigNumber = require('bignumber.js');
const TreasuryFunc = require("./TreasuryFunctions.js");
const PaymentsFunc = require("./PaymentsFunctions.js");
const ContractsFunc = require("./Contracts.js");


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
export var TokenPricesPaymentsID = "";
export var TokenPrices = "";
export var TokenPricesEnabled = "";
export var TokenOwner = "-";

export var OfferOffer = "-";
export var OfferPaymentTokenID = "-";
export var OfferSender = "-";
export var OfferBidder = "-";
export var OfferDeadline = "-";


export async function changeOwner(contract, marketId, newOwner){
  let marketContract = await RetrieveNFTMarket(contract, marketId);
  await changeOwnerForMarket(marketContract, newOwner);
}

async function changeOwnerForMarket(contract, newOwner){
    await Aux.CallBackFrame(contract.methods.changeOwner(newOwner).send({from: Aux.account }));
}

export async function changePaymentPlan(contract, marketId, newPaymentPlan){
  let marketContract = await RetrieveNFTMarket(contract, marketId);
  await changePaymentPlanForMarket(marketContract, newPaymentPlan);
}

async function changePaymentPlanForMarket(contract, newPaymentPlan){
    await Aux.CallBackFrame(contract.methods.changePaymentPlan(newPaymentPlan).send({from: Aux.account }));
}

export async function changeOffersLifeTime(contract, marketId, newLifeTime){
  let marketContract = await RetrieveNFTMarket(contract, marketId);
  await changeOffersLifeTimeForMarket(marketContract, newLifeTime);
}

async function changeOffersLifeTimeForMarket(contract, newLifeTime){
    await Aux.CallBackFrame(contract.methods.changeOffersLifeTime(newLifeTime).send({from: Aux.account }));
}

export async function changeOwnerTransferFees(contract, marketId, newAmount, newDecimals){
  let marketContract = await RetrieveNFTMarket(contract, marketId);
  await changeOwnerTransferFeesForMarket(marketContract, newAmount, newDecimals);
}

async function changeOwnerTransferFeesForMarket(contract, newAmount, newDecimals){
    await Aux.CallBackFrame(contract.methods.changeOwnerTransferFees(newAmount, newDecimals).send({from: Aux.account }));
}

export async function transferToken(contract, marketId, tokenId, previousOwner, newOwner){
  let marketContract = await RetrieveNFTMarket(contract, marketId);
  await transferTokenForMarket(marketContract, tokenId, previousOwner, newOwner);
}

async function transferTokenForMarket(contract, tokenId, previousOwner, newOwner){
    await Aux.CallBackFrame(contract.methods.safeTransferFrom(previousOwner, newOwner, tokenId).send({from: Aux.account }));
}

export async function mintToken(contract, marketId, tokenId, receiver, prices, FromCredit, paymentTokenID){
  let marketContract = await RetrieveNFTMarket(contract, marketId);
  await mintTokenForMarket(marketContract, tokenId, receiver, prices, FromCredit, paymentTokenID);
}

async function mintTokenForMarket(contract, tokenId, receiver, prices, FromCredit, paymentTokenID){
  for(let i=0; i < prices.length; i++){
    let factor = PaymentsFunc.TokenDecimalsFactors[0];
    if(prices[i]._paymentTokenID < PaymentsFunc.TokenDecimalsFactors.length) factor = PaymentsFunc.TokenDecimalsFactors[prices[i]._paymentTokenID];
    prices[i]._price = new BigNumber(prices[i]._price).multipliedBy(factor).toString();
  }
  let paymentplan = await PaymentPlanForMarket(contract);
  let payment = new BigNumber(0);
  if(paymentplan == PaymentPlansMinting) payment = TreasuryFunc.MintingFee.plus(TreasuryFunc.AdminMintingFee);
  if(FromCredit == false) await PaymentsFunc.CheckAllowance(Aux.account, ContractsFunc.Payments._address, payment, paymentTokenID);
  await Aux.CallBackFrame(contract.methods.mintToken(tokenId, receiver, prices, FromCredit, paymentTokenID).send({from: Aux.account}));
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

export async function setTokenPrice(contract, marketId, tokenId, newPrices){
  let marketContract = await RetrieveNFTMarket(contract, marketId);
  await setTokenPriceForMarket(marketContract, tokenId, newPrices);
}

async function setTokenPriceForMarket(contract, tokenId, newPrices){
  for(let i=0; i < newPrices.length; i++){
    let factor = PaymentsFunc.TokenDecimalsFactors[0];
    if(newPrices[i]._paymentTokenID < PaymentsFunc.TokenDecimalsFactors.length) factor = PaymentsFunc.TokenDecimalsFactors[newPrices[i]._paymentTokenID];
    newPrices[i]._price = newPrices[i]._price.multipliedBy(factor).toString();
  }
  await Aux.CallBackFrame(contract.methods.setTokenPrice(tokenId, newPrices).send({from: Aux.account }));
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

export async function submitOffer(contract, marketId, tokenId, bidder, offer, FromCredit, paymentTokenID){
  let marketContract = await RetrieveNFTMarket(contract, marketId);
  await submitOfferForMarket(marketContract, tokenId, bidder, offer, FromCredit, paymentTokenID);
}

async function submitOfferForMarket(contract, tokenId, bidder, offer, FromCredit, paymentTokenID){
    let offerSent = new BigNumber(offer).multipliedBy(PaymentsFunc.TokenDecimalsFactors[paymentTokenID]);
    if (FromCredit == false) await PaymentsFunc.CheckAllowance(Aux.account, ContractsFunc.Payments._address, offerSent, paymentTokenID);
    await Aux.CallBackFrame(contract.methods.submitOffer(Aux.returnSubmitOfferObject(tokenId, bidder, offerSent, FromCredit, paymentTokenID)).send({from: Aux.account }));
}

export async function withdrawOffer(contract, marketId, tokenId){
  let marketContract = await RetrieveNFTMarket(contract, marketId);
  await withdrawOfferForMarket(marketContract, tokenId);
}

async function withdrawOfferForMarket(contract, tokenId){
    await Aux.CallBackFrame(contract.methods.withdrawOffer(tokenId).send({from: Aux.account }));
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
      TokenPaymentPlan = "-"
      TokenPrices = []
      TokenPricesPaymentsID = []
      TokenPricesEnabled = []
      TokenOwner = "-"

      let response = await contract.methods.retrieveToken(tokenId).call();

      TokenPaymentPlan = response[0]._paymentPlan;

      for(let i=0; i < response[0]._prices.length; i++){
        let factor = PaymentsFunc.TokenDecimalsFactors[0]
        let symbol = "NOT-DEFINED"

        let paymentID = parseInt(response[0]._prices[i]._paymentTokenID);

        if(paymentID < PaymentsFunc.TokenDecimalsFactors.length) {
          factor = PaymentsFunc.TokenDecimalsFactors[paymentID]
          symbol = PaymentsFunc.TokenSymbols[paymentID]
        }

        TokenPrices[i] = new BigNumber(response[0]._prices[i]._price).dividedBy(factor);
        TokenPricesPaymentsID[i] = symbol;
        TokenPricesEnabled[i] = response[0]._prices[i]._enabled;

      }
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
      OfferOffer = "-";
      OfferPaymentTokenID = "-";
      OfferSender = "-";
      OfferBidder = "-";
      OfferDeadline = "-";

      let response = await contract.methods.retrieveOffer(tokenId).call();
      OfferPaymentTokenID = parseInt(response._paymentTokenID);
      OfferOffer = new BigNumber(response._offer).dividedBy(PaymentsFunc.TokenDecimalsFactors[OfferPaymentTokenID]);
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
    MarketID = marketId.toFixed(0).toString();
    return marketContract;
  }
  catch(e){
    window.alert("error retrieving the market contract : " + JSON.stringify(e))
  }
}