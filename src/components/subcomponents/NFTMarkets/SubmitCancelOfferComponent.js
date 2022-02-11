import React from 'react';
import { Form} from 'react-bootstrap';

const BigNumber = require('bignumber.js');
const func = require("../../../functions/NFTMarketFunctions.js");


class SubmitCancelOfferComponent extends React.Component {
    state = {
        marketId : "",
        tokenId : "",
        bidder : "",
        offer : "",
        FromCredit : false
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        let Offer = new BigNumber(this.state.offer);
        let MarketId = new BigNumber(this.state.marketId);
        let TokenId = new BigNumber(this.state.tokenId);
        await func.submitOffer(this.props.contract, MarketId, TokenId, this.state.bidder, Offer, this.state.FromCredit);
        await this.reset();
    };

    handleWithdraw = async (event) => {
        event.preventDefault();
        let MarketId = new BigNumber(this.state.marketId);
        let TokenId = new BigNumber(this.state.tokenId);
        await func.withdrawOffer(this.props.contract, MarketId, TokenId);
        await this.reset();
    };

    async reset(){
        this.setState({marketId: "", tokenId : "", bidder : "", offer : "", FromCredit : false});
        this.props.refresh();
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
                        <Form.Control type="text" name="Offer" placeholder="offer in ETH" 
                            value={this.state.offer}
                            onChange={event => this.setState({ offer: event.target.value })}/>
                        <Form.Check type="checkbox" name="FromCredit" label="Use Credit"
                            checked={this.state.FromCredit}
                            onChange={event => this.setState({ FromCredit: event.target.checked })} />
                    </Form.Group>
                    <button type="submit" class="btn btn-primary">Submit Offer</button>  &nbsp;&nbsp;
                    <button type="button" class="btn btn-primary"  onClick={this.handleWithdraw}>Withdraw Offer</button>
                </Form>
            </div>
            
          );
    }
}


export default SubmitCancelOfferComponent;