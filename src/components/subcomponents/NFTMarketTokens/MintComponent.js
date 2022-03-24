import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import SelectPaymentTokenComponent from '../Payments/SelectPaymentTokenComponent.js';
import TokenPricesComponent from './TokenPricesComponent.js';


const BigNumber = require('bignumber.js');
const func = require("../../../functions/NFTMarketFunctions.js");
const PaymentsFunc = require("../../../functions/PaymentsFunctions.js");
const Aux = require("../../../functions/AuxiliaryFunctions.js");

class MintComponent extends React.Component {
    constructor(props) {
        super(props);
        this.HandleSelect = this.HandleSelect.bind(this);
        this.ChangePricePaymentID = this.ChangePricePaymentID.bind(this);
        this.ChangePriceValue = this.ChangePriceValue.bind(this);
        this.ChangePriceEnabled = this.ChangePriceEnabled.bind(this);
        this.AddPrice = this.AddPrice.bind(this);
        this.RemovePrice = this.RemovePrice.bind(this);
    } 

    state = {
        marketId : "",
        tokenId : "",
        receiver : "",
        prices: [0],
        pricesPaymentTokenIDs : [],
        pricesPaymentTokenLabels : ["Choose Token"],
        pricesValues : [],
        pricesDisabled : [false],
        paymentTokenID : "",
        selectedPaymentLabel : "Select payment Token",
        FromCredit : false
    };

    handleMint = async (event) => {
        event.preventDefault();
        let Prices = [];
        
        for(let i=0; i < this.state.pricesPaymentTokenIDs.length; i++){
            if(this.state.pricesPaymentTokenIDs[i] && 
                this.state.pricesValues[i]) {
                    let enabled = (this.state.pricesDisabled[i])? false : true;
                    let PriceToAdd = Aux.returnTokenPriceObject(parseInt(this.state.pricesPaymentTokenIDs[i]), this.state.pricesValues[i].trim(), enabled)
                    Prices.push(PriceToAdd);
                 }
        }

        await func.mintToken(this.props.contract, this.state.marketId.trim(), this.state.tokenId.trim(), this.state.receiver.trim(), Prices, this.state.FromCredit, this.state.paymentTokenID);

        this.setState({marketId: "", tokenId : "", receiver: "", prices: [0], pricesPaymentTokenIDs : [],
            pricesPaymentTokenLabels : ["Choose Token"], pricesValues : [], pricesDisabled : [false],
            paymentTokenID : "", selectedPaymentLabel : "Select payment Token"});

        this.props.refresh();
    };

    HandleSelect = async (index) => {
        this.setState({paymentTokenID : index});
        let label = "Selected payment Token - " + PaymentsFunc.TokenSymbols[index];
        this.setState({selectedPaymentLabel : label});
      }

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
                <h4>Mint New Token</h4>
                <Form onSubmit={this.handleMint} style={{margin: '50px 50px 50px 50px' }}>
                    <Form.Group  className="mb-3">
                        <Form.Control type="text" name="MarketId" placeholder="market id" 
                            value={this.state.marketId}
                            onChange={event => this.setState({ marketId: event.target.value })}/>
                        <Form.Control type="text" name="TokenId" placeholder="token id" 
                            value={this.state.tokenId}
                            onChange={event => this.setState({ tokenId: event.target.value })}/>
                        <Form.Control type="text" name="Receiver" placeholder="receiver address" 
                            value={this.state.receiver}
                            onChange={event => this.setState({ receiver: event.target.value })}/>
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
                        <Row>
                            <Col>
                                <SelectPaymentTokenComponent 
                                    HandleSelect={this.HandleSelect}
                                    selectedPaymentLabel={this.state.selectedPaymentLabel}
                                    DisplayAll={false}/>
                            </Col>
                            <Col>
                                <Form.Check type="checkbox" name="FromCredit" label="Use Credit"
                                    checked={this.state.FromCredit}
                                    onChange={event => this.setState({ FromCredit: event.target.checked })} />  
                            </Col>
                        </Row>
                    </Form.Group>
                    <button type="submit" class="btn btn-primary">Mint Token</button>
                </Form>
            </div>
            
          );
    }
}


export default MintComponent;