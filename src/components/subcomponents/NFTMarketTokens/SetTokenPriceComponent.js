import React from 'react';
import { Form} from 'react-bootstrap';
import TokenPricesComponent from './TokenPricesComponent.js';

const BigNumber = require('bignumber.js');
const func = require("../../../functions/NFTMarketFunctions.js");
const PaymentsFunc = require("../../../functions/PaymentsFunctions.js");
const Aux = require("../../../functions/AuxiliaryFunctions.js");

class SetTokenPriceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.ChangePricePaymentID = this.ChangePricePaymentID.bind(this);
        this.ChangePriceValue = this.ChangePriceValue.bind(this);
        this.ChangePriceEnabled = this.ChangePriceEnabled.bind(this);
        this.AddPrice = this.AddPrice.bind(this);
        this.RemovePrice = this.RemovePrice.bind(this);
    } 

    state = {
        marketId : "",
        tokenId : "",
        prices: [0],
        pricesPaymentTokenIDs : [],
        pricesPaymentTokenLabels : ["Choose Token"],
        pricesValues : [],
        pricesDisabled : [false],
    };

    handleNewPrice = async (event) => {
        event.preventDefault();
        let MarketId = new BigNumber(this.state.marketId);
        let TokenId = new BigNumber(this.state.tokenId);
        let Prices = [];
        
        for(let i=0; i < this.state.pricesPaymentTokenIDs.length; i++){
            if(this.state.pricesPaymentTokenIDs[i] && 
                this.state.pricesValues[i]) {
                    let enabled = (this.state.pricesDisabled[i])? false : true;
                    let PriceToAdd = Aux.returnTokenPriceObject(parseInt(this.state.pricesPaymentTokenIDs[i]), new BigNumber(this.state.pricesValues[i]), enabled)
                    Prices.push(PriceToAdd);
                 }
        }

        await func.setTokenPrice(this.props.contract, MarketId, TokenId, Prices);
        this.setState({marketId: "", tokenId : "", prices: [0], pricesPaymentTokenIDs : [],
            pricesPaymentTokenLabels : ["Choose Token"], pricesValues : [], pricesDisabled : [false]});
        this.props.refresh();
    };

    AddRemovePrice = (AddRemove) => {
        const defaultLabel = "Choose Token";
        let list = this.state.prices;
        let labels = this.state.pricesPaymentTokenLabels;
        let listpayments = this.state.pricesPaymentTokenIDs;
        let listvalues = this.state.pricesValues;
        let listdisabled = this.state.pricesDisabled;

        if(AddRemove){
          list.push(this.state.prices.length)
          labels.push(defaultLabel)
          listpayments.push("")
          listvalues.push("")
          listdisabled.push(false)
        }
        else{
          if(list.length > 1){
            list.pop()
            labels.pop()
            listpayments.pop()
            listvalues.pop()
            listdisabled.pop()
          }
        }
        this.setState({prices: list})
        this.setState({pricesPaymentTokenLabels: labels})
        this.setState({pricesPaymentTokenIDs: listpayments})
        this.setState({pricesValues: listvalues})
        this.setState({pricesDisabled: listdisabled})
    };
    
    AddPrice = (event) => {
      event.preventDefault();
      this.AddRemovePrice(true);
    };

    RemovePrice = (event) => {
      event.preventDefault();
      this.AddRemovePrice(false);
    };   

    ChangePricePaymentID = async (value, index) => {
        let list = this.state.pricesPaymentTokenIDs;
        let labels = this.state.pricesPaymentTokenLabels;
        list[index] = value;
        labels[index] = PaymentsFunc.TokenSymbols[value];
        this.setState({ pricesPaymentTokenIDs: list })
        this.setState({ pricesPaymentTokenLabels: labels })
    }

    ChangePriceValue(index, value){
        let list = this.state.pricesValues;
        list[index] = value;
        this.setState({ pricesValues: list })
    }

    ChangePriceEnabled(index, value){
        let list = this.state.pricesDisabled;
        list[index] = value;
        this.setState({ pricesDisabled: list })
    }

    render(){
        return (
            <div>
              <h4>Change Token price</h4>
              <Form onSubmit={this.handleNewPrice} style={{margin: '50px 50px 50px 50px' }}>
                    <Form.Group  className="mb-3">
                        <Form.Control type="text" name="MarketId" placeholder="market id" 
                            value={this.state.marketId}
                            onChange={event => this.setState({ marketId: event.target.value })}/>
                        <Form.Control type="text" name="TokenId" placeholder="token id" 
                            value={this.state.tokenId}
                            onChange={event => this.setState({ tokenId: event.target.value })}/>
                        <TokenPricesComponent 
                            ChangePricePaymentID={this.ChangePricePaymentID}
                            ChangePriceValue={this.ChangePriceValue}
                            ChangePriceEnabled={this.ChangePriceEnabled}
                            AddPrice={this.AddPrice}
                            RemovePrice={this.RemovePrice}
                            prices={this.state.prices}
                            pricesDisabled={this.state.pricesDisabled}
                            pricesValues={this.state.pricesValues}
                            pricesPaymentTokenLabels={this.state.pricesPaymentTokenLabels}
                        />
                        <br />
                        <br />
                    </Form.Group>
                    <button type="submit" class="btn btn-primary">Set New Price</button>  &nbsp;&nbsp;
                </Form>
            </div>
            
          );
    }
}


export default SetTokenPriceComponent;