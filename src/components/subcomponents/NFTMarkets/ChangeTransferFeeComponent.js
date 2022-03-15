import React from 'react';
import { Form} from 'react-bootstrap';

const func = require("../../../functions/NFTMarketFunctions.js");


class ChangeTransferFeeComponent extends React.Component {
    state = {
        marketId : "",
        newFee : ""
    };

    handleNewPrice = async (event) => {
        event.preventDefault();
        let NewDecimals = 2;
        await func.changeOwnerTransferFees(this.props.contract, this.state.marketId.trim(), this.state.newFee.trim(), NewDecimals);
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