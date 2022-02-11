import React from 'react';
import { Form} from 'react-bootstrap';

const BigNumber = require('bignumber.js');
const func = require("../../../functions/NFTMarketFunctions.js");


class SetTokenPriceComponent extends React.Component {
    state = {
        marketId : "",
        tokenId : "",
        price : ""
    };

    handleNewPrice = async (event) => {
        event.preventDefault();
        let NewPrice = new BigNumber(this.state.price);
        let MarketId = new BigNumber(this.state.marketId);
        let TokenId = new BigNumber(this.state.tokenId);
        await func.setTokenPrice(this.props.contract, MarketId, TokenId, NewPrice);
        this.setState({marketId: "", tokenId : "", price : ""});
        this.props.refresh();
    };

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
                        <Form.Control type="text" name="NewPrice" placeholder="new price" 
                            value={this.state.price}
                            onChange={event => this.setState({ price: event.target.value })}/>
                    </Form.Group>
                    <button type="submit" class="btn btn-primary">Set New Price</button>  &nbsp;&nbsp;
                </Form>
            </div>
            
          );
    }
}


export default SetTokenPriceComponent;