import { NFTMARKET_ABI, PaymentPlansMinting, PaymentPlansTransferFee } from '../config'


const Aux = require("./AuxiliaryFunctions.js");
const BigNumber = require('bignumber.js');
const TreasuryFunc = require("./TreasuryFunctions.js");
const PaymentsFunc = require("./PaymentsFunctions.js");
const ContractsFunc = require("./Contracts.js");
const ValidationFunc = require("./ValidationFunctions.js");


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
  let CheckNewOwner = ValidationFunc.validateAddress(newOwner);
  let CheckMarketId = ValidationFunc.validatePositiveLargeInteger(marketId);

  if(true == CheckNewOwner &&
    true == CheckMarketId[1]){
      let marketContract = await RetrieveNFTMarket(contract, CheckMarketId[0]);
      await changeOwnerForMarket(marketContract, newOwner);
  }
  else{
    ValidationFunc.FormatErrorMessage([CheckMarketId[1], CheckNewOwner], ["Market ID", "New Owner"]);
  }
  
}

async function changeOwnerForMarket(contract, newOwner){
    await Aux.CallBackFrame(contract.methods.changeOwner(newOwner).send({from: Aux.account }));
}

export async function changePaymentPlan(contract, marketId, newPaymentPlan){
  let CheckPaymentPlan = ValidationFunc.validatePositiveInteger(newPaymentPlan);
  let CheckMarketId = ValidationFunc.validatePositiveLargeInteger(marketId);

  if(true == CheckPaymentPlan[1] &&
    true == CheckMarketId[1]){
      let marketContract = await RetrieveNFTMarket(contract, CheckMarketId[0]);
      await changePaymentPlanForMarket(marketContract, CheckPaymentPlan[0]);
  }
  else{
    ValidationFunc.FormatErrorMessage([CheckMarketId[1], CheckPaymentPlan[1]], ["Market ID", "New Payment Plan"]);
  }
}

async function changePaymentPlanForMarket(contract, newPaymentPlan){
    await Aux.CallBackFrame(contract.methods.changePaymentPlan(newPaymentPlan).send({from: Aux.account }));
}

export async function changeOffersLifeTime(contract, marketId, newLifeTime){
  let CheckLifeTime = ValidationFunc.validatePositiveLargeInteger(newLifeTime);
  let CheckMarketId = ValidationFunc.validatePositiveLargeInteger(marketId);

  if(true == CheckLifeTime[1] &&
    true == CheckMarketId[1]){
      let marketContract = await RetrieveNFTMarket(contract, CheckMarketId[0]);
      await changeOffersLifeTimeForMarket(marketContract, CheckLifeTime[0]);
  }
  else{
    ValidationFunc.FormatErrorMessage([CheckMarketId[1], CheckLifeTime[1]], ["Market ID", "New Life Time"]);
  }
  
}

async function changeOffersLifeTimeForMarket(contract, newLifeTime){
    await Aux.CallBackFrame(contract.methods.changeOffersLifeTime(newLifeTime).send({from: Aux.account }));
}

export async function changeOwnerTransferFees(contract, marketId, newAmount, newDecimals){
  let CheckDecimals = ValidationFunc.validatePositiveInteger(newDecimals);
  let CheckMarketId = ValidationFunc.validatePositiveLargeInteger(marketId);
  let CheckAmount = ValidationFunc.validatePositiveFloat(newAmount);

  if(true == CheckDecimals[1] &&
    true == CheckMarketId[1] &&
    true == CheckAmount[1]){
      let marketContract = await RetrieveNFTMarket(contract, CheckMarketId[0]);
      await changeOwnerTransferFeesForMarket(marketContract, CheckAmount[0], CheckDecimals[0]);
  }
  else{
    ValidationFunc.FormatErrorMessage([CheckMarketId[1], CheckAmount[1], CheckDecimals[1]], ["Market ID", "New Fees", "Decimals"]);
  }
}

async function changeOwnerTransferFeesForMarket(contract, newAmount, newDecimals){
    let exponential = new BigNumber(10).exponentiatedBy(newDecimals);
    await Aux.CallBackFrame(contract.methods.changeOwnerTransferFees(newAmount.multipliedBy(exponential), newDecimals).send({from: Aux.account }));
}

export async function transferToken(contract, marketId, tokenId, previousOwner, newOwner){
  let CheckTokenId = ValidationFunc.validatePositiveLargeInteger(tokenId);
  let CheckMarketId = ValidationFunc.validatePositiveLargeInteger(marketId);
  let CheckPreviousOwner = ValidationFunc.validateAddress(previousOwner);
  let CheckNewOwner = ValidationFunc.validateAddress(newOwner);

  if(true == CheckTokenId[1] &&
    true == CheckMarketId[1] &&
    true == CheckPreviousOwner &&
    true == CheckNewOwner){
      let marketContract = await RetrieveNFTMarket(contract, CheckMarketId[0]);
      await transferTokenForMarket(marketContract, CheckTokenId[0], previousOwner, newOwner);
  }
  else{
    ValidationFunc.FormatErrorMessage([CheckMarketId[1], CheckTokenId[1], CheckPreviousOwner, CheckNewOwner], ["Market ID", "Token ID", "Previous Owner", "New Owner"]);
  }
}

async function transferTokenForMarket(contract, tokenId, previousOwner, newOwner){
    await Aux.CallBackFrame(contract.methods.safeTransferFrom(previousOwner, newOwner, tokenId).send({from: Aux.account }));
}

export async function mintToken(contract, marketId, tokenId, receiver, prices, FromCredit, paymentTokenID){
  let CheckTokenId = ValidationFunc.validatePositiveLargeInteger(tokenId);
  let CheckMarketId = ValidationFunc.validatePositiveLargeInteger(marketId);
  let CheckReceiver = ValidationFunc.validateAddress(receiver);
  let CheckCredit = ValidationFunc.validateBoolean(FromCredit);
  let CheckPaymentID = ValidationFunc.validatePositiveInteger(paymentTokenID);

  if(true == CheckTokenId[1] &&
    true == CheckMarketId[1] &&
    true == CheckReceiver &&
    true == CheckCredit &&
    true == CheckPaymentID[1]){
      if(CheckPaymentID[0] < PaymentsFunc.TokenAddresses.length  &&
        PaymentsFunc.TokenAddresses[CheckPaymentID[0]].active == true){
          let marketContract = await RetrieveNFTMarket(contract, CheckMarketId[0]);
          await mintTokenForMarket(marketContract, CheckTokenId[0], receiver, prices, FromCredit, CheckPaymentID[0]);
      }
      else{
        window.alert("The token ID is not accepted : " + CheckPaymentID[0])
      }
  }
  else{
    ValidationFunc.FormatErrorMessage([CheckMarketId[1], CheckTokenId[1], CheckReceiver, CheckCredit, CheckPaymentID[1]], ["Market ID", "Token ID", "Receiver", "From Credit", "Payment ID"]);
  }
}

async function mintTokenForMarket(contract, tokenId, receiver, prices, FromCredit, paymentTokenID){
  for(let i=0; i < prices.length; i++){
    let factor = PaymentsFunc.TokenDecimalsFactors[0];
    if(prices[i]._paymentTokenID < PaymentsFunc.TokenDecimalsFactors.length) factor = PaymentsFunc.TokenDecimalsFactors[prices[i]._paymentTokenID];
    prices[i]._price = new BigNumber(prices[i]._price).multipliedBy(factor).toString();
  }
  let paymentplan = await PaymentPlanForMarket(contract);
  let payment = new BigNumber(0);
  if(paymentplan == PaymentPlansMinting) payment = (TreasuryFunc.MintingFee[paymentTokenID].plus(TreasuryFunc.AdminMintingFee[paymentTokenID])).multipliedBy(PaymentsFunc.TokenDecimalsFactors[paymentTokenID]);
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
  let CheckTokenId = ValidationFunc.validatePositiveLargeInteger(tokenId);
  let CheckMarketId = ValidationFunc.validatePositiveLargeInteger(marketId);

  if(true == CheckTokenId[1] &&
    true == CheckMarketId[1]){
      let marketContract = await RetrieveNFTMarket(contract, CheckMarketId[0]);
      await setTokenPriceForMarket(marketContract, CheckTokenId[0], newPrices);
  }
  else{
    ValidationFunc.FormatErrorMessage([CheckMarketId[1], CheckTokenId[1]], ["Market ID", "Token ID"]);
  }
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
  let CheckTokenId = ValidationFunc.validatePositiveLargeInteger(tokenId);
  let CheckMarketId = ValidationFunc.validatePositiveLargeInteger(marketId);
  let CheckVR = ValidationFunc.validateBoolean(validateOrReject);

  if(true == CheckTokenId[1] &&
    true == CheckMarketId[1] &&
    true == CheckVR){
      let marketContract = await RetrieveNFTMarket(contract, CheckMarketId[0]);
      if(validateOrReject) await acceptOffer(marketContract, CheckTokenId[0]);
      else await rejectOffer(marketContract, CheckTokenId[0]);
  }
  else{
    ValidationFunc.FormatErrorMessage([CheckMarketId[1], CheckTokenId[1], CheckVR], ["Market ID", "Token ID", "Validate Or Reject"]);
  }
}

async function acceptOffer(contract, tokenId){
    await Aux.CallBackFrame(contract.methods.acceptOffer(tokenId).send({from: Aux.account }));
}

async function rejectOffer(contract, tokenId){
    await Aux.CallBackFrame(contract.methods.rejectOffer(tokenId).send({from: Aux.account }));
}

export async function submitOffer(contract, marketId, tokenId, bidder, offer, FromCredit, paymentTokenID){
  let CheckTokenId = ValidationFunc.validatePositiveLargeInteger(tokenId);
  let CheckMarketId = ValidationFunc.validatePositiveLargeInteger(marketId);
  let CheckBidder = ValidationFunc.validateAddress(bidder);
  let CheckOffer = ValidationFunc.validatePositiveFloat(offer);
  let CheckCredit = ValidationFunc.validateBoolean(FromCredit);
  let CheckPaymentID = ValidationFunc.validatePositiveInteger(paymentTokenID);

  if(true == CheckTokenId[1] &&
    true == CheckMarketId[1] &&
    true == CheckBidder &&
    true == CheckOffer[1] &&
    true == CheckCredit &&
    true == CheckPaymentID[1]){
      if(CheckPaymentID[0] < PaymentsFunc.TokenAddresses.length  &&
        PaymentsFunc.TokenAddresses[CheckPaymentID[0]].active == true){
          let marketContract = await RetrieveNFTMarket(contract, CheckMarketId[0]);
          await submitOfferForMarket(marketContract, CheckTokenId[0], bidder, CheckOffer[0], FromCredit, paymentTokenID);
        }
      else{
        window.alert("The token ID is not accepted : " + CheckPaymentID[0])
      }
  }
  else{
    ValidationFunc.FormatErrorMessage([CheckMarketId[1], CheckTokenId[1], CheckBidder, CheckOffer[1], CheckCredit, CheckPaymentID[1]], ["Market ID", "Token ID", "Bidder", "Offer", "From Credit", "Payment ID"]);
  }
}

async function submitOfferForMarket(contract, tokenId, bidder, offer, FromCredit, paymentTokenID){
    let factor = PaymentsFunc.TokenDecimalsFactors[paymentTokenID];
    offer = offer.multipliedBy(factor);
    if (FromCredit == false) await PaymentsFunc.CheckAllowance(Aux.account, ContractsFunc.Payments._address, offer, paymentTokenID);
    await Aux.CallBackFrame(contract.methods.submitOffer(Aux.returnSubmitOfferObject(tokenId.toString(), bidder, offer.toString(), FromCredit, paymentTokenID)).send({from: Aux.account }));
}

export async function withdrawOffer(contract, marketId, tokenId){
  let CheckTokenId = ValidationFunc.validatePositiveLargeInteger(tokenId);
  let CheckMarketId = ValidationFunc.validatePositiveLargeInteger(marketId);

  if(true == CheckTokenId[1] &&
    true == CheckMarketId[1]){
      let marketContract = await RetrieveNFTMarket(contract, CheckMarketId[0]);
      await withdrawOfferForMarket(marketContract, tokenId);
  }
  else{
    ValidationFunc.FormatErrorMessage([CheckMarketId[1], CheckTokenId[1]], ["Market ID", "Token ID"]);
  }
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
  let CheckTokenId = ValidationFunc.validatePositiveLargeInteger(tokenId);
  let CheckMarketId = ValidationFunc.validatePositiveLargeInteger(marketId);

  if(true == CheckTokenId[1] &&
    true == CheckMarketId[1]){
      let marketContract = await RetrieveNFTMarket(contract, CheckMarketId[0]);
      await RetrieveTokenForMarket(marketContract, CheckTokenId[0]);
      return true;
  }
  else{
    ValidationFunc.FormatErrorMessage([CheckMarketId[1], CheckTokenId[1]], ["Market ID", "Token ID"]);
    return false;
  }
}

async function RetrieveTokenForMarket(contract, tokenId){
    try{
      TokenPaymentPlan = "-"
      TokenPrices = []
      TokenPricesPaymentsID = []
      TokenPricesEnabled = []
      TokenOwner = "-"
      TokenID = tokenId.toString();

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
  let CheckTokenId = ValidationFunc.validatePositiveLargeInteger(tokenId);
  let CheckMarketId = ValidationFunc.validatePositiveLargeInteger(marketId);

  if(true == CheckTokenId[1] &&
    true == CheckMarketId[1]){
      let marketContract = await RetrieveNFTMarket(contract, CheckMarketId[0]);
      await RetrieveOfferForMarket(marketContract, CheckTokenId[0]);
      return true;
    }
  else{
    ValidationFunc.FormatErrorMessage([CheckMarketId[1], CheckTokenId[1]], ["Market ID", "Token ID"]);
    return false;
  }
}

async function RetrieveOfferForMarket(contract, tokenId){
    try{
      OfferOffer = "-";
      OfferPaymentTokenID = "-";
      OfferSender = "-";
      OfferBidder = "-";
      OfferDeadline = "-";
      TokenID = tokenId.toString();

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

export async function RetrieveNFTMarket(contract, marketId){
  let CheckMarketId = ValidationFunc.validatePositiveLargeInteger(marketId);

  if(true == CheckMarketId[1]){
    try{
      let marketAddress = await contract.methods.retrieveNFTMarketForIssuer(CheckMarketId[0]).call();
      let marketContract = await new Aux.web3.eth.Contract(NFTMARKET_ABI, marketAddress);
      MarketID = CheckMarketId[0].toFixed(0).toString();
      return marketContract;
    }
    catch(e){
      window.alert("error retrieving the market contract : " + JSON.stringify(e))
    }
  }
  else{
    ValidationFunc.FormatErrorMessage([CheckMarketId[1]], ["Market ID"]);
    return "";
  }
  
}