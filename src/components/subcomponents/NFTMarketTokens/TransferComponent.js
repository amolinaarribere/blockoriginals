import React from 'react';
import { Form } from 'react-bootstrap';

const BigNumber = require('bignumber.js');
const func = require("../../../functions/NFTMarketFunctions.js");
const Aux = require("../../../functions/AuxiliaryFunctions.js");


class TransferComponent extends React.Component {
    state = {
        marketId : "",
        tokenId : "",
        owner : "",
        receiver : ""    };

        handleTransfer = async (event) => {
        event.preventDefault();
        let Owner = this.state.owner.trim();
        if(Owner == "") Owner = Aux.account;
        await func.transferToken(this.props.contract, this.state.marketId.trim(), this.state.tokenId.trim(), Owner, this.state.receiver.trim());
        this.setState({marketId: "", tokenId : "", owner: "", receiver: ""});
        this.props.refresh();
    };

    render(){
        return (
            <div>
                <h4>Safely Transfer Token</h4>
                <Form onSubmit={this.handleTransfer} style={{margin: '50px 50px 50px 50px' }}>
                    <Form.Group  className="mb-3">
                        <Form.Control type="text" name="MarketId" placeholder="market id" 
                            value={this.state.marketId}
                            onChange={event => this.setState({ marketId: event.target.value })}/>
                        <Form.Control type="text" name="TokenId" placeholder="token id" 
                            value={this.state.tokenId}
                            onChange={event => this.setState({ tokenId: event.target.value })}/>
                        <Form.Control type="text" name="Owner" placeholder="owner address" 
                            value={this.state.owner}
                            onChange={event => this.setState({ owner: event.target.value })}/>
                        <Form.Control type="text" name="Receiver" placeholder="receiver address" 
                            value={this.state.receiver}
                            onChange={event => this.setState({ receiver: event.target.value })}/>
                    </Form.Group>
                    <button type="submit" class="btn btn-primary">Transfer Token</button>
                </Form>
            </div>
            
          );
    }
}


export default TransferComponent;