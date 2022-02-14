import React from 'react';
import { Form } from 'react-bootstrap';

const BigNumber = require('bignumber.js');
const func = require("../../../functions/NFTMarketFunctions.js");


class MintComponent extends React.Component {
    state = {
        marketId : "",
        tokenId : "",
        receiver : "",
        price : ""
    };

    handleMint = async (event) => {
        event.preventDefault();
        let MarketId = new BigNumber(this.state.marketId);
        let TokenId = new BigNumber(this.state.tokenId);
        let Price = new BigNumber(this.state.price);
        await func.mintToken(this.props.contract, MarketId, TokenId, this.state.receiver, Price);
        this.setState({marketId: "", tokenId : "", receiver: "", price: ""});
        this.props.refresh();
    };

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
                        <Form.Control type="text" name="Price" placeholder="price in ETH" 
                            value={this.state.price}
                            onChange={event => this.setState({ price: event.target.value })}/>
                    </Form.Group>
                    <button type="submit" class="btn btn-primary">Mint Token</button>
                </Form>
            </div>
            
          );
    }
}


export default MintComponent;