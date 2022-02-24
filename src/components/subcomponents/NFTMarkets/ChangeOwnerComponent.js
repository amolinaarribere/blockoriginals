import React from 'react';
import { Form} from 'react-bootstrap';

const BigNumber = require('bignumber.js');
const func = require("../../../functions/NFTMarketFunctions.js");


class ChangeOwnerComponent extends React.Component {
    state = {
        marketId : "",
        newOwner : ""
    };

    handleNewPrice = async (event) => {
        event.preventDefault();
        let MarketId = new BigNumber(this.state.marketId);
        await func.changeOwner(this.props.contract, MarketId, this.state.newOwner);
        this.setState({marketId: "", newOwner : ""});
        this.props.refresh();
    };

    render(){
        return (
            <div>
              <h4>Change Market owner</h4>
              <Form onSubmit={this.handleNewPrice} style={{margin: '50px 50px 50px 50px' }}>
                    <Form.Group  className="mb-3">
                        <Form.Control type="text" name="MarketId" placeholder="market id" 
                            value={this.state.marketId}
                            onChange={event => this.setState({ marketId: event.target.value })}/>
                        <Form.Control type="text" name="NewOwner" placeholder="new owner" 
                            value={this.state.newOwner}
                            onChange={event => this.setState({ newOwner: event.target.value })}/>
                    </Form.Group>
                    <button type="submit" class="btn btn-primary">Set New Owner</button>  &nbsp;&nbsp;
                </Form>
            </div>
            
          );
    }
}


export default ChangeOwnerComponent;