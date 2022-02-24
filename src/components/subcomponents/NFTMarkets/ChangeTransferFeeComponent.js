import React from 'react';
import { Form} from 'react-bootstrap';

const BigNumber = require('bignumber.js');
const func = require("../../../functions/NFTMarketFunctions.js");


class ChangeTransferFeeComponent extends React.Component {
    state = {
        marketId : "",
        newFee : ""
    };

    handleNewPrice = async (event) => {
        event.preventDefault();
        let NewFee = parseInt(parseFloat(this.state.newFee) * 100);
        let NewDecimals = 2;
        let MarketId = new BigNumber(this.state.marketId);
        await func.changeOwnerTransferFees(this.props.contract, MarketId, NewFee, NewDecimals);
        this.setState({marketId: "",  newFee : ""});
        this.props.refresh();
    };

    render(){
        return (
            <div>
              <h4>Change Market fees</h4>
              <Form onSubmit={this.handleNewPrice} style={{margin: '50px 50px 50px 50px' }}>
                    <Form.Group  className="mb-3">
                        <Form.Control type="text" name="MarketId" placeholder="market id" 
                            value={this.state.marketId}
                            onChange={event => this.setState({ marketId: event.target.value })}/>
                        <Form.Control type="text" name="NewFee" placeholder="new fee - Percentage (max 2 decimals)" 
                            value={this.state.newFee}
                            onChange={event => this.setState({ newFee: event.target.value })}/>
                    </Form.Group>
                    <button type="submit" class="btn btn-primary">Set New Fee</button>  &nbsp;&nbsp;
                </Form>
            </div>
            
          );
    }
}


export default ChangeTransferFeeComponent;