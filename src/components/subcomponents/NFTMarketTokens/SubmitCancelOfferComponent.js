import React from 'react';
import {Form, Row, Col} from 'react-bootstrap';
import SelectPaymentTokenComponent from '../Payments/SelectPaymentTokenComponent.js';

const func = require("../../../functions/NFTMarketFunctions.js");
const PaymentsFunc = require("../../../functions/PaymentsFunctions.js");


class SubmitCancelOfferComponent extends React.Component {
    constructor(props) {
        super(props);
        this.HandleSelect = this.HandleSelect.bind(this);
    }

    state = {
        marketId : "",
        tokenId : "",
        bidder : "",
        offer : "",
        FromCredit : false,
        paymentTokenID : "",
        selectedPaymentLabel : "Select payment Token",
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        await func.submitOffer(this.props.contract, this.state.marketId.trim(), this.state.tokenId.trim(), this.state.bidder.trim(), this.state.offer.trim(), this.state.FromCredit, this.state.paymentTokenID);
        await this.reset();
    };

    handleWithdraw = async (event) => {
        event.preventDefault();
        await func.withdrawOffer(this.props.contract, this.state.marketId.trim(), this.state.tokenId.trim());
        await this.reset();
    };

    async reset(){
        this.setState({marketId: "", tokenId : "", bidder : "", offer : "", FromCredit : false});
        this.props.refresh();
    }

    HandleSelect = async (index) => {
        this.setState({paymentTokenID : index});
        let label = "Selected payment Token - " + PaymentsFunc.TokenSymbols[index];
        this.setState({selectedPaymentLabel : label});
    }

    render(){
        return (
            <div>
              <h4>Submit or Withdraw an offer</h4>
              <Form onSubmit={this.handleSubmit} style={{margin: '50px 50px 50px 50px' }}>
                    <Form.Group  className="mb-3">
                        <Form.Control type="text" name="MarketId" placeholder="market id" 
                            value={this.state.marketId}
                            onChange={event => this.setState({ marketId: event.target.value })}/>
                        <Form.Control type="text" name="TokenId" placeholder="token id" 
                            value={this.state.tokenId}
                            onChange={event => this.setState({ tokenId: event.target.value })}/>
                        <Form.Control type="text" name="Bidder" placeholder="bidder address" 
                            value={this.state.bidder}
                            onChange={event => this.setState({ bidder: event.target.value })}/>
                        <Form.Control type="number" step="0.001" min="0" name="Offer" placeholder="offer" 
                            value={this.state.offer}
                            onChange={event => this.setState({ offer: event.target.value })}/>
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
                    <button type="submit" class="btn btn-primary">Submit Offer</button>  &nbsp;&nbsp;
                    <button type="button" class="btn btn-primary"  onClick={this.handleWithdraw}>Withdraw Offer</button>
                </Form>
            </div>
            
          );
    }
}


export default SubmitCancelOfferComponent;